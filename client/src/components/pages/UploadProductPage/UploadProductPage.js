import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';

import FileUpload from '../../Common/FileUpload';

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

const UploadProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [continent, setContinent] = useState(1);

  const NameHandler = (e) => {
    setName(e.currentTarget.value);
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

  return (
    <div>
      <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2}>여행 상품 업로드</Title>
        </div>
        <Form>
          {/* Drop zone */}
          <FileUpload />
          <br />
          <br />
          <label>이름</label>
          <Input onChange={NameHandler} value={name} />
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
          <Button>확인</Button>
        </Form>
      </div>
    </div>
  );
};

export default UploadProductPage;
