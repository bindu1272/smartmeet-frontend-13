import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './styles.module.scss';

import getConfig from 'next/config';
import { get } from 'lodash';
import Image from "next/image";
const { publicRuntimeConfig } = getConfig();


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const UploadLogo = ({onChange}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log("File Uploaded", info);
      onChange(get(info, 'file.response.data.key'));
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <PlusOutlined style={{ fontSize: '16px', color: '#9c6dff' }} />
      )}
    </div>
  );
  return (
    <Upload
      name="file"
      action={`${publicRuntimeConfig.backendUrl}/media`}
      listType="picture-card"
      className={styles["avatar-uploader"]}
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt="avatar" style={{ width: '100%' }} width={10}
        height={10}/>
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadLogo;
