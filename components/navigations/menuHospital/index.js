import { useState } from 'react';
import { Menu, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import ButtonPrimary from '../../buttons/buttonPrimary';
import Link from 'next/link';
import get from 'lodash/get';
import Image from "next/image";

// Styles
import styles from './styles.module.scss';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = (value) => console.log(value);

export default function MenuHospital(props) {
  const { details } = props;

  const [isOpened, setIsOpened] = useState(false);

  function toggle() {
    setIsOpened((isOpened) => !isOpened);
  }

  return (
    <div
      className={styles[`menu-hospital-style ${
        isOpened === true ? 'menu-active' : ''
      }`]}
    >
      <div className={styles["logo-hospital"]}>
        <Image src={get(details, 'logo_url')} className={styles["logo"]} alt="" width={10}
          height={10}/>
      </div>

      <button className={styles["navbar-toggler"]} type="button" onClick={toggle}>
        <div
          className={styles[`hamburguer ${
            isOpened === true ? 'close-hamburguer' : ''
          }`]}
        >
          <div className={styles["lines line-top"]}></div>
          <div className={styles["lines line-mid"]}></div>
          <div className={styles["lines line-bottom"]}></div>
        </div>
      </button>

      <div className={styles["flex-style"]}>
        {props.searchShow && (
          <div className={styles["search-sec"]}>
            <Search
              placeholder="Doctor, specialty, hospital or treatment"
              onSearch={onSearch}
            />
          </div>
        )}
        <Menu theme="light" mode="horizontal">
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Specialities</Link>
          <Link href="/">Doctors </Link>
          <Link href="/">Blog </Link>
        </Menu>
        <ButtonPrimary
          style={{ backgroundColor: get(details, 'brand_color.primary') }}
          title="Contact"
        />
      </div>
    </div>
  );
}
