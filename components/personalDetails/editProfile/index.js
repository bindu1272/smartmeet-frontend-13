"use client";
import { useState, useEffect, useRef } from "react";
import {
  Col,
  Row,
  Radio,
  Divider,
  Form,
  Button,
  Input,
  DatePicker,
} from "antd";
import ButtonPrimary from "../../../components/buttons/buttonPrimary";
import InputCustom from "../../../components/inputCustom";
// import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  geocodeByLatLng,
  getLatLng,
} from "react-google-places-autocomplete";
// styles
import styles from "./styles.module.scss";
import { assign, get, omit } from "lodash";
import { authorizePutRequest } from "../../../utilities/axiosHelper";
import { TitleSelector } from "../../titleSelector/TitleSelector";
import SingleImageUpload from "../../mediaUpload/SingleImageUpload";
import { axiosInstance } from "../../../remote/axios";
import { useSession } from "next-auth/react";
import ContactCodeSelector from "../../contactCodeSelector";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function EditProfile({ onClick, data, getProfileDetails }) {
  const router = useRouter();
  var done = 0,
    cancelled = 0,
    no_show = 0;

  for (var i = 0; i < get(data, "stats")?.length; ++i) {
    if (get(data, "stats")[i].status.value === 3) {
      done = get(data, "stats")[i].count;
    }
    if (get(data, "stats")[i].status.value === 2) {
      no_show = get(data, "stats")[i].count;
    }
    if (get(data, "stats")[i].status.value === 4) {
      cancelled = get(data, "stats")[i].count;
    }
  }
  console.log("data", data?.user);

  const [value, setValue] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(
    data?.user ? data?.user?.address_details?.address_1?.selectedAddress : ""
  );
  const [selectedLocation_2, setSelectedLocation_2] = useState(
    data?.user ? data?.user?.address_details?.address_2?.selectedAddress_2 : ""
  );
  const [latLng, setLatLng] = useState({
    lat: data?.user ? data?.user?.address_details?.address_1?.latLng?.lat : "",
    lng: data?.user ? data?.user?.address_details?.address_1?.latLng?.lng : "",
  });
  const [latLng_2, setLatLng_2] = useState({
    lat_2: data?.user?.address_details?.address_2?.latLng_2?.lat_2,
    lng_2: data?.user?.address_details?.address_2?.latLng_2?.lng_2,
  });
  const [selectedAddress, setSelectedAddress] = useState(
    data?.user ? data?.user?.address_details?.address_1?.selectedAddress : ""
  );
  const [selectedAddress_2, setSelectedAddress_2] = useState(
    data?.user ? data?.user?.address_details?.address_2?.selectedAddress_2 : ""
  );
  const [placeId, setPlaceId] = useState(
    data?.user?.address_details?.address_1?.placeId
  );
  const [placeId_2, setPlaceId_2] = useState(
    data?.user?.address_details?.address_2?.placeId_2
  );
  const [imageUser, setUserImage] = useState();
  const [thumbnail, setThumbnail] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const { data: session, update: sessionUpdate } = useSession();
  const onFinish = async (values) => {
    assign(values, { image: get(imageUser, "key") });
    const address_1 = {
      selectedAddress: values?.address_1,
      latLng: latLng,
      placeId: placeId,
    };
    const address_2 = {
      selectedAddress_2: values?.address_2,
      latLng_2: latLng_2,
      placeId_2: placeId_2,
    };
    const payload = {
      ...values,
      insurance_details: { number: get(values, "insurance_number") },
      address_details: {
        suburb: get(values, "suburb"),
        state: get(values, "state"),
        country: get(values, "country"),
        pin_code: get(values, "pin_code"),
        address_1: address_1,
        address_2: address_2,
      },
      dob: moment(get(values, "dob")).format("YYYY-MM-DD"),
    };

    omit(payload, [
      "insurance_number,suburb,state,country,pin_code,address_1,address_2",
    ]);

    let result = await authorizePutRequest(
      axiosInstance,
      get(session, "user"),
      `/patients/users`,
      payload
    );
    const url = new URL(window.location.href);
    router.push("/");
    getProfileDetails();
    onClick();
  };

  // const [imageUser, setUserImage] = useState({
  //   key: get(data, "user?.image")?.replace(
  //     "https://storage.googleapis.com/smartmeet/",
  //     ""
  //   ),
  //   url: get(data, "user?.image"),
  // });

  // const onUploadLogoDone = (imageResponse) => {
  //   setUserImage(imageResponse);
  // };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();

  let defaultDatePickerValue = get(data, "user.dob", moment())
    ? moment(get(data, "user.dob", moment()), "YYYY-MM-DD HH:mm:ss")
    : "";
  const onSuccessAddress_2 = (value) => {
    form.setFieldsValue({ address_2: value?.formatted_address });
  };
  const onSuccessAddress_1 = (value) => {
    form.setFieldsValue({ address_1: value?.formatted_address });
  };


  function showPosition(position) {
    console.log("position", position);
    if (position) {
      geocodeByLatLng({
        lat: latLng?.lat ? latLng.lat : position.coords.latitude,
        lng: latLng?.lng ? latLng.lng : position.coords.longitude,
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

  function showPosition_2(position) {
    if (position) {
      geocodeByLatLng({
        lat: latLng_2?.lat_2 ? latLng_2.lat_2 : position?.coords?.latitude,
        lng: latLng_2?.lng_2 ? latLng_2.lng_2 : position?.coords?.longitude,
      })
        .then((results) => {
          console.log(
            "CURRENT LOCATION RESULTS ARE 2 >>>> ",
            results,
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          );
          let filterData =
            results?.filter((result) => result.place_id == placeId_2)[0] ||
            results[0];
          setSelectedLocation_2({
            label: get(filterData, "formatted_address"),
            value: filterData,
          });
          setSelectedAddress_2(get(filterData, "formatted_address"));
        })
        .catch((error) => console.error(error));
    }
  }

  useEffect(() => {
    // getCities();
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
    };
    getCurrentLocation();
  }, [latLng]);
  useEffect(() => {
    const getCurrentLocation_2 = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition_2);
      }
    };
    getCurrentLocation_2();
  }, [latLng_2]);
  const onUploadLogoDone = async (imageResponse) => {
    setUserImage({ ...imageResponse });
    // setThumbnail({ ...imageResponse });
    console.log("setSession", session);
    // await sessionUpdate(newSession);
    session.user.image = imageResponse;
  };

  return (
    <div className={styles["edit-profile-style"]}>
      <div className={styles["form-section"]}>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            email: get(data, "user.email"),
            gender: get(data, "user.gender"),
            title: get(data, "user.title"),
            name: get(data, "user.name"),
            contact_number: get(data, "user.contact_number"),
            contact_code: get(data, "user.contact_code"),
            suburb: get(data, "user.address_details.suburb"),
            state: get(data, "user.address_details.state"),
            country: get(data, "user.address_details.country"),
            pin_code: get(data, "user.address_details.pin_code"),
            address_1: get(
              data,
              "user.address_details.address_1.selectedAddress"
            ),
            address_2: get(
              data,
              "user.address_details.address_2.selectedAddress_2"
            ),
            blood_group: get(data, "user.blood_group"),
            height: get(data, "user.height"),
            weight: get(data, "user.weight"),
            // dob: moment(get(data, "user.dob", moment()), "YYYY-MM-DD HH:mm:ss"),
            // removed initial value from here and made it conditional because it was passing null date
            insurance_number: get(data, "user.insurance_details.number"),
          }}
        >
          <Row gutter={28}>
            <Col span={14}>
              <div className={styles["card"] + " " + "mb--50"}>
                <Row
                  className={styles["card-title"]}
                  justify="space-between"
                  align="baseline"
                >
                  <Col>My details</Col>
                  <Col>
                    {/* <ButtonPrimary
 title="Save"
 theme="green"
 onClick={onClick}
 /> */}
                    <ButtonPrimary
                      title="Save"
                      theme="green"
                      htmlType="submit"
                    />
                  </Col>
                </Row>
                <div className={styles["card-body"]}>
                  <div className={styles["form"]}>
                    <div className={styles["sec"]}>
                      <h4 className={styles["title"]}>USER INFORMATION</h4>

                      <Row gutter={16}>
                        <Col span={12} className={styles["item-col"]}>
                          <div className={styles["heading-form"]}>Name</div>
                          <Form.Item
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter name",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Name"
                              className={styles["custom-input"]}
                              required
                              addonBefore={TitleSelector}
                              size="large"
                            />
                          </Form.Item>
                        </Col>

                        <Col span={12} className={styles["item-col"]}>
                          <Form.Item
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Please enter email",
                              },
                            ]}
                          >
                            <InputCustom
                              placeholder="rhea@test.com"
                              label="Email address"
                              required
                              disabled={true}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12} className={styles["item-col"]}>
                          <div className={styles["gender-style"]}>
                            <div className={styles["label mb--20"]}>
                              Gender{" "}
                            </div>
                            <Form.Item
                              name="gender"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select gender",
                                },
                              ]}
                            >
                              <Radio.Group>
                                <Radio value={"M"}>Male</Radio>
                                <Radio value={"F"}>Female</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </div>
                        </Col>
                        <Col span={12} className={styles["item-col"]}>
                          <Form.Item name="insurance_number">
                            <InputCustom
                              placeholder="Enter details"
                              label="Insurance Details"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>

                    <Divider />

                    <div className={styles["sec"]}>
                      <h4 className={styles["title"]}>
                        CONTACT INFORMATION 
                      </h4>
                      <Row gutter={16}>
                        <Col span={12} className={styles["item-col"]}>
                          <div className={styles["heading-form"]}>
                            Contact Number
                          </div>
                          <Form.Item
                            name="contact_number"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input
                              className={styles["custom-input"]}
                              size="large"
                              // fontSize={{ fontSize: '14px !important' }}
                              addonBefore={ContactCodeSelector}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12} className={styles["item-col"]}>
                          <Form.Item
                            name="suburb"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <InputCustom label="Suburb" required />
                          </Form.Item>
                        </Col>
                        <Col span={12} className={styles["item-col"]}>
                          <Form.Item
                            name="state"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <InputCustom label="State" required />
                          </Form.Item>
                        </Col>
                        <Col span={12} className={styles["item-col"]}>
                          <Form.Item
                            name="country"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <InputCustom label="Country" required />
                          </Form.Item>
                        </Col>
                        <Col span={12} className={styles["item-col"]}>
                          <Form.Item
                            name="pin_code"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <InputCustom label="Pincode" required />
                          </Form.Item>
                        </Col>
                        <Col span={12} className={styles["item-col"]}>
                          <Form.Item
                            name="address_1"
                            label="Address 1"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <GooglePlacesAutocomplete
                              apiKey="AIzaSyAh3h-q27PS0_U2_jInAcFhfL7wV890WQc"
                              // apiKey={process.env.REACT_APP_GOOGLE_LOCATION_KEY}

                              selectProps={{
                                defaultInputValue: selectedLocation,
                                onChange: async (va) => {
                                  console.log("va***", va);
                                  geocodeByPlaceId(
                                    get(va, "value.place_id")
                                  ).then((results) => {
                                    let filterData = results?.filter(
                                      (result) =>
                                        result.place_id == va.value.place_id
                                    )[0];
                                    setPlaceId(va?.value?.place_id);
                                    getLatLng(filterData).then((latLng) => {
                                      setLatLng({
                                        lat: latLng.lat,
                                        lng: latLng.lng,
                                      });
                                    });
                                    onSuccessAddress_1(filterData);
                                  });
                                },
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12} className={styles["item-col"]}>
                          <Form.Item name="address_2" label="Address 2">
                            <GooglePlacesAutocomplete
                              apiKey="AIzaSyAh3h-q27PS0_U2_jInAcFhfL7wV890WQc"
                              // apiKey={process.env.REACT_APP_GOOGLE_LOCATION_KEY}
                              selectProps={{
                                defaultInputValue: selectedLocation_2,
                                // placeholder: "Search location...",
                                onChange: async (va) => {
                                  geocodeByPlaceId(
                                    get(va, "value.place_id")
                                  ).then((results) => {
                                    let filterData = results?.filter(
                                      (result) =>
                                        result.place_id == va.value.place_id
                                    )[0];
                                    setPlaceId_2(va?.value?.place_id);
                                    getLatLng(filterData).then((latLng) => {
                                      setLatLng_2({
                                        lat_2: latLng.lat,
                                        lng_2: latLng.lng,
                                      });
                                    });
                                    onSuccessAddress_2(filterData);
                                  });
                                },
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={10}>
              <div className={styles["profile-image-card"]}>
                <div className={styles["image-card"]}>
                  {/* <img
 src={get(data, 'user.image')}
 className={styles["icon-style mr--10"
 /> */}
                  <SingleImageUpload
                    onUploadDone={onUploadLogoDone}
                    imageUrl={get(imageUser, "url")}
                    className={styles["icon-style mr--10"]}
                    setImageUser={setUserImage}
                  />
                </div>

                <div className={styles["content-sec"]}>
                  <div className={styles["appointments mb--10"]}>
                    {" "}
                    Appointments
                  </div>

                  <div className={styles["number-section"]}>
                    <div className={styles["item"]}>
                      {done}
                      <span>Done</span>
                    </div>

                    <div className={styles["item"]}>
                      {cancelled}
                      <span>Cancelled</span>
                    </div>

                    <div className={styles["item"]}>
                      {no_show}
                      <span>No show</span>
                    </div>
                  </div>
                </div>

                <Divider />

                <div className={styles["personal-details"]}>
                  <div className={styles["item"]}>
                    <div className={styles["text-sec"]}>DOB :</div>
                    <Form.Item
                      name="dob"
                      size="large"
                      rules={[
                        {
                          required: true,
                          message: "Please enter date of birth",
                        },
                      ]}
                    >
                      <DatePicker
                        className={styles["custom-date"]}
                        size={"large"}
                        defaultValue={defaultDatePickerValue}
                      />
                    </Form.Item>
                  </div>

                  <div className={styles["item"]}>
                    <div className={styles["text-sec"]}>Blood group :</div>
                    <Form.Item
                      name="blood_group"
                      rules={[
                        {
                          required: true,
                          message: "Please enter blood group",
                        },
                      ]}
                    >
                      <InputCustom placeholder="A+" />
                    </Form.Item>
                  </div>
                  <div className={styles["item"]}>
                    <div className={styles["text-sec"]}>Height (m) :</div>
                    <Form.Item
                      name="height"
                      rules={[
                        {
                          required: true,
                          message: "Please enter height",
                        },
                      ]}
                    >
                      <InputCustom placeholder="1.78" />
                    </Form.Item>
                  </div>
                  <div className={styles["item"]}>
                    <div className={styles["text-sec"]}>Weight (Kg) :</div>
                    <Form.Item
                      name="weight"
                      rules={[
                        {
                          required: true,
                          message: "Please enter weight",
                        },
                      ]}
                    >
                      <InputCustom placeholder="50" />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
