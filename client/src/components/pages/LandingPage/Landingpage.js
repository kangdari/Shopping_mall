import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { RocketOutlined } from '@ant-design/icons';
import { Col, Card, Row, Carousel } from 'antd';
const { Meta } = Card;

const Landingpage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // DB의 모든 상품 정보 가져오기
    axios.post('/api/product/products').then((res) => {
      if (res.data.success) {
        setProducts(res.data.productsInfo);
      } else {
        alert('상품 불러오기 실패');
      }
    });
  }, []);

  // 카드 렌더링 함수
  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          style={{ width: '100%', maxHeight: '150px' }}
          cover={<img alt='product' src={`http://localhost:5050/${product.images[0]}`} />}
        >
          <Meta title={product.title} description={product.price} />
        </Card>
      </Col>
    );
  });

  return (
    <>
      <div style={{ width: '75%', margin: '3rem auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>
            Let's Travel Anywhere <RocketOutlined />
          </h1>
        </div>
        {/* filter */}

        {/* search */}

        {/* cards */}

        {/* 카드 렌더링 / Row: 24 사이즈*/}
        <Row gutter={[16, 16]}>{renderCards}</Row>

        <div style={{ display: 'flex', justifyContent: 'center ' }}>
          <button>더보기</button>
        </div>
      </div>
    </>
  );
};

export default Landingpage;
