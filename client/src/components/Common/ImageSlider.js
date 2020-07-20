import React from 'react';
import { Carousel } from 'antd';

const ImageSlider = ({ images }) => {
  return (
    <div>
      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: '100%', maxHeight: '150px' }}
              src={`http://localhost:5050/${image}`}
              alt='img'
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
