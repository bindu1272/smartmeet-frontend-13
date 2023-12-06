"use client";
import { useState } from "react";
import {  Form, Input, Button, notification } from "antd";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import { axiosInstance } from "@/remote/axios";
import Image from "next/image";
import React from "react";

export default function RecoverPassword(props: any) {
  const url =  new URL(window.location.href);
  const [loading, setLoading] = useState(false);
  console.log("searchParams", url.searchParams.get("userid"));
  const [value, setValue] = useState(1);
  const router = useRouter();

  const onChange = (e: any) => {
    setValue(e);
  };
  const recoverPassword = () => {
    router.push("/recoverpassword");
  };
  const onFinish = async (values: any) => {
    let data = { ...values, uuid: url.searchParams.get("userid") };
    setLoading(true);
    await axiosInstance
      .post("/change-patient-password", data)
      .then((result) => {
        console.log("RESULT >>>>", result);
        notification.success({
          message: "Password has been reset successfully.",
        });
        router.push("/login");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div
      className={styles["forgot-password-section"]}
      style={{ marginLeft: "20px", marginTop: "20px" }}
    >
      <div className={styles["form-section"]}>
        <div className={styles["logo"]}>
          <Image src="../../static/images/logo/logo.svg" alt="" width={10}
          height={10}/>
        </div>
        <div className={styles["head-section"]}>
          <h3 className={styles["title3"]}>Reset Password?</h3>
          <div className={styles["text-info"]}>
            {" "}
            Don’t worry, it happens to the best of us.
          </div>
        </div>
        <div className={styles["form"]}>
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            // validateMessages={validateMessages}
          >
            <Form.Item
              label="Create Password"
              name="password"
              rules={[
                {
                  required: true,
                },
                {
                  min: 6,
                  message: "Password must be atleast 6 characters",
                },
              ]}
            >
              <Input.Password className="custom-input" />
            </Form.Item>
            <Form.Item
              label=" Confirm Password"
              name="confirm_password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password className="custom-input" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="full-button">
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
