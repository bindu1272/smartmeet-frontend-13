"use client";
import { Input, Select, Form } from 'antd';

import styles from './styles.module.scss';
import hospitalStyles from '@/app/hospital-registration/styles.module.scss'

const { Option } = Select;

export default function InputCustom(props:any) {
  const onChange = (e:any) => {
    props.onChange(e.currentTarget.value);
  };

  const onChangeSelect = (value:any) => {
    props.onChangeSelect(value);
  };

  return (
    <div className={styles["input-custom"] + " " + hospitalStyles["input-custom"]}>
      <div className={styles["label"]}>
        {props.label}
        {props.required && <span>*</span>}
      </div>
      <Form.Item
        validateStatus={!props.error ? 'validating' : 'error'}
        help={props.error}
      >
        {!props.inputPassword ? (
          <Input.Group compact>
            {props.selectbox && (
              <Select value={props.selectValue} onChange={onChangeSelect}>
                {props.options.map((option:any,index:any) => (
                  <Option value={option} key={index}>{option}</Option>
                ))}
              </Select>
            )}
            <Input
              placeholder={props.placeholder}
              onChange={onChange}
              value={props.value}
              type={props.type}
              name={props.name}
              disabled={props.disabled}
              addonBefore={props.addonBefore}
            />
          </Input.Group>
        ) : (
          <Input.Password
            placeholder={props.placeholder}
            onChange={onChange}
            value={props.value}
          />
        )}
      </Form.Item>
    </div>
  );
}
