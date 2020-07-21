import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PRODUCT_SERVER } from '../../../utils/serverRoute';

import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchBox from './Sections/SearchBox';
import ImageSlider from '../../Common/ImageSlider';

import { continents, price } from './Sections/data';

import { RocketOutlined } from '@ant-design/icons';
import { Col, Card, Row } from 'antd';
const { Meta } = Card;

const Landingpage = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0); // 서버에서 불러올 데이터의 첫 인덱스 값
  const [limit, setLimit] = useState(8); // 한번에 보여지는 product 수
  const [dataSize, setDataSize] = useState(); // 서버에서 불러온 post 수
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });
  const [searchValue, setSearchValue] = useState('');

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
    axios.post(`${PRODUCT_SERVER}/products`, body).then((res) => {
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
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  // filter한 데이터를 서버에 요청
  const showFilteredResult = (filters) => {
    // filters: 체크된 아이디 배열
    const body = {
      skip: 0,
      limit: 8,
      filters,
    };

    getProduct(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let arr = [];

    for (let key in price) {
      if (data[key].id === parseInt(value, 10)) {
        // 해당 id의 가격의 범위
        arr = data[key].array;
      }
    }

    return arr;
  };

  // category: continents, price 둘 중 하나
  const hadleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    // filters: 체크된 아이디 배열

    if (category === 'price') {
      const priceValue = handlePrice(filters);
      newFilters[category] = priceValue;
    } else {
      newFilters[category] = filters;
    }

    // 필터 적용 후 결과물 렌더링
    showFilteredResult(newFilters);
    setFilters(newFilters);
  };

  // SearchBox에서 검색한 값
  const updateSearchValue = (newSearchValue) => {
    const body = {
      skip: 0, // db 처음부터 검색
      limit: 8,
      filters: Filters, // 기존 필터 유지하면서 검색
      searchValue: newSearchValue,
    };

    setSkip(0);
    setSearchValue(newSearchValue);

    getProduct(body);
  };

  return (
    <>
      <div style={{ width: '75%', margin: '3rem auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>
            Let's Travel Anywhere <RocketOutlined />
          </h1>
        </div>
        {/* filter */}
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            {/* CheckBox */}
            <CheckBox
              continents={continents}
              // filters: 체크된 아이디 배열
              hadleFilters={(filters) => hadleFilters(filters, 'continents')}
            />
          </Col>
          <Col lg={12} xs={24}>
            <RadioBox price={price} hadleFilters={(filters) => hadleFilters(filters, 'price')} />
          </Col>
        </Row>

        {/* search */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
          <SearchBox refreshFunction={updateSearchValue} />
        </div>

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
