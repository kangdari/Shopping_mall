const express = require('express');
const router = express.Router();
const { User } = require('../model/Users');
const { auth } = require('../middleware/auth');
const { request } = require('express');

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
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              data: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    }
  });
});

module.exports = router;
