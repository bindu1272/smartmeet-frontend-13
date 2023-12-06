"use client";
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Form,
  Button,
  Input,
  Row,
  Col,
  Typography,
  Divider,
  Modal,
  notification,
} from "antd";
import styles from "./styles.module.scss";
import Link from "next/link";
import {LOGIN_TYPES} from "@/constants/logintypes";
import Image from "next/image";

export default function SignIn() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const onSubmit = async (values: any) => {
    console.log("callbackUrl", callbackUrl);
    try {
      const res = await signIn(LOGIN_TYPES?.CREDENTIALS, {
        redirect: false,
        email: values?.email,
        password: values?.password,
        callbackUrl: "http://localhost:3002",
      });
      console.log(res);
      if (!res?.error) {
        router.refresh();
        router.push(callbackUrl);
      } else {
        notification.error({ message: res?.error });
        console.log("invalid email or password");
      }
    } catch (errr) {
      console.log("error", errr);
    }
  };
  // useEffect(() => {
  //   if (router?.query?.error != undefined || router?.query?.error != null) {
  //     notification.error({ title: 'Error', message: 'Invalid Credentials' });
  //     router.replace(router.pathname);
  //   }
  // }, [router])
  useEffect(() => {
    if (
      searchParams.get("error") != undefined ||
      searchParams.get("error") != null
    ) {
      notification.error({ message: "Invalid Credentials" });
      router.replace(pathname + "?callbackUrl=" + callbackUrl);
    }
  }, [router, pathname, searchParams, callbackUrl]);

  return (
    <>
      <section className={styles["signin-container"]}>
        <Row>
          <Col
            className={styles["form-col"]}
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            md={{ span: 14, order: 1 }}
          >
            <div className={styles["singup-section"]}>
              <div className={styles["form-section"]}>
                <div className={styles["logo"]}>
                  <Image src="../../static/images/logo/logo.svg" alt="" width={160} height={40}/>
                </div>
                <Row justify="space-between">
                  <Col>
                    <div className={styles["head-section"]}>
                      <h3 className={styles["title3"]}>Login</h3>
                      <div className={styles["text-info"]}>
                        Welcome Back! Please login to your account
                      </div>
                    </div>
                  </Col>
                  <Col className={styles["back-link"]}>
                    <Link href="/">Back to Homepage</Link>
                  </Col>
                </Row>

                <div className={styles["form"]}>
                  <Col>
                    <Form
                      onFinish={(values) => onSubmit(values)}
                      layout="vertical"
                    >
                      <Form.Item
                        name={"email"}
                        label="Email"
                        rules={[
                          { type: "email", message: "Email is not valid" },
                          { required: true, message: "Email is required" },
                        ]}
                        // initialValue={email}
                      >
                        <Input
                          placeholder={"email@gmail.com"}
                          name="email"
                          // onChange={(e) => onInputChange(e)}
                          // value={email}
                        />
                      </Form.Item>
                      <Form.Item
                        name={"password"}
                        label="Password"
                        rules={[
                          { required: true, message: "Password is required" },
                        ]}
                        // initialValue={password}
                      >
                        <Input
                          placeholder={"password"}
                          name="password"
                          type={"password"}
                          // onChange={(e) => onInputChange(e)}
                          // value={password}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Link href="/forgotpassword"> Forgot password? </Link>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          htmlType="submit"
                          className={styles["btn-submit"]}
                          type="primary"
                          // loading={submitting}
                        >
                          Log in
                        </Button>
                      </Form.Item>
                      <Divider plain>OR</Divider>
                      <div className={styles["button-login-section"]}>
                        <Button
                          className={
                            styles["social-btn"] + " " + styles["btn-google"]
                          }
                          onClick={() =>
                            signIn(LOGIN_TYPES?.GOOGLE, {
                              callbackUrl,
                            })
                          }
                        >
                          <div className={styles["btn-item"]}>
                            <Image
                              src="../../static/images/login-logos/google-logo.svg"
                              className={styles["social-icon"]}
                              alt="google"
                              width={24} height={24}
                            />
                            {/* <GoogleOutlined className={styles["social-icon"/> */}
                            Sign in with google
                          </div>
                        </Button>
                        <Button
                          className={
                            styles["social-btn"] + " " + styles["btn-facebook"]
                          }
                          onClick={() => {}}
                        >
                          <div
                            className={styles["btn-item"]}
                            onClick={() =>
                              signIn(LOGIN_TYPES?.FACEBOOK, {
                                callbackUrl,
                              })
                            }
                          >
                            <Image
                              src="../../static/images/login-logos/facebook-logo.svg"
                              className={styles["social-icon"]}
                              alt=""
                              width={24} height={24}
                            />
                            {/* <FacebookOutlined className={styles["social-icon"/> */}
                            Sign in with facebook
                          </div>
                        </Button>
                      </div>
                      <Divider />
                      <Row>
                        <Col span={24}>
                          <Typography.Text>
                            Don't have an account yet?{" "}
                            <Link href="/patientRegistration">
                              Sign up for patient
                            </Link>
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </div>
                {/* <div style={{ background: "blue", maxWidth: "800px" }}></div> */}
              </div>
            </div>
          </Col>

          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 10, order: 2 }}
          >
            <div className={styles["color-section"]}>
              <div className={styles["img-box"]}>
                <div className={styles["img-style"]}>
                  <Image src="../../static/images/login/image1.svg" alt="" width={0} height={0}/>
                </div>
                <div className={styles["title2"]}>At Your Quick Service</div>
                <div className={styles["description"]}>
                  An address for health and care
                </div>
              </div>

              <div className={styles["circle1"]} />
              <div className={styles["circle2"]} />
              <div className={styles["circle3"]} />
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
}
