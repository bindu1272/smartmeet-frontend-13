"use client";
import { Col, Row } from 'antd';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import InputCustom from '../../../components/inputCustom';
import ButtonPrimary from '../../buttons/buttonPrimary';
import ContactCodeSelector from '../../contactCodeSelector';
import styles from './styles.module.scss';
import Link from "next/link";
import Image from "next/image";
import hospitalStyles from "./hospitalstyles.module.scss";
Register.propTypes = {
  active: PropTypes.bool,
  clickHandler: PropTypes.func,
  data : PropTypes.any,
  errors: PropTypes.any,
  onChange : PropTypes.any,
  onClickBack : PropTypes.any,
  
};

const INPUTS = [
  {
    key: 'name',
    placeholder: 'Name',
    label: 'Name',
    required: true,
    selectbox: true,
    selectKey: 'title',
    selectOptions: ['Dr', 'Ms', 'Mr', 'Mrs'],
  },
  {
    key: 'email',
    placeholder: 'Email',
    label: 'Email',
    required: true,
  },
  {
    key: 'contact_number',
    placeholder: 'Enter Contact Number',
    label: 'Enter Contact Number',
    required: true,
    selectbox: true,
    selectKey: 'contact_code',
    selectOptions: ['91', '61', '71', '81'],
  },
  {
    key: 'password',
    placeholder: 'Password',
    label: 'Password',
    inputPassword: true,
    required: true,
  },
  {
    key: 'confirm_password',
    placeholder: 'Enter Password',
    label: 'Enter Password',
    inputPassword: true,
    required: true,
  },
];

export default function Register(props) {
  const { active, data, onChange, errors } = props;
  const router = useRouter();
  const handleHomePage = () => {
    router.push('/');
  };

  const onChangeFormData = (value, key) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className={!active ? styles["register-section"] + " " + "d-none" : styles["register-section"]}>
      <div className={hospitalStyles["form-section"]}>
        <Row align="bottom" justify="space-between" className={hospitalStyles["logo"]}>
          <Col>
            <div>
              <Image src="../../static/images/logo/logo.svg" alt="" 
              width={160}
              height={24.55}/>
            </div>
          </Col>
          <Col className={hospitalStyles["back-link"]}>
           <Link href="/"> Back to Homepage</Link>
          </Col>
        </Row>
        <h3 className={"title3"}>Tell us about you first</h3>
        <div className={"form"}>
          {INPUTS.map((i) => (
            <InputCustom
              key={i.key}
              error={errors && errors[i.key]}
              onChange={(value) => onChangeFormData(value, i.key)}
              placeholder={i.placeholder}
              selectbox={i.selectbox}
              selectValue={data[i.selectKey]}
              options={i.selectOptions}
              onChangeSelect={(value) => onChangeFormData(value, i.selectKey)}
              value={data[i.key]}
              inputPassword={i.inputPassword}
              label={i.label}
              required={i.required}
            />
          ))}
          <ButtonPrimary
            icon={true}
            title="Continue"
            onClick={props.clickHandler}
          />
        </div>
      </div>
    </div>
  );
}
