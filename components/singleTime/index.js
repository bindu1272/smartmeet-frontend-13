import { Col, Row, TimePicker, Form } from 'antd';
import moment from 'moment';
import get from 'lodash/get';
import indexOf from 'lodash/indexOf';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import { remove } from 'lodash';
const days = [
  { name: 'S', value: 7 },
  { name: 'M', value: 1 },
  { name: 'T', value: 2 },
  { name: 'W', value: 3 },
  { name: 'T', value: 4 },
  { name: 'F', value: 5 },
  { name: 'S', value: 6 },
];
const format = 'HH:mm';

export default function SingleTime({ openHours, onChange, index, remove }) {
  // const [sdl, setsdl] = useState(selectedDays);

  // useEffect(() => {
  //   setsdl(selectedDays);
  // }, [selectedDays]);

  const onSelect = (day) => {
    const currentIndex = indexOf(get(openHours, 'days', []), day.value);

    if (currentIndex != -1) {
      // Remove
      openHours.days.splice(currentIndex, 1);
      const newDays = { ...openHours, days: openHours.days };
      onChange(newDays, index);
    } else {
      //add
      const newDays = { ...openHours, days: [...openHours.days, day.value] };
      onChange(newDays, index);
    }
  };

  return (
    <Row type="flex" align="middle" className={styles["singleTime"]} gutter={3}>
      <Col span={12}>
        <Row gutter={3} align="center">
          {days.map((day,index) => (
            <Col className={styles["gutter-row"]} span={3} key={index}>
              <DayIcon
                day={day}
                selected={openHours.days.indexOf(day.value) != -1}
                onClick={onSelect}
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Form style={{ display: 'contents' }}>
        <Col span={5}>
          <Form.Item noStyle>
            <TimePicker
              value={moment(openHours.from_time, format)}
              minuteStep={15}
              format={format}
              showNow={false}
              allowClear={false}
              size="small"
              suffixIcon={
                <DownOutlined style={{ color: 'black', fontSize: '12px' }} />
              }
              onChange={(time, timeString) => {
                const newTime = { ...openHours, from_time: timeString };
                onChange(newTime, index);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item noStyle>
            <TimePicker
              value={moment(openHours.to_time, format)}
              minuteStep={15}
              format={format}
              allowClear={false}
              suffixIcon={
                <DownOutlined style={{ color: 'black', fontSize: '12px' }} />
              }
              size="small"
              showNow={false}
              onChange={(time, timeString) => {
                const newTime = { ...openHours, to_time: timeString };
                onChange(newTime, index);
              }}
              rules={[
                { required: true, message: 'Missing To  time' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      get(openHours, 'from_time').isSameOrAfter(
                        get(openHours, 'to_time')
                      )
                    ) {
                      return Promise.reject(
                        new Error(
                          'Start time  should be greater than End time!'
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            />
          </Form.Item>
        </Col>
      </Form>
      {index > 0 && (
        <Col span={2} align="middle" style={{ fontSize: '12px' }}>
          <CloseOutlined onClick={() => remove(index)} />
        </Col>
      )}
    </Row>
  );
}

function DayIcon({ day, selected, onClick }) {
  const onClickLocal = () => {
    onClick(day);
  };

  return (
    <div
      style={{
        background: selected ? '#9c6dff' : 'white',
        color: selected ? 'white' : 'black',
      }}
      className={styles["day"]}
      onClick={onClickLocal}
    >
      {day.name}
    </div>
  );
}
