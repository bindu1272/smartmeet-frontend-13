"use client";
import { InputNumber, Row, Col, Select, Input, Checkbox, Form } from 'antd';
import SelectTime from '../../selectTime';
import InputCustom from '../../../components/inputCustom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import ButtonPrimary from '../../buttons/buttonPrimary';
import Image from "next/image";

import React, { useState, useEffect } from 'react';
const { Option } = Select;
const { TextArea } = Input;

import styles from './styles.module.scss';
import { assign, get } from 'lodash';
import { axiosInstance } from '../../../remote/axios';
import ContactCodeSelector from '../../contactCodeSelector';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete';
import { putTimeHelper } from '../../../utilities/putTimeHelper';
import { getTimeProps } from 'antd/lib/date-picker/generatePicker';
import { getTimeHelper } from '../../../utilities/getTimeHelper';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumber } from 'react-phone-number-input'
import { getCountryCallingCode } from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import hospitalStyles from './hospitalstyles.module.scss';
import { parsePhoneNumberFromString } from 'libphonenumber-js';


AboutHospital.propTypes = {
  active: PropTypes.bool,
  clickHandler: PropTypes.func,
  data: PropTypes.object,
  errors: PropTypes.any,
  onChange : PropTypes.any,
  onClickBack : PropTypes.any,
};

export default function AboutHospital(props) {
  const [specialisations, setSpecialisations] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [loading,setLoading]= useState(false);
  const children = specialisations.map((s) => (
    <Option key={s.id} value={s.id}>
      {s.name}
    </Option>
  ));

  const getSpecialisations = () => {
    axiosInstance
      .get('/specialisations')
      .then((res) => setSpecialisations(get(res, 'data.data')));
  };

  const getCities = () => {
    axiosInstance
      .get('/cities')
      .then((res) => setCities(get(res, 'data.data')));
  };

  const handleCity = (value) => {
    setSelectedCity(cities?.[value]);
    onChangeFormData(cities[value].id, 'city_uuid');
  };

  const getGeoMetry = (details, geometry) => {
    const geo = geometry[0].geometry;

    var addressData = {};
    const address_components = get(geometry[0], 'address_components');
    const formattedAddress = get(geometry[0], 'formatted_address').split(',');

    for (var i = 0; i < address_components.length; i++) {
      if (get(address_components[i], 'types').includes('country')) {
        assign(addressData, {
          country: get(address_components[i], 'long_name'),
        });
      }
      if (get(address_components[i], 'types').includes('postal_code')) {
        assign(addressData, {
          pin_code: get(address_components[i], 'long_name'),
        });
      }
      if (
        get(address_components[i], 'types').includes(
          'administrative_area_level_1'
        )
      ) {
        assign(addressData, {
          state: get(address_components[i], 'long_name'),
        });
      }
      if (get(address_components[i], 'types').includes('sublocality_level_1')) {
        assign(addressData, {
          suburb: get(address_components[i], 'long_name'),
        });
      }
    }

    assign(addressData, {
      address_1: formattedAddress
        .slice(0, formattedAddress.length - 3)
        .join(''),
    });
    assign(addressData, {
      address_2: formattedAddress.slice(-3).join(''),
    });

    console.log('ADDRESS >>> ', addressData);

    onChangeAddress(addressData);
  };

  useEffect(() => {
    getSpecialisations();
    getCities();
  }, []);

  // const onChangeFormData = (value, key) => {
  //   if(key === "contact_number"){
  //     const phoneNumber = parsePhoneNumber(`${value}`);
  //     if (phoneNumber) {
  //       props.onChange({  
  //       "contact_number":`${value}`?.slice(getCountryCallingCode(phoneNumber?.country)?.length+1),
  //       "contact_code":getCountryCallingCode(phoneNumber?.country)
  //     });
  //     }
  //   }else{
  //     props.onChange({ ...props.data, [key]: value });
  //   }
  // };

  const onChangeFormData = (value, key) => {
    if (key === 'contact_number') {
      const phoneNumber = parsePhoneNumberFromString((String(value)));
      if (phoneNumber && phoneNumber.isValid()) {
        const formattedNumber = phoneNumber?.nationalNumber;
        const callingCode = phoneNumber.countryCallingCode;
        props.onChange({
          contact_number: formattedNumber,
          contact_code: callingCode,
        });
      }
    } else {
      props.onChange({ ...props.data, [key]: value });
    }
  };

  const onChangeAddress = (addressData) => {
    props.onChange({ ...props.data, ...addressData });
  };
  const [hospitalAgents,setHospitalAgents] = useState();
  
return (
  <div className={props.active ? styles["register-section"] : styles["register-section"] + " " +"d-none"}>
    <div className={hospitalStyles["form-section"]}>
      <Row align="bottom" justify="space-between" className={hospitalStyles["logo"]}>
        <Col>
          <div>
            <Image src="../../static/images/logo/logo.svg" alt="" width={10}
          height={10}/>
          </div>
        </Col>
        <Col className={hospitalStyles["back-link"]} onClick={props.onClickBack}>
          Go back
        </Col>
      </Row>
      <h3 className={styles["title3"]}>Tell us about your hospital</h3>
      <div className={styles["form"]}>
        <InputCustom
          onChange={(value) => onChangeFormData(value, "name")}
          value={props.data.name}
          error={get(props, "errors.name")}
          placeholder="Enter Hospital Name"
          label="Hospital Name"
        />

        <div className={styles["select-custom"]}>
          <div className={styles["label"]}>Specialisation</div>
          <Form.Item
            validateStatus={
              !get(props, "errors.specialisations") ? "validating" : "error"
            }
            help={get(props, "errors.specialisations")}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              onChange={(value) => onChangeFormData(value, "specialisations")}
              value={props.data.specialisations}
              placeholder="Multiple Selection"
              getPopupContainer={(trigger) => trigger.parentNode} // to avoid dropdown scrolling
            >
              {children}
            </Select>
          </Form.Item>
        </div>

        <div className={styles["textArea-custom"]}>
          <div className={styles["label"]}>Explain in few words about your hospital</div>
          <Form.Item
            validateStatus={
              !get(props, "errors.description") ? "validating" : "error"
            }
            help={get(props, "errors.description")}
          >
            <TextArea
              onChange={(e) =>
                onChangeFormData(e.currentTarget.value, "description")
              }
              value={props.data.description}
            />
          </Form.Item>
        </div>

        <div className={styles["label"]}>City</div>
        <Form.Item
          validateStatus={
            !get(props, "errors.city_uuid") ? "validating" : "error"
          }
          help={get(props, "errors.city_uuid")}
        >
          <Select
            size="large"
            style={{ width: "100%" }}
            onChange={(value) => handleCity(value)}
            value={get(selectedCity, "name")}
            placeholder="Select City"
            getPopupContainer={(trigger) => trigger.parentNode} // to avoid dropdown scrolling
          >
            {map(cities, (city, index) => (
              <Option key={index} value={index}>
                {get(city, "name")}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div className={styles["hospital-address"]}>
          <div className={styles["label"]}>Hospital Address</div>
          <GooglePlacesAutocomplete
                apiKey="AIzaSyAh3h-q27PS0_U2_jInAcFhfL7wV890WQc"

          // apiKey={process.env.REACT_APP_GOOGLE_LOCATION_KEY}
            // autocompletionRequest={{
            //   location: {
            //     lat: parseFloat(get(selectedCity, "lat")),
            //     lng: parseFloat(get(selectedCity, "lng")),
            //   },

            //   radius: get(selectedCity, "radius"),
            // }}
            selectProps={{
              onChange: (value) => {
                geocodeByPlaceId(get(value, "value.place_id"))
                  .then((results) => getGeoMetry(value, results))
                  .catch((error) => console.log("Something went wrong", error));
              },
            }}
          />
        </div>

        <InputCustom
          onChange={(value) => onChangeFormData(value, "address_1")}
          value={props.data.address_1}
          error={get(props, "errors.address_1")}
          placeholder="Enter address line 1"
          label="Address 1"
        />
        <InputCustom
          onChange={(value) => onChangeFormData(value, "address_2")}
          value={props.data.address_2}
          error={get(props, "errors.address_2")}
          placeholder="Enter address line 2"
          label="Address 2"
        />

        <InputCustom
          onChange={(value) => onChangeFormData(value, "pin_code")}
          value={props.data.pin_code}
          error={get(props, "errors.pin_code")}
          placeholder="Enter Pincode"
          label="Pincode"
        />

        <div className={styles["input-number-custom"]}>
          <div className={styles["label"]}>Number of Doctors</div>
          <Form.Item
            validateStatus={
              !get(props, "errors.doctor_count") ? "validating" : "error"
            }
            help={get(props, "errors.doctor_count")}
          >
            <InputNumber
              onChange={(value) => onChangeFormData(value, "doctor_count")}
              value={props.data.doctor_count}
              placeholder="Enter Number"
              error={get(props, "errors.name")}
              min={1}
              max={100}
              defaultValue={1}
            />
          </Form.Item>
        </div>
        <InputCustom
          onChange={(value) =>
            onChangeFormData(value, "appointment_booking_duration")
          }
          error={get(props, "errors.appointment_booking_duration")}
          value={props.data.appointment_booking_duration}
          placeholder="Enter appointment booking duration"
          label="Appointment Booking Duration"
        />

        <div className={styles["input-multiple"]}>
          <div className={styles["label"]}>Contact Number</div>
          <Form.Item
            validateStatus={
              !get(props, "errors.contact_number") ? "validating" : "error"
            }
            help={get(props, "errors.contact_number")}
          >
            <PhoneInput
              // style={{width:"100%",padding:"6px"}}
              // international={true}
              placeholder="Phone"
              // country={'india'}
              // error = {isValidPhoneNumber(`${props.data.contact_number}`) ? 'validating' :'error'}
              // value={props.data.contact_number}
              onChange={(value) => onChangeFormData(value, "contact_number")}
            />
            {/* <Input
                placeholder="Phone"
                value={props.data.contact_number}
                onChange={(e) =>
                  onChangeFormData(e.currentTarget.value, 'contact_number')
                }
                addonBefore={ContactCodeSelector}
              /> */}
          </Form.Item>
        </div>

        {/* <div className={styles["input-multiple">
            <div className={styles["label">Website Url</div>
            <Row>
              <Col span={18} push={6}>
                <Form.Item validateStatus={!get(props, 'errors.website') ? "validating" : "error"} help={get(props, 'errors.website')} >
                  <Input
                    onChange={e => onChangeFormData(e.currentTarget.value, 'website')}
                    value={props.data.website}
                    placeholder="myhospital.com" className={styles["hospital-url" />
                </Form.Item>
              </Col>
              <Col span={6} pull={18}>
                <Input
                  placeholder="https://"
                  value="https://"
                  className={styles["static-url"
                />
              </Col>
            </Row>
          </div> */}

        <InputCustom
          onChange={(value) => onChangeFormData(value, "fax_number")}
          error={get(props, "errors.fax_number")}
          value={props.data.fax_number}
          placeholder="Enter Number"
          label="Fax Number"
        />

        <div className={styles["open-hours"]}>
          <div className={styles["label"]}>Open Hours</div>
          <div className={styles["small-label"]}>
            <Row>
              <Col span={12} push={12}>
                Work Hours
              </Col>
              <Col span={12} pull={12}>
                Work days
              </Col>
            </Row>
          </div>
          <SelectTime
            openHours={props.data.working_hours}
            setOpenHours={(value) => onChangeFormData(value, "working_hours")}
            // onChange={onChange}
          />
        </div>

        <Row className={styles["sponsorship checkbox-inner-style"]} align="middle">
          <Col className={styles["label"]} span={20}>
            Sponsorship required?{" "}
            <Image alt=""
              src="../../static/images/icons/info-circle.svg"
              className={styles["info-circle"]}
              width={160} height={24.55}
            />
          </Col>

          {/* <Col className={styles["flex-inner" span={4}> */}
          <Col span={4}>
            <Checkbox
              onChange={(event) =>
                onChangeFormData(
                  !props.data.sponsership_required,
                  "sponsership_required"
                )
              }
              checked={props.data.sponsership_required}
            >
              Yes
            </Checkbox>
          </Col>
        </Row>

        <div className={styles["select-custom"]}>
          <div className={styles["label"]}>Billing Method</div>
          <Form.Item
            validateStatus={
              !get(props, "errors.billing_method") ? "validating" : "error"
            }
            help={get(props, "errors.billing_method")}
          >
            <Select
              showSearch
              placeholder="Select"
              onChange={(value) => onChangeFormData(value, "billing_method")}
              value={props.data.billing_method}
            >
              <Option value={2}>Per Hospital</Option>
              <Option value={3}>Per Doctor</Option>
              <Option value={1}>Per Appointment</Option>
            </Select>
          </Form.Item>
        </div>
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
