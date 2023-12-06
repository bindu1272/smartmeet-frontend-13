import { useState } from 'react';
// Styles
import { Checkbox, Input, Radio } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

export default function CheckList(props) {
  const onSearch = (value) => console.log(value);

  function onCheckboxChange(checkedValues) {
    props.onChange(checkedValues);
  }

  const [option, setOption] = useState(1);

  const onRadioChange = (e) => {
    setOption(e.target.value);
  };

  return (
    <div className={styles["checkbox-style"]}>
      <div className={styles["head-sec"]}>
        <div className={styles["title"]}>{props.title}</div>
        {props.searchActive && (
          <div className={styles["searchbox"]}>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </div>
        )}
      </div>

      {!props.radioActive === true ? (
        <Checkbox.Group
          className={styles["checkbox-inner-style"] + " " + "checkbox-inner-style"}
          onChange={onCheckboxChange}
          value={props.value}
        >
          {props.options?.map((option) => {
            return (
              <Checkbox value={option.id} key={option.id}>
                {option.name}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      ) : (
        <Radio.Group onChange={onRadioChange} value={option}>
          {props.options?.map((option) => {
            return (
              <Radio value={option.id} key={option.id}>
                {option.name}
              </Radio>
            );
          })}
        </Radio.Group>
      )}

      <div className={styles["divider"]} />
    </div>
  );
}
