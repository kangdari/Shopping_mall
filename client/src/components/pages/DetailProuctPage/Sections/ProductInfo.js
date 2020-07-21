import React from 'react';
import { Descriptions, Button } from 'antd';

const ProductInfo = ({ product }) => {
  const ClickHandler = (e) => {};

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
