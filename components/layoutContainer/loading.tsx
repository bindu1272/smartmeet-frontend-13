import { Spin } from 'antd';
import React from 'react';

const LoadingPage = () => {
  return (
    <div className="loading-page" style={{
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor : "#ccc",
    opacity:"0.4",
    alignItems:"center"
    }}>
      <Spin  size='large'/>
    </div>
  );
};

export default LoadingPage;