"use client";
import { Collapse, Spin } from 'antd';
import{ MinusOutlined,PlusOutlined} from '@ant-design/icons';
import map from 'lodash/map';
import get from 'lodash/get';

const { Panel } = Collapse;
function callback(key:any) {}
// Styles
import styles from '../styles.module.scss';

export default function FaqPanel({faqs}:any) {
  return (
      <div className={styles["faq-section"]}>
        <Collapse
          bordered={false}
          defaultActiveKey={[0]}
          // onChange={callback}
          accordion
          expandIcon={({ isActive }) => (
            <div>{isActive ? <MinusOutlined /> : <PlusOutlined />}</div>
          )}
          expandIconPosition="right"
        >
          {map(faqs, (data:any, i:any) => 
          (
            <Panel header={get(data, 'question')} key={i}>
              <p>{get(data, 'answer')}</p>
            </Panel>
          )
          )}
        </Collapse>
      </div>
  );
}
