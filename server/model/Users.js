const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
  },
  id: {
    type: String,
    trim: true,
    unique: 1, // 중복 x
  },
  password: {
    type: String,
    maxlength: 100,
  },
  role: {
    type: Number,
    default: 0, // 기본 값
  },
  image: String,
  token: String, // 토근
  tokenExp: Number, // 토근 유효  기간
});

// save 전에
userSchema.pre('save', function (next) {
  const user = this;

  // 비밀번호를 바꿀때만 암호화하도록 설정
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // 비밀번호를 암호화된 비밀번호로 교체
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.statics.findById = function (id) {
  const user = this;
  return user.findOne({ id });
};

// 비밀번호 체크 인스턴스 함수
userSchema.methods.comparePassword = function (password, cb) {
  // password: client에서 넘어온 순수 비밀번호
  // this.password: 암호화된 비밀번호
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    // 비밀번호가 없다면 오류는 없고, isMatch: true
    return cb(null, isMatch);
  });
};

userSchema.methods.createToken = function (cb) {
  const user = this;
  // jwt를 이용해 토큰 생성
  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);
    return cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;
  // token 복호화
  // user._id + 'secretToken' = token
  jwt.verify(token, 'secretToken', (err, decoded_id) => {
    user.findOne({ _id: decoded_id, token: token }, (err, user) => {
      if (err) return cb(err);
      return cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
