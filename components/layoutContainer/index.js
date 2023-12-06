import { Layout } from "antd";
import React from "react";
import FooterCustom from "../footer";
import MenuPrimary from "../navigations/menuPrimary";
import MenuUser from "../navigations/menuUser";
// Styles
import styles from "./styles.module.scss";
import { get } from "lodash";

import { getServerSession } from "next-auth/next";
import authOptions from "../../lib/authOptions"

const LayoutContainer = async (props) => {
  const session = await getServerSession(authOptions);
  console.log("session**", session);
  return (
    <>
      <Layout
        className={styles["layout-container"] + " " + `${props?.layoutStyle}`}
      >
        <div className={styles["header"] + " " + "header lg-padding"}>
          {!session ? (
            <MenuPrimary
              // onLogin={() => signIn('Credentials')}
              // onLogin={signIn}
              searchShow={props?.searchShow}
              onSearch={props?.onSearch}
              hideBookAppointment={props?.hideBookAppointment}
            />
          ) : (
            <MenuUser
              user={get(session, "user")}
              searchShow={props?.searchShow}
              onSearch={props?.onSearch}
            />
          )}
        </div>
        <div>{props?.children}</div>
        <FooterCustom />
      </Layout>
    </>
  );
};

export default LayoutContainer;
