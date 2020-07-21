import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

const ProductImageGallery = ({ product }) => {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (product.images && product.images.length > 0) {
      let images = [];

      product.images.map((url) =>
        images.push({
          original: `http://localhost:5050/${url}`,
          thumbnail: `http://localhost:5050/${url}`,
        })
      );
      setImages(images);
    }
  }, [product.images]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
};

export default ProductImageGallery;
