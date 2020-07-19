const { User } = require('../model/Users');

let auth = (req, res, next) => {
  // 클라이언트의 쿠키에서 토큰 가져오기
  let token = req.cookies.auth;
  // 토큰 복호화 > 유저 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 유저가 없으면 인증 x
    if (!user) return res.json({ isAuth: false, error: true });
    // 유저가 있으면 인증 o
    // req에 token과 user 정보 전달
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
