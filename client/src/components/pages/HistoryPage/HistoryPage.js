import React from 'react';
import styled from 'styled-components';

const HistoryPage = ({ user }) => {
  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>History</h1>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Payment Id</th>
            <th>name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date of Purchase</th>
          </tr>
        </thead>

        <tbody>
          {user.userInfo
            ? user.userInfo.history.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.dataOfPurchase}</td>
                </tr>
              ))
            : null}
        </tbody>
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

export default HistoryPage;
