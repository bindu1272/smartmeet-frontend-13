import { Form, Select } from 'antd';

const { Option } = Select;
export const TitleSelector = (
  <Form.Item name="title" noStyle initialValue="Mr">
    <Select className="select-title" defaultValue="Mr">
      <Option value="Mr">Mr</Option>
      <Option value="Ms">Ms</Option>
      <Option value="Dr">Dr</Option>
    </Select>
  </Form.Item>
);
