const express = require('express');
const router = express.Router();
const { User } = require('../model/Users');
const { Product } = require('../model/Product');
const { Payment } = require('../model/Payment');
const { auth } = require('../middleware/auth');
const async = require('async');

// users

router.post('/register', async (req, res) => {
  // 클라이언트에서 회원 정보를 전달 받음.
  const user = new User(req.body);

  // id 중복 체크
  const exists = await User.findById(req.body.id);
  if (exists) {
    return res.status(409).json({ registerSuccess: false, message: '아이디 중복' });
  }

  user.save((err, userInfo) => {
    if (err) return res.json({ registerSuccess: false, err });

    return res.status(200).json({
      registerSuccess: true,
    });
  });
});

router.post('/login', async (req, res) => {
  // 요청된 id 체크
  const user = await User.findOne({ id: req.body.id });

  if (!user) {
    return res.status(401).json({ loginSuccess: false, message: '아이디가 존재하지 않습니다.' });
  }
  // 비밀번호 체크
  user.comparePassword(req.body.password, (err, isMatch) => {
    // 비밀번호가 틀린 경우
    if (!isMatch)
      return res.status(401).json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.' });
    // 비밀번호가 맞은 경우 토큰 생성
    user.createToken((err, user) => {
      if (err) return res.status(400).send(err);
      // 토큰 저장 => 쿠키
      res.cookie('auth', user.token).status(200).json({
        loginSuccess: true,
        userId: user._id,
      });
    });
  });
});

// 로그인 유저 확인
router.get('/auth', auth, (req, res) => {
  // auth 미들웨어 수행 시 req에서 user 정보 조회 가능
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    id: req.user.id,
    isAdmin: req.user.role === 0 ? false : true, // role: 1 > admin
    isAuth: true,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.get('/logout', auth, (req, res) => {
  // auth 미들웨어 수행 시 req에서 user 정보 조회 가능
  // user를 찾아 token 제거
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ logoutSuccess: false, err });
    return res.status(200).json({ logoutSuccess: true });
  });
});

router.post('/addToCart', auth, (req, res) => {
  // User 콜렉션에서 해당 유저의 정보 가져오기

  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duplicate = false; // 카트 상품 중복 여부
    // 가져온 정보에서 카트에 이미 상품이 들어있는지 확인
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    // 상품이 이미 있으면 갯수만 + 1
    if (duplicate) {
      User.findOneAndUpdate(
        // 찾아서 업데이트
        { _id: req.user._id, 'cart.id': req.body.productId }, // 유저를 찾고 카트에서 해당 제품을 찾은 뒤
        { $inc: { 'cart.$.quantity': 1 } }, // 카트의 quantity를 1 증가($increment)
        { new: true }, // 업데이트한 정보를 받기 위한 옵션 값
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    } else {
      // 상품이 없으면 카트 필드에 (상품 정보: id, 1개 갯수, 날짜 정보)를 넣어줌
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          // 추가
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        // 업데이트 된 정보를 가져옴
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    }
  });
});

router.get('/removeFromCart', auth, (req, res) => {
  // 장바구니에서 삭제 버튼을 누른 상품의 id
  const { productId } = req.query;
  // cart 안에서 삭제한 상품 User 컬렉션의 user.cart에서 제거
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      // 삭제
      $pull: {
        // cart filed
        cart: {
          id: productId,
        },
      },
    },
    // 상품을 삭제하고 업데이트 된 정보를 가져옴
    { new: true },
    // userInfo: 업데이트 된 정보
    (err, userInfo) => {
      const cartInfo = userInfo.cart;
      const idsArr = cartInfo.map((item) => item.id);

      // Product 컬렉션에서 현재 남아있는 상품들의 정보를 다시 가져와
      // 리덕스 스토어의 cartDetailInfo의 상태를 업데이트 ( 삭제한 상품을 제거 ) = Product + User.cart.quantity

      // 업데이트 된 User.cart의 id 값에 해당하는(삭제하고 남은) Product들을 찾아서 리턴
      Product.find({ _id: { $in: idsArr } })
        .populate('writer')
        .exec((err, productInfo) => {
          if (err) res.status(400).json({ success: false, err });
          return res.status(200).json({ cartInfo, productInfo });
        });
    }
  );
});

// paypal 구매 성공
router.post('/successBuy', auth, (req, res) => {
  // User 컬렉션의 history 필드에 결제 정보를 저장
  let history = [];
  let transactionData = {};

  // price(pin):12
  // sold(pin):0
  // continents(pin):3
  // views(pin):0
  // _id(pin):"5f17de43fe2aa92f237109aa"
  // title(pin):"europe"
  // description(pin):"d"
  // createdAt(pin):"2020-07-22T06:35:47.473Z"
  // updatedAt(pin):"2020-07-22T06:35:47.473Z"
  // __v(pin):0
  // quantity(pin):2

  req.body.cartDeatilInfo.forEach((item) => {
    // history에 cartDeatilInfo에 대한 정보 및 paymentID 저장

    history.push({
      dataOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  //
  // payment 컬렉션안에 자세한 결제 정보 저장
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;
  //

  User.findOneAndUpdate(
    // 현재 유저 찾고
    { _id: req.user._id },
    // User 컬렉션의 history 필드에 값을 추가하고 cart 필드는 초기화
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).json({ success: false, err });

      // Payment 모델에 transactionData 데이터 저장
      const payment = new Payment(transactionData);
      payment.save((err, paymentInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        // 상품 당 몇개의 quantity를 구매했는지 products 배열에 정리
        let products = [];
        paymentInfo.product.forEach((item) =>
          products.push({
            id: item.id,
            quantity: item.quantity,
          })
        );
        async.eachSeries(
          products,
          (item, callback) => {
            Product.updateOne(
              { _id: item.id },
              // Product 컬렉션의 sold 필드 정보 업데이트
              { $inc: { sold: item.quantity } },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: userInfo.cart,
              cartDeatilInfo: [],
            });
          }
        );
      });
    }
  );
});

module.exports = router;
