import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PRODUCT_SERVER } from '../../../utils/serverRoute';
import { Row, Col } from 'antd';

import ProductImageGallery from './Sections/ProductImageGallery';
import ProductInfo from './Sections/ProductInfo';

const DetailProductPage = ({ match }) => {
  const productId = match.params.productId;
  const [product, setProduct] = useState({});

  useEffect(() => {
    // Product 하나의 정보만 가져오므로 type=single
    axios
      .get(`${PRODUCT_SERVER}/product_id?productId=${productId}&type=single`)
      .then((res) => {
        setProduct(res.data.productInfo[0]);
        // if (res.data.success) {
        //   // 서버에서 가져온 상세 정보를 state로 저장
        //   setProduct(res.data.productInfo[0]);
        // } else {
        //   alert('상세 데이터 가져오기 실패');
        // }
      })
      .catch((err) => alert(err));
  }, [productId]);

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{product.title}</h1>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ProductImageGallery product={product} />
        </Col>
        <Col lg={12} sm={24}>
          <ProductInfo product={product} />
        </Col>
      </Row>
    </div>
  );
};

export default DetailProductPage;
