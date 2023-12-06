"use client";
import { useState, useEffect } from "react";
import assign from "lodash/assign";
import get from "lodash/get";
import { useSession } from "next-auth/react";
import {
  Form,
  Button,
  Radio,
  Input,
  Spin,
  Row,
  Col,
  Select,
  Checkbox,
  Upload,
} from "antd";
import axios from "axios";
import ContactCodeSelector from "../../contactCodeSelector";
import { useRouter } from "next/navigation";
import {
  CloseCircleFilled,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
// styles
import { axiosInstance } from "../../../remote/axios";
import styles from "./styles.module.scss";
import { TitleSelector } from "../../titleSelector/TitleSelector";
import { signIn } from "next-auth/react";
import getConfig from "next/config";
import SingleImageUpload from "../../mediaUpload/SingleImageUpload";
import SingleFileUpload from "../../mediaUpload/SingleFileUpload";
import Image from "next/image";
// const { publicRuntimeConfig } = getConfig();
const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BookConsultationPage({
  props,
  loading,
  onFinish,
  onFinishFailed,
  session,
  selectOnchange,
  handleChangeFile,
  fileUrl,
  fileOnchange,
  imageUrl,
  handleChangeImage,
  handleOptions,
  removeOption,
  handleRemove,
  addOption,
  options,
  uploadButton,
  questionType,
  OPTION_TYPES,
  hospitalQuestions,
  handleQuestionType,
  hospital,
  doctor,
  slot,
  onAppointmentCreated,
  initialValues,
}: any) {
  return (
    <Spin spinning={loading}>
      <Form
        name="appointment"
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        onFinishFailed={onFinishFailed}
        // initialValues={
        //   get(session, "user")
        //     ? {
        //         email: get(session, "user.email"),
        //         contact_number: get(session, "user.contact_number"),
        //         contact_code: get(session, "user.contact_code"),
        //         name: get(session, "user.name"),
        //         title: get(session, "user.title"),
        //       }
        //     : {}
        // }
      >
        <div className={styles["book-consultation-style"]}>
          <div className={styles["modal-title"]}>Book Consultation</div>

          {/* <div className={styles["select-mode checkbox-inner-style"> */}
          {/* <div className={styles["text-info">
              For whom you wanna book consulation{' '}
              <span className={styles["text-danger">*</span>
            </div> */}
          <Form.Item
            label="For whom you want to book consulation"
            name="consultation_type"
            rules={[
              {
                required: true,
                message: "Please select consultation For",
              },
            ]}
          >
            <Radio.Group>
              <div className={styles["select-area"]}>
                <Radio value={1}>Myself</Radio>
                <Radio value={2}>Family</Radio>
              </div>
            </Radio.Group>
          </Form.Item>
          {/* </div> */}

          <div className={styles["form-section"]}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please Input Name",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Name"
                addonBefore={TitleSelector}
              />
            </Form.Item>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please Input email Address",
                },
                {
                  type: "email",
                  message: "Invalid Email Format",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Email"
                disabled={get(session, "user") ? true : false}
              />
            </Form.Item>

            <Form.Item
              label="Contact Number"
              name="contact_number"
              rules={[
                {
                  required: true,
                  message: "Please Input Contact number",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Contact"
                addonBefore={ContactCodeSelector}
                // addonBefore={addonBefore={ContactCodeSelector}}
              />
            </Form.Item>
            <Row
              style={{ display: "flex", marginBottom: 8 }}
              // align="baseline"
              justify="space-between"
            >
              <Col span={22}>
                {hospitalQuestions &&
                  hospitalQuestions?.map(
                    (hospitalQuestion: any, index: any) => {
                      let options =
                        hospitalQuestion?.question?.options &&
                        JSON?.parse(
                          hospitalQuestion?.question?.options
                            ? hospitalQuestion?.question?.options
                            : []
                        );
                      let type = hospitalQuestion?.question?.type;
                      const temp = options?.map((option: any, index: any) => {
                        return { label: `option${index + 1}`, value: option };
                      });
                      let questionOptions = {
                        [type]: temp,
                      };
                      let items = [];
                      if (
                        hospitalQuestion?.question?.type ===
                        OPTION_TYPES?.DROPDOWN
                      ) {
                        items = questionOptions[OPTION_TYPES?.DROPDOWN]?.map(
                          (op: any, index: any) => ({
                            value: op?.value,
                            label: op?.value,
                            key: op?.index,
                          })
                        );
                      }
                      return (
                        <div key={index}>
                          <Form.Item
                            label={hospitalQuestion?.question?.question}
                          >
                            {hospitalQuestion?.question?.type ===
                            OPTION_TYPES?.RADIO ? (
                              <Radio.Group
                                name="type"
                                onChange={handleQuestionType}
                              >
                                {questionOptions[
                                  hospitalQuestion?.question?.type
                                ]?.map((questionOption: any,index:any) => {
                                  return (
                                    <Radio
                                    key={index}
                                      value={questionOption?.value}
                                      onChange={() =>
                                        selectOnchange(
                                          hospitalQuestion?.question?.id,
                                          questionOption?.value,
                                          hospitalQuestion?.question?.type
                                        )
                                      }
                                    >
                                      {questionOption?.value}
                                    </Radio>
                                  );
                                })}
                              </Radio.Group>
                            ) : null}
                            {hospitalQuestion?.question?.type ===
                            OPTION_TYPES?.DROPDOWN ? (
                              <Select
                                placeholder="Select Option"
                                labelInValue
                                style={{
                                  width: 120,
                                }}
                                onChange={(event) =>
                                  selectOnchange(
                                    hospitalQuestion?.question?.id,
                                    event,
                                    hospitalQuestion?.question?.type
                                  )
                                }
                                options={items}
                              />
                            ) : null}
                            {hospitalQuestion?.question?.type ===
                            OPTION_TYPES?.INPUT ? (
                              <Input
                                type="text"
                                placeholder="Enter Answer"
                                name="question"
                                onChange={(event) =>
                                  selectOnchange(
                                    hospitalQuestion?.question?.id,
                                    event,
                                    hospitalQuestion?.question?.type
                                  )
                                }
                              />
                            ) : null}
                            {hospitalQuestion?.question?.type ===
                            OPTION_TYPES?.CHECKBOX ? (
                              <>
                                {questionOptions[OPTION_TYPES.CHECKBOX]?.map(
                                  (op: any,index:any) => {
                                    return (
                                      <Checkbox
                                      key={index}
                                        onChange={() =>
                                          selectOnchange(
                                            hospitalQuestion?.question?.id,
                                            op?.value,
                                            hospitalQuestion?.question?.type
                                          )
                                        }
                                      >
                                        {op?.value}
                                      </Checkbox>
                                    );
                                  }
                                )}
                              </>
                            ) : null}
                            {hospitalQuestion?.question?.type ===
                            OPTION_TYPES?.FILE ? (
                              <>
                                <Upload
                                  accept=".doc,.docx,application/pdf"
                                  name="file"
                                  action={`${backendUrl}/contactus/pdf`}
                                  className={styles["avatar-uploader"]}
                                  showUploadList={true}
                                  // beforeUpload={beforeUpload}
                                  onChange={(event) =>
                                    handleChangeFile(
                                      event,
                                      hospitalQuestion?.question?.id
                                    )
                                  }
                                >
                                  {fileUrl ? (
                                    <video
                                      src={fileUrl}
                                      // alt="avatar"
                                      style={{ width: "100%" }}
                                      onChange={() =>
                                        fileOnchange(
                                          hospitalQuestion?.question?.id,
                                          event
                                        )
                                      }
                                    />
                                  ) : (
                                    uploadButton
                                  )}
                                </Upload>

                                {/* <SingleFileUpload
                          onUploadDone={onUploadFileDone}
                          imageUrl={get(fileUser, "url")}
                          className={styles["icon-style mr--10"]}
                          setImageUser={setFileUser}
                          /> */}
                                {/* <Button onClick={deleteFile}>
                          Cancel 
                          </Button> */}
                              </>
                            ) : null}
                            {hospitalQuestion?.question?.type ===
                            OPTION_TYPES?.IMAGE ? (
                              <>
                                <Upload
                                  name="file"
                                  action={`${backendUrl}/contactus/image`}
                                  listType="picture-card"
                                  className={styles["avatar-uploader"]}
                                  showUploadList={false}
                                  // beforeUpload={beforeUpload}
                                  onChange={(event) =>
                                    handleChangeImage(
                                      event,
                                      hospitalQuestion?.question?.id
                                    )
                                  }
                                >
                                  {imageUrl?.[
                                    hospitalQuestion?.question?.id
                                  ] ? (
                                    <div style={{ position: "relative" }}>
                                      <Image  width={10} height={10}
                                        src={
                                          imageUrl?.[
                                            hospitalQuestion?.question?.id
                                          ]
                                        }
                                        alt="avatar"
                                        style={{ width: "100%" }}
                                      />
                                      <div
                                        style={{
                                          position: "absolute",
                                          top: 0,
                                          right: 0,
                                          cursor: "pointer",
                                          background: "#fff",
                                          padding: "4px",
                                        }}
                                        onClick={handleRemove}
                                      >
                                        Remove
                                      </div>
                                    </div>
                                  ) : (
                                    uploadButton
                                  )}
                                </Upload>
                                {/* <SingleImageUpload
                          onUploadDone={onUploadLogoDone}
                          imageUrl={get(imageUser, "url")}
                          className={styles["icon-style mr--10"]}
                          setImageUser={setImageUser}
                          /> */}
                                {/* <Button onClick={deleteImage}>
                          Cancel 
                          </Button> */}
                              </>
                            ) : null}
                          </Form.Item>
                        </div>
                      );
                    }
                  )}
              </Col>

              {options?.[questionType]?.map((option: any, index: any) => {
                return (
                  <Row key={index}>
                    <div style={{ display: "flex" }}>
                      <Input
                        placeholder={option?.label || "Enter Option"}
                        type="text"
                        name="value"
                        defaultValue={option?.value}
                        onChange={(event) => handleOptions(event, index)}
                      />
                      <CloseCircleFilled
                        style={{ fontSize: "20px" }}
                        onClick={() => removeOption(index)}
                      />
                    </div>
                  </Row>
                );
              })}
              {options?.[questionType] ? (
                <PlusOutlined onClick={addOption} />
              ) : null}
            </Row>
            {get(session, "user") && (
              <div className={styles[`button-primary ${props?.theme}`]}>
                <Form.Item>
                  <Button type="primary" onClick={() => {}} htmlType="submit">
                    Continue
                    {props?.icon === true && (
                      <Image alt="" width={10} height={10}
                        src="../../../static/images/icons/arrow-next.svg"
                        className={styles["icon-style"]}
                      />
                    )}
                  </Button>
                </Form.Item>
              </div>
            )}
            {!get(session, "user") && (
              <div className={styles[`button-primary ${props?.theme}`]}>
                <Button type="primary" onClick={() => signIn("Credentials")}>
                  Log in and continue
                  {props?.icon === true && (
                    <Image alt="" width={10} height={10}
                      src="../../../static/images/icons/arrow-next.svg"
                      className={styles["icon-style"]}
                    />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Form>
    </Spin>
  );
}
