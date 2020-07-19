if (process.env.NODE_ENV === 'production') {
  // 배포
  module.exports = require('./production');
} else {
  // 개발
  module.exports = require('./dev');
}
