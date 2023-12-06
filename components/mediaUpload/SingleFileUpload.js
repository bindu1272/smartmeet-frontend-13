import { useState } from 'react';
import { Upload, Spin,Image } from 'antd';
import get from 'lodash/get';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();
const backendUrl = process.env.NEXT_PUBLIC_API_URL

const SingleFileUpload = (props) => {
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
      ) 
      : (
      
      <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      accept=".pdf,.doc,.docx" // Add accepted file types for PDF, DOC, and DOCX
      action={`${backendUrl}/contactus/pdf`} // Update to appropriate file upload API endpoint
      beforeUpload={() => {}}
      onChange={handleChange}
    >
      {imageUrl ? (
        // Adjust the rendering based on the file type
        <>
          {fileType === 'pdf' && <embed src={imageUrl} type="application/pdf" width="100%" height="500px" />}
          {fileType === 'doc' && <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(imageUrl)}`} width="100%" height="500px" />}
        </>
      ) : (
        uploadButton
      )}
    </Upload>
    
      )}
    </Spin>
  );
};

export default SingleFileUpload;
