"use client";
import { useState } from "react";
import InputCustom from "../../inputCustom";
import ButtonPrimary from "../../buttons/buttonPrimary";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import { axiosInstance } from "@/remote/axios";
import Image from "next/image";

export default function ForgotPassword(props: any) {
  const [value, setValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChange = (e: any) => {
    setValue(e);
  };
  const recoverPassword = async () => {
    const data = {
      email: value,
    };
    setLoading(true);
    await axiosInstance
      .post("/patient-forgot-password", data)
      .then((result: any) => {
        setLoading(false);
        console.log("result", result?.data?.data?.uuid);
        router.push(`/recoverpassword?userid=${result?.data?.data?.uuid}`);
        // notification.success({
        //   message: ('Reset '),
        // });
      })
      .catch((error: any) => {
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
          <h3 className={styles["title3"]}>Forgot Password?</h3>
          <div className={styles["text-info"]}>
            {" "}
            Don’t worry, it happens to the best of us.
          </div>
        </div>
        <div className={styles["form"]}>
          <InputCustom
            placeholder="Enter Email"
            label="Email"
            required
            onChange={onChange}
          />

          <div className={styles["mt--30"]}>
            <ButtonPrimary
              title="Recover Password"
              style={{ backgroundColor: "#34C981" }}
              onClick={recoverPassword}
            />
          </div>

          <div className={styles["mt--30"]}>
            <ButtonPrimary title="Login" onClick={props?.clickHandler} />
          </div>

          <div className={styles["link-section"]}>
            Don’t have an account?{" "}
            <div className={styles["link"]} onClick={props?.signupHandler}>
              Signup
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
