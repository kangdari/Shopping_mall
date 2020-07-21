import React, { useEffect } from 'react';
import axios from 'axios';
import { PRODUCT_SERVER } from '../../../utils/serverRoute';

const DetailProductPage = ({ match }) => {
  const productId = match.params.productId;

  useEffect(() => {
    axios.get(`${PRODUCT_SERVER}/product_id?productId=${productId}&type=single`).then((res) => {
      if (res.data.success) {
        console.log(res.data.productInfo);
      } else {
        alert('상세 데이터 가져오기 실패');
      }
    });
  }, [productId]);

  return <div>DetailProductPage</div>;
};

export default DetailProductPage;
