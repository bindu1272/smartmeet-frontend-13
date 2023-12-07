import {
  Col,
  Row,
  Form,
  Radio,
  Input,
  Space,
  DatePicker,
  Select,
  Switch,
  Checkbox,
  Button,
  Spin
} from "antd";
import { get } from "lodash";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonOutline from "../buttons/buttonOutline";
import ButtonPrimary from "../buttons/buttonPrimary";
import InputCustom from "../../components/inputCustom";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  geocodeByLatLng,
  getLatLng,
  // extractAddress
} from "react-google-places-autocomplete";
import {
  PlusOutlined,
  CloseCircleFilled,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import { getCountryCallingCode } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { DATE_FORMAT } from "../../utilities/constants";
import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();
const backendUrl = process.env.NEXT_PUBLIC_API_URL;



const { Option } = Select;

function AdditionalDetails({
  add,
  setAddAdditionalForm,
  editData,
  emergencyContacts,
  setEmergencyContacts,
  setEditData,
}) {
  const {data : session} = useSession();
  const [loading,setLoading] = useState(false);
  const [emergencyChecked, setEmergencyChecked] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(editData?.birth_country && JSON.parse(editData?.birth_country)?.selectedLocation);
  const [latLng, setLatLng] = useState({
    lat: editData?.birth_country && JSON.parse(editData?.birth_country)?.latLng?.lat,
    lng: editData?.birth_country && JSON.parse(editData?.birth_country)?.latLng?.lng,
  });
  const [selectedAddress, setSelectedAddress] = useState(editData?.birth_country && JSON.parse(editData?.birth_country)?.selectedAddress);
  const [placeId, setPlaceId] = useState(editData?.birth_country && JSON.parse(editData?.birth_country)?.placeId);
  const onFinish = async (values) => {
    const birth_country = {
      selectedAddress : selectedAddress,
      latLng: latLng,
      placeId: placeId
    }
    let formValues = { ...values };
    formValues["allergy_problems"] = JSON.stringify(values?.allergy_problems);
    formValues["emergency_contacts"] = JSON.stringify(emergencyContacts);
    formValues["medicare_valid"] = values?.medicare_valid?.format(DATE_FORMAT);
    formValues["d_v_a_expiry_date"] =
      values?.d_v_a_expiry_date?.format(DATE_FORMAT);
    formValues["healthcare_expiry"] =
      values?.healthcare_expiry?.format(DATE_FORMAT);
    formValues["pension_expiry"] = values?.pension_expiry?.format(DATE_FORMAT);
    formValues["user_id"] = session?.user?.id;
    formValues["birth_country"] = JSON.stringify(birth_country);
    if (editData?.uuid) {
      const updateUrl = `${backendUrl}/patients/additional-details/${editData?.uuid}`;
      setLoading(true);
      await axios
        .put(updateUrl, formValues)
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Err", err);
        });
    } else {
      const url = `${backendUrl}/patients/additional-details`;
      setLoading(true);
      await axios
        .post(url, formValues)
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Err", err);
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onSuccessAddress = (value) => {
    form.setFieldsValue({ birth_country: value?.formatted_address });
  };
  
  function showPosition(position) {
    if (position?.coords?.latitude && window) {
      let lat = position?.coords?.latitude;
      let lng = position?.coords?.longitude;
      if (latLng?.lat && latLng?.lng) {
        lat = latLng?.lat;
        lng = latLng?.lng;
      }

      geocodeByLatLng({
        lat: lat,
        lng: lng,
      })
        .then((results) => {
          console.log(
            "CURRENT LOCATION RESULTS ARE >>>> ",
            results,
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          );
          let filterData =
            results?.filter((result) => result.place_id == placeId)[0] ||
            results[0];
          setSelectedLocation({
            label: get(filterData, "formatted_address"),
            value: filterData,
          });
          setSelectedAddress(get(filterData, "formatted_address"));
        })
        .catch((error) => console.error(error));
    }
  }
  const onChangeEmergencyContact = (name, value, index) => {
    let contacts = [...emergencyContacts];
    if (name === "phone_number") {
      const phoneNumber = parsePhoneNumber(`${value}`);
      if (phoneNumber) {
        contacts[index] = {
          ...contacts[index],
          contactCode: getCountryCallingCode(phoneNumber?.country),
          contactNumber: `${value}`.slice(
            getCountryCallingCode(phoneNumber?.country)?.length + 1
          ),
        };
      }
    } else {
      contacts[index] = { ...contacts[index], [name]: value };
    }
    setEmergencyContacts([...contacts]);
  };
  const onChangeEmergency = (e) => {
    if (!emergencyChecked && emergencyContacts?.length <= 2) {
      let contacts = [...emergencyContacts];
      contacts.push({ name: "", surname: "", relation_ship: "" });
      setEmergencyContacts(contacts);
    }
    setEmergencyChecked(!emergencyChecked);
  };
  const [initialRender,setInitialRender] = useState(true);
  useEffect(() => {
    if(!initialRender){
      const getCurrentLocation = () => {
        try{
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          }
        }catch(err){console.log(err)}
      };
      getCurrentLocation();
    }else{
      setInitialRender(false);
    }
  }, [latLng?.lat,initialRender]);
  const [form] = Form.useForm();
  useEffect(() => {
    if(editData){
    form.setFieldsValue(editData);
    }
  }, [editData]);
 
    
  return (
    <Spin spinning={loading}>
    <div className="sec">
      <Form
        // name="basic"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={editData}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <h4 className="title">
              <b>Medicare And Private Health Insurance</b>
            </h4>
          </Col>
          <Col>
            <Row>
              <Space>
                {add ? (
                  <ButtonOutline
                    title="Cancel"
                    theme="red"
                    onClick={() => setAddAdditionalForm(false)}
                  />
                ) : null}

                <ButtonPrimary
                  title={editData ? "update" : "save"}
                  theme="green"
                  htmlType="submit"
                />
              </Space>
            </Row>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12} className="item-col">
            <div className="heading">Medicare Number</div>
            <Form.Item
              name="medicare_number"
              rules={[
                {
                  required: true,
                  message: "Please enter Medicare Number",
                },
              ]}
            >
              <InputCustom
                name="medicare_number"
                placeholder="Enter medicare number"
              />
            </Form.Item>
          </Col>
          <Col span={12} className="item-col">
            <div className="heading">IRN</div>
            <Form.Item
              name="irn_number"
              rules={[
                {
                  required: true,
                  message: "Please enter IRN",
                },
              ]}
            >
              <InputCustom
                placeholder="Enter IRN"
                className="custom-input"
                required
                size="large"
                name="irn_number"
              />
            </Form.Item>
          </Col>
          <Col span={12} className="item-col">
            <div className="heading">Valid until</div>
            <Form.Item
              name="medicare_valid"
              rules={[
                {
                  required: true,
                  message: "Please enter valid Date",
                },
              ]}
            >
              <DatePicker
                className="custom-date"
                size={"large"}
                defaultValue={editData?.medicare_valid}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-between" align="middle">
          <Col>
            <h4 className="title">
              <b>Your Background</b>
            </h4>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12} className="item-col">
            <div className="heading-form">Country of Birth</div>
            <Form.Item
              valuePropName={editData?.birth_country}
              name="birth_country"
            >
              {/* <GooglePlacesAutocomplete
                defaultInputValue={editData?.birth_country}
                apiKey={process.env.REACT_APP_GOOGLE_LOCATION_KEY}
                autocompletionRequest={{
                  fields: ["address_component", "geometry"],
                  // types: ['establishment'],
                }}
                selectProps={{
                  placeholder: "Search location...",
                  onChange: async (va) => {
                    onSuccessAddress(
                      // extractAddress(
                      await geocodeByPlaceId(get(va, "value.place_id"))
                      // )
                    );
                  },
                }}
              /> */}
                      <GooglePlacesAutocomplete
                              apiKey={process.env.REACT_APP_GOOGLE_LOCATION_KEY}
                              selectProps={{
                                value: selectedLocation,
                                onChange: async (va) => {
                                geocodeByPlaceId(
                                  get(va, "value.place_id")
                                ).then((results) => {
                                  console.log("results",results)
                                  let filterData = results?.filter(result=> result?.place_id == va?.value?.place_id)[0];
                                  setPlaceId(va?.value?.place_id)
                                  getLatLng(filterData).then((latLng) => {
                                    setLatLng({
                                      lat: latLng.lat,
                                      lng: latLng.lng,
                                    });
                                  });
                                  onSuccessAddress(filterData)
                                })
                            },
                          }
                            }
                            />
                            
            </Form.Item>
          </Col>
          <Col span={12} className="item-col">
            <div className="heading-form">Cultural Background</div>
            <Form.Item
              name="cultural_background"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select className="select-code" defaultValue={"hindu"}>
                <Option value="Hindu">Hindu</Option>
                <Option value="Muslim">Muslim</Option>
                <Option value="christian">christian</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} className="item-col">
            <div className="heading-form">Primary Language</div>
            <Form.Item
              name="primary_language"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select className="select-code" defaultValue="English">
                <Option value="Telugu">Telugu</Option>
                <Option value="Hindi">Hindi</Option>
                <Option value="English">English</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} className="item-col">
            <div className="heading-form">Martial Status</div>
            <Form.Item
              name="maritial_status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select className="select-code" defaultValue="Married">
                <Option value="Married">Married</Option>
                <Option value="UnMarried">UnMarried</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} className="item-col">
            <div className="heading-form">Occupation</div>
            <Form.Item
              name="occupation"
              rules={[
                {
                  required: true,
                  message: "Please enter Occupation",
                },
              ]}
            >
              <InputCustom placeholder="Enter Occupation" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-between" align="middle">
          <Col>
            <h4 className="title">
              <b>Emergency Contact</b>
            </h4>
          </Col>
        </Row>
        {emergencyContacts?.map((emergencyContact, index) => {
          return (
            <Row gutter={16} key={index}>
              <Col span={12} className="item-col">
                <div className="heading-form">Name</div>
                <Form.Item
                  name={"name" + index}
                  valuePropName={emergencyContact?.name}
                  rules={[
                    {
                      required: true,
                      message: "Please enter name",
                    },
                  ]}
                >
                  <InputCustom
                    placeholder="Enter name"
                    value={emergencyContact?.name}
                    onChange={(value) =>
                      onChangeEmergencyContact("name", value, index)
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12} className="item-col">
                <div className="heading-form">Surname</div>
                <Form.Item
                  name={"surname" + index}
                  valuePropName={emergencyContact?.surname}
                  rules={[
                    {
                      required: true,
                      message: "Please enter surname",
                    },
                  ]}
                >
                  <InputCustom
                    placeholder="Enter surname"
                    value={emergencyContact?.surname}
                    onChange={(value) =>
                      onChangeEmergencyContact("surname", value, index)
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12} className="item-col">
                <div className="heading-form">RelationShip</div>
                <Form.Item
                  name={"relation_ship" + index}
                  valuePropName={emergencyContact?.relation_ship}
                  rules={[
                    {
                      required: true,
                      message: "Please enter Relation Ship",
                    },
                  ]}
                >
                  <InputCustom
                    placeholder="Enter Relation Ship"
                    value={emergencyContact?.relation_ship}
                    onChange={(value) =>
                      onChangeEmergencyContact("relation_ship", value, index)
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12} className="item-col">
                <div className="heading-form">Phone Number</div>
                <Form.Item
                  name={"phone_number" + index}
                  rules={[
                    {
                      required: true,
                      message: "Please enter Phone Number",
                    },
                  ]}
                >
                  <PhoneInput
                    placeholder="Phone"
                    // country={emergencyContact?.contactCode}
                    // value={emergencyContact?.contactNumber}
                    onChange={(value) =>
                      onChangeEmergencyContact("phone_number", value, index)
                    }
                  />
                </Form.Item>
              </Col>
              {index === 0 ? (
                <Checkbox
                  checked={emergencyChecked}
                  onChange={onChangeEmergency}
                >
                  My next of kin is the same as my emergency contact
                </Checkbox>
              ) : null}
            </Row>
          );
        })}

        <Row justify="space-between" align="middle">
          <Col>
            <h4 className="title">
              <b>DVA, healthCare and pension Cards</b>
            </h4>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12} className="item-col">
            <div className="heading-form">DVA file number</div>
            <Form.Item
              name="d_v_a_file_number"
              rules={[
                {
                  required: true,
                  message: "Please enter DVA file number",
                },
              ]}
            >
              <InputCustom placeholder="Enter DVA file Number" />
            </Form.Item>
          </Col>
          <Col span={12} className="item-col">
            <div className="heading-form" style={{ marginTop: "8px" }}>
              Expiry Date
            </div>
            <Form.Item
              name="d_v_a_expiry_date"
              rules={[
                {
                  required: true,
                  message: "Please enter DVA Expiry Date",
                },
              ]}
            >
              <DatePicker
                className="custom-date"
                size={"large"}
                defaultValue={editData?.dva_expiry_date}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="item-col">
            <div className="heading-form">Healthcare Card Number</div>
            <Form.Item
              name="healthcare_card_number"
              rules={[
                {
                  required: true,
                  message: "Please enter Healthcare Card Number",
                },
              ]}
            >
              <InputCustom placeholder="Enter HealthCare Card Number" />
            </Form.Item>
          </Col>
          <Col span={12} className="item-col">
            <div className="heading-form" style={{ marginTop: "8px" }}>
              Expiry Date
            </div>
            <Form.Item
              name="healthcare_expiry"
              rules={[
                {
                  required: true,
                  message: "Please enter HealthCare Expiry",
                },
              ]}
            >
              <DatePicker
                className="custom-date"
                size={"large"}
                defaultValue={editData?.healthcare_expiry}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="item-col">
            <div className="heading-form">PensionCard Number</div>
            <Form.Item
              name="pension_card_number"
              rules={[
                {
                  required: true,
                  message: "Please enter PensionCard Number",
                },
              ]}
            >
              <InputCustom placeholder="Enter PensionCard Number" />
            </Form.Item>
          </Col>
          <Col span={12} className="item-col">
            <div className="heading-form" style={{ marginTop: "8px" }}>
              Expiry Date
            </div>
            <Form.Item
              name="pension_expiry"
              rules={[
                {
                  required: true,
                  message: "Please enter Expiry Date",
                },
              ]}
            >
              <DatePicker
                className="custom-date"
                size={"large"}
                defaultValue={editData?.pension_expiry}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-between" align="middle">
          <Col>
            <h4 className="title">
              <b>Allergies and intolerances</b>
            </h4>
          </Col>
        </Row>
        <Form.List name="allergy_problems">
          {(allergy_problems, { add, remove }) => (
            <div>
              {allergy_problems.map(({ name, fieldKey, key }, index) => {
                return (
                  <div key={index}>
                    <Form.Item
                      name={[index, "problemType"]}
                      label="problemType"
                      rules={[{ required: true }]}
                    >
                      <div style={{ display: "flex" }}>
                        <Input
                          fieldKey={[fieldKey, "problemType"]}
                          defaultValue={
                            editData?.allergy_problems[index]?.problemType
                          }
                          placeholder="Enter your problems"
                        />
                        <CloseCircleFilled
                          style={{ fontSize: "20px" }}
                          onClick={() => remove(name)}
                        />
                      </div>
                    </Form.Item>
                  </div>
                );
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Problem
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
        <Row justify="space-between" align="middle">
          <Col>
            <h4 className="title">
              <b>Information Sharing</b>
            </h4>
            <p>
              I consent to sending information to the Australian Childhood
              immunisation Register and Pap Smear Register, and receving
              communication from them{" "}
            </p>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
            />
          </Col>
        </Row>
      </Form>
    </div>
    </Spin>
  );
}
export default AdditionalDetails;