const express = require('express');
const router = express.Router();
const multer = require('multer');

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
