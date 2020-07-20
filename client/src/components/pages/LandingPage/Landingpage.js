import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { RocketOutlined } from '@ant-design/icons';
import { Col, Card, Row } from 'antd';
import ImageSlider from '../../Common/ImageSlider';
const { Meta } = Card;

const Landingpage = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0); // 서버에서 불러올 데이터의 첫 인덱스 값
  const [limit, setLimit] = useState(8); // 한번에 보여지는 product 수
  const [dataSize, setDataSize] = useState(); // 서버에서 불러온 post 수

  useEffect(() => {
    let body = { skip, limit };
    getProduct(body);
  }, []);

  const loadMoreHandler = () => {
    let newSkip = skip + limit;

    let body = {
      skip: newSkip,
      limit,
      loadMore: true,
    };

    getProduct(body);
    setSkip(newSkip);
  };

  // DB의 모든 상품 정보 가져오기
  const getProduct = (body) => {
    axios.post('/api/product/products', body).then((res) => {
      if (res.data.success) {
        // 더보기 버튼을 클릭 시
        if (body.loadMore) {
          // 기존 값 + 추가 정보
          setProducts([...products, ...res.data.productsInfo]);
        } else {
          setProducts(res.data.productsInfo);
        }
        // 불러온
        setDataSize(res.data.dataSize);
      } else {
        alert('상품 불러오기 실패');
      }
    });
  };

  // 카드 렌더링 함수
  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
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

        {dataSize >= limit ? (
          <div style={{ display: 'flex', justifyContent: 'center ' }}>
            <button onClick={loadMoreHandler}>더보기</button>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Landingpage;
