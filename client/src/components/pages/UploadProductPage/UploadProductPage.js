import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';

import FileUpload from '../../Common/FileUpload';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

const continents = [
  { key: 1, value: 'Asia' },
  { key: 2, value: 'Africa' },
  { key: 3, value: 'Europe' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Antarctica' },
  { key: 7, value: 'Australia' },
];

// hoc에서 auth 전달 받음
const UploadProductPage = ({ auth, history }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [continent, setContinent] = useState(1);
  const [images, setImages] = useState([]);

  const TitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };
  const DescriptionHandler = (e) => {
    setDescription(e.currentTarget.value);
  };
  const PriceHandler = (e) => {
    setPrice(e.currentTarget.value);
  };
  const ContinentHanler = (e) => {
    setContinent(e.currentTarget.value);
  };
  // FileUpload 컴포넌트(자식)의 상태를 전달받아 부모 컴포넌트의 상태 업데이트
  const updataImages = (newImages) => {
    setImages(newImages);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();

    if (!title || !description || !price || !continent || !images) {
      return alert('빈 칸을 입력하세요');
    }

    const body = {
      // 현재 로그인 유저
      wrter: auth._id,
      title,
      description,
      price,
      images,
      continent,
    };

    // 서버에 데이터 요청
    Axios.post('/api/product', body).then((res) => {
      if (res.data.productSuccess) {
        alert('상품 업로드 성공');
        history.push('/');
      } else {
        alert('상품 업로드 실패');
      }
    });
  };

  return (
    <div>
      <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2}>여행 상품 업로드</Title>
        </div>
        <form onSubmit={SubmitHandler}>
          {/* Drop zone */}
          <FileUpload refreshFunction={updataImages} />
          <br />
          <br />
          <label>이름</label>
          <Input onChange={TitleHandler} value={title} />
          <br />
          <br />
          <label>설명</label>
          <TextArea onChange={DescriptionHandler} value={description} />
          <br />
          <br />
          <label>가격</label>
          <Input type='number' onChange={PriceHandler} value={price} />
          <br />
          <br />
          <select onChange={ContinentHanler} value={continent}>
            {continents.map((item) => (
              <option value={item.key} key={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <br />
          <br />
          <button type='submit'>확인</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(UploadProductPage);
