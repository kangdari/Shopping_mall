import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const FileUpload = ({ refreshFunction }) => {
  const [images, setImages] = useState([]);
  // 파일 전송 함수
  const onDropHandler = (files) => {
    // 파일 전송을 위한 기본 설정 값
    let formData = new FormData();
    let config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/product/image', formData, config).then((res) => {
      if (res.data.uploadSuccess) {
        // [기존 images 경로 + 새 업로드 이미지 경로]
        setImages([...images, res.data.filePath]);
        refreshFunction([...images, res.data.filePath]);
      } else {
        alert('파일 업로드 실패');
      }
    });
  };

  const DeleteHandler = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    // Array.splice 사용
    newImages.splice(currentIndex, 1);
    setImages([...newImages]);

    // Array.filter 사용
    //newImages = newImages.filter((img, index) => index !== currentIndex);
    //setImages([...newImages]);

    refreshFunction([...newImages]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: '1px solid lightgrey',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: '3rem' }} />{' '}
          </div>
        )}
      </Dropzone>

      <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
        {images.map((image, index) => (
          <div key={index} onClick={() => DeleteHandler(image)}>
            <img
              style={{ minWidth: '350px', width: '350px', height: '240px' }}
              src={`http://localhost:5050/${image}`}
              alt='img'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
