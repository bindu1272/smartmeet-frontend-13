import { useState } from 'react';
import { Upload, Spin } from 'antd';
import get from 'lodash/get';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import getConfig from 'next/config';
import Image from "next/image";
// const { publicRuntimeConfig } = getConfig();
const backendUrl = process.env.NEXT_PUBLIC_API_URL;

const SingleImageUpload = (props) => {
  const { imageUrl, onUploadDone,setImageUser } = props;

  const [loading, setLoading] = useState(false);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = (info) => {
    if (get(info, 'file.status') === 'uploading') {
      setLoading(true);
      return;
    }
    if (get(info, 'file.status') === 'done') {
      get(info, 'file.response');
      setLoading(false);
      onUploadDone(get(info, 'file.response.data'));
    } else {
      setLoading(false);
    }
  };
  const handleRemove = () => {
    setImageUser(null);
  };
  return (
    <Spin spinning={loading}>
        {imageUrl ? (
        <div style={{ position: 'relative', width: 200, height: 200 }}>
          <Image src={imageUrl} alt="Preview" width={200} height={200} />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              cursor: 'pointer',
              background: '#fff',
              padding: '4px',
            }}
            onClick={handleRemove}
          >
            Remove
          </div>
        </div>
      ) : (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        // accept="image/*"
        accept=".png,.jpeg,.jpg"
        showUploadList={false}
        // action={'https://api-smartmeet.aakashyadav.com/api/v1//media'}
        // action={`${publicRuntimeConfig.backendUrl}/media`}
        action={`${backendUrl}/contactus/image`}
        beforeUpload={() => {}}
        onChange={handleChange}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt="avatar" style={{ width: '100%' }} width={10}
          height={10}/>
        ) : (
          uploadButton
        )}
      </Upload>
      )}
    </Spin>
  );
};

export default SingleImageUpload;
