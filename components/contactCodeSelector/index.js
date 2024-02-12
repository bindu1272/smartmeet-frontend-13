import { Form, Select } from 'antd';

const { Option } = Select;

const ContactCodeSelector = (
    <Select className="select-code" defaultValue="91">
      <Option value="91">+91</Option>
      <Option value="61">+61</Option>
      <Option value="71">+71</Option>
    </Select>
);

export default ContactCodeSelector;
