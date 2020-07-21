import React from 'react';
import { Descriptions, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_action';

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const ClickHandler = (e) => {
    // 필요한 정보를 cart 필드에 삽입
    // 상품 id, 수량, 시간(날짜
    // product.id, quantity, date
    dispatch(addToCart(product._id));
  };

  return (
    <>
      <Descriptions title='Product Info'>
        <Descriptions.Item label='Price'>${product.price}</Descriptions.Item>
        <Descriptions.Item label='Sold'>{product.sold}</Descriptions.Item>
        <Descriptions.Item label='View'>{product.views}</Descriptions.Item>
        <Descriptions.Item label='Description'>{product.description}</Descriptions.Item>
      </Descriptions>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size='large' shape='round' type='danger' onClick={ClickHandler}>
          Add to Cart
        </Button>
      </div>
    </>
  );
};

export default ProductInfo;
