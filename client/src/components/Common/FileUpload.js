import React from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const FileUpload = () => {
  // 파일 전송 함수
  const onDropHandler = (files) => {
    // 파일 전송을 위한 기본 설정 값
    let formData = new FormData();
    let config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('api/product/img', formData, config).then((res) => {
      if (res.data.success) {
      } else {
        alert('파일 업로드 실패');
      }
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 300,
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
    </div>
  );
};

export default FileUpload;
