import React from 'react';
import styled from 'styled-components';

const UserCardBlock = ({ products, removeFromCart }) => {
  //
  const renderCartImages = (images) => {
    if (images.length > 0) {
      // 첫번째 이미지만 렌더링
      let img = images[0];
      return `http://localhost:5050/${img}`;
    }
  };

  const renderItems = () =>
    products
      ? products.map((product) => (
          <tr key={product._id}>
            <td>
              <img style={{ width: '70px' }} alt='product' src={renderCartImages(product.images)} />
            </td>
            <td>{product.quantity}</td>
            <td>${product.price}</td>
            <td>
              <button onClick={() => removeFromCart(product._id)}>remove</button>
              {/* <button onClick={removeFromCart(productId)}>remove</button> */}
            </td>
          </tr>
        ))
      : null;

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantitiy</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </Table>
    </div>
  );
};

const Table = styled.table`
  font-family: Arial, sans-serif;
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #ededed;
  }
`;

export default UserCardBlock;
