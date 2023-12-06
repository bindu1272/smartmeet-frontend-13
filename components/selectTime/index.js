import { Form, Button, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SingleTime from '../singleTime';
import { useState } from 'react';
import moment from 'moment';
import get from 'lodash/get';
import styles from './styles.module.scss';

const SelectTime = ({ openHours, setOpenHours, onChange }) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const onChangeAtIndex = (value, index) => {
    if (
      moment(get(value, 'from_time'), 'HH:mm').isSameOrAfter(
        moment(get(value, 'to_time'), 'HH:mm')
      )
    ) {
      notification.error({
        message: 'Start time  should be greater than End time!',
      });
    } else {
      const newOpenhours = [...openHours];
      newOpenhours[index] = value;
      setOpenHours(newOpenhours);
    }
  };

  const add = () => {
    setOpenHours([
      ...openHours,
      { days: [1], from_time: '10:00', to_time: '12:00' },
    ]);
  };

  const remove = (index) => {
    const newOpenHours = [...openHours];
    newOpenHours.splice(index, 1);
    setOpenHours(newOpenHours);
  };

  return (
    <div className={styles["select-time"]}>
      {openHours &&
        openHours.map((single, i) => (
          <SingleTime
          key={i}
            openHours={single}
            onChange={onChangeAtIndex}
            index={i}
            remove={remove}
          />
        ))}
      <Button
        onClick={add}
        style={{
          width: '100%',
          height: '40px',
          background: '#f4efff',
          border: 'none',
        }}
        icon={<PlusOutlined style={{ fontSize: '16px', color: '#532eb3' }} />}
      ></Button>
    </div>
  );
};

export default SelectTime;
