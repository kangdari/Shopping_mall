import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;

const RadioBox = ({ price, hadleFilters }) => {
  const [value, setValue] = useState(0);

  const renderRadioboxList = () =>
    price &&
    price.map((item) => (
      <Radio key={item.id} value={item.id}>
        {item.name}
      </Radio>
    ));

  // radiobtn 클릭 시 해당 raiobtn의 id 값으로 value state 업데이트
  const handleChange = (e) => {
    setValue(e.target.value);
    // 부모 컴포넌트인 LandPage의 State 업데이트
    hadleFilters(e.target.value);
  };

  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header='Price' key='1'>
        <Radio.Group onChange={handleChange} value={value}>
          {renderRadioboxList()}
        </Radio.Group>
      </Panel>
    </Collapse>
  );
};

export default RadioBox;
