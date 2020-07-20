const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../model/Product');

//
// Product
//

const storage = multer.diskStorage({
  // 파일 저장 위치
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // 파일 저장 이름
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single('file');

// /api/product
router.post('/', (req, res) => {
  const product = new Product(req.body);

  product.save((err) => {
    if (err) res.status(400).json({ productSuccess: false, err });
    return res.status(200).json({ productSuccess: true });
  });
});

// /api/product/products
router.post('/products', (req, res) => {
  const { skip, limit } = req.body;
  // console.log(req.body.filters);

  // find() 매개변수 : 쿼리
  const findArgs = {};
  for (let key in req.body.filters) {
    // 체크된 아이템이 있는 경우
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          // MongoDB 쿼리 옵션: $gte, $lte
          // Greater than equal : 이상
          $gte: req.body.filters[key][0],
          // Less than equal : 이하
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  // const limit = req.body.limit ? req.body.limit : 100;
  // const skip = req.body.skip ? req.body.skip : 0;

  // Product Collection에 있는 정보 가져오기
  // find(findArgs) : findArgs 쿼리에 해당하는 것을 조회, findArgs 값이 없으면 전체 조회
  Product.find(findArgs)
    .populate('writer') // writer(_id)에 해당하는 모든 정보를 가져옴
    .skip(skip)
    .limit(limit)
    .exec((err, productsInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, productsInfo, dataSize: productsInfo.length });
    });
});

router.post('/image', (req, res) => {
  // 가져온 이미지 저장
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ uploadSuccess: false, err });

    // filePath: 파일 저장 경로, filename: 파일 저장 이름
    return res
      .status(200)
      .json({ uploadSuccess: true, filePath: res.req.file.path, filename: res.req.file.name });
  });
});

module.exports = router;
