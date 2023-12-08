"use client";
import { Collapse, Empty, Spin } from 'antd';
import { useEffect, useState } from 'react';
import map from 'lodash/map';
import get from 'lodash/get';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { axiosInstance } from '../../remote/axios';

const { Panel } = Collapse;

function callback(key) {}

// Styles
import styles from './styles.module.scss';
import hospitalStyles from "../../app/hospital/[uuid]/doctor/[doctorId]/styles.module.scss";

export default function FaqBlock(props) {
  const { doctorId } = props;
  const { hospitalId } = props;
  const { hospital } = props; // boolean value to check if FaqBlock is for hospital info or doctor info
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getFaqs = async()=>{
      let result
      if (hospital) {
        result = await axiosInstance.get(`hospitals/${hospitalId}/faqs`);
      } else {
        result = await axiosInstance.get(`doctors/${doctorId}/faqs`);
      }
      setLoading(false);
      setFaqs(get(result, 'data.data'));
    }
    getFaqs()
  }, []);

  return (
    <Spin spinning={loading} className={hospitalStyles["doctors-info"]}>
      <div className={styles["faq-style"] + " " + hospitalStyles["faq-style"]}>
        <div className={hospitalStyles["header-section"]}>
          <div className={styles["title2"]}>FAQ</div>
        </div>

        {faqs.length > 0 ? (
          <div className={hospitalStyles["faq-section"] + " " + styles["faq-section"]}>
            <Collapse
              bordered={false}
              defaultActiveKey={[0]}
              onChange={callback}
              accordion
              expandIcon={({ isActive }) => (
                <div>{isActive ? <MinusOutlined /> : <PlusOutlined />}</div>
              )}
              expandIconPosition="right"
            >
              {map(faqs, (data, i) => (
                <Panel header={get(data, 'question')} key={i}>
                  <p>{get(data, 'answer')}</p>
                </Panel>
              ))}
            </Collapse>
          </div>
        ) : (
          <Empty description="No faqs found" />
        )}
      </div>
    </Spin>
  );
}
