import React, { useState } from 'react';
import { Input } from 'antd';
const { Search } = Input;

const SearchBox = ({ refreshFunction }) => {
  const [searchValue, setSearchValue] = useState('');

  const SearchHandler = (e) => {
    setSearchValue(e.currentTarget.value);
    refreshFunction(e.currentTarget.value);
  };

  return (
    <Search
      placeholder='input search text'
      onChange={SearchHandler}
      value={searchValue}
      style={{ width: 200 }}
    />
  );
};

export default SearchBox;
