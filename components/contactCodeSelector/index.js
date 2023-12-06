import { Form, Select } from 'antd';

const { Option } = Select;

const ContactCodeSelector = (
  <Form.Item name="contact_code" noStyle initialValue="91">
    <Select className="select-code" defaultValue="91">
      <Option value="91">+91</Option>
      <Option value="61">+61</Option>
      <Option value="71">+71</Option>
    </Select>
  </Form.Item>
);

export default ContactCodeSelector;
