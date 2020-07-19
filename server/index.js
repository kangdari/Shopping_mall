const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const config = require('./config/key.js');

app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded 분석
app.use(bodyParser.json()); // application/json 분석
app.use(cookieParser());

mongoose
  .connect(config.mongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('hello'));
// static 파일이 있는 upload 폴더는 내부적으로 /upload라는 가상 경로로 접근
app.use('/uploads', express.static('uploads'));

// router 적용
app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static('client/build'));

  // index.html for all page routes    html or routing and naviagtion
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Listening on port ${port}`));
