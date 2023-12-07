"use client"
import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import FooterHospital from '../footerHospital';
import MenuHospital from '../navigations/menuHospital';
import get from 'lodash/get';

const { Content, Header } = Layout;

// Styles
import styles from './styles.module.scss';

export default function LayoutHospitalContainer(props) {
  const { details } = props;

  const [headerFix, setHeaderFix] = useState('header');

  const listenScrollEvent = (event) => {
    if (window.scrollY < 93) {
      return setHeaderFix('headerFix');
    } else if (window.scrollY > 70) {
      return setHeaderFix('headerFix2');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  return (
    <Layout className={styles["layout-hospital-container"]+" "+ props.layoutStyle}>
      <Header className={styles["header"]+" "+styles["lg-padding"]+" "+headerFix}>
        <MenuHospital searchShow={props.searchShow} details={details} />
      </Header>
      <Content>{props.children}</Content>
      <FooterHospital
        style={{ backgroundColor: '#0F2D3E' }}
        logoUrl={get(details, 'logo_url')}
      />
    </Layout>
  );
}
