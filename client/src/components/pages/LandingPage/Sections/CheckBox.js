import React, { useState } from 'react';

import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

const CheckBox = ({ continents, hadleFilters }) => {
  // 체크된 continent의 id가 담긴 배열
  const [checked, setChecked] = useState([]);

  const checkHandler = (id) => {
    const currentIndex = checked.indexOf(id);

    const newChecked = [...checked];
    // 전체 checked된 state에서 현재 누른 checkbox가 있다면 없애고
    if (currentIndex !== -1) {
      newChecked.splice(currentIndex, 1);
    } else {
      // 없으면 추가
      newChecked.push(id);
    }
    setChecked(newChecked);
    hadleFilters(newChecked);
  };

  const rederCheckboxList = () =>
    continents &&
    continents.map((item) => (
      <React.Fragment key={item.id}>
        <Checkbox
          onChange={() => checkHandler(item.id)}
          checked={checked.indexOf(item.id) === -1 ? false : true}
          id={item.id}
        />
        <label htmlFor={item.id}>{item.name}</label>
      </React.Fragment>
    ));

  return (
    <Collapse defaultActiveKey={['0']}>
      <Panel header='Continents' key='1'>
        {rederCheckboxList(continents)}
      </Panel>
    </Collapse>
  );
};

export default CheckBox;
