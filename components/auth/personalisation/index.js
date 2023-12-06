"use client";
import ButtonPrimary from '../../buttons/buttonPrimary';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { useState,useEffect } from "react";
import { axiosInstance } from '../../../remote/axios';

import { Row, Col } from 'antd';

import styles from './styles.module.scss';
// import UploadLogo from '../../uploadLogo';
import ColorPicker from '../../colorPicker';
import { get } from 'lodash';
import FormItem from 'antd/lib/form/FormItem';
import hospitalStyles from "./hospitalstyles.module.scss";
import SingleImageUpload from "../../mediaUpload/SingleImageUpload";


Personalisation.propTypes = {
  active: PropTypes.bool,
  clickHandler: PropTypes.func,
  errors: PropTypes.any,
  onChange : PropTypes.any,
  onClickBack : PropTypes.any,
  data : PropTypes.any
};

export default function Personalisation(props) {
  const [slugsData,setSlugsData] = useState();
  const [errormessage,setErrorMessage] = useState(false);
  useEffect(() => {
    axiosInstance
      .get('/all/slugs')
      .then((res) => setSlugsData(res?.data?.data));
  }, []);
  const [imageUser, setImageUser] = useState();
  const onChangeFormData = (value, key) => {
    if(key === "slug"){
      if(slugsData?.includes(value)){
        setErrorMessage(true);
      }else{
        if(errormessage){
        setErrorMessage(false)
        }
      }
    }
    props.onChange({ ...props.data, [key]: value,logo:imageUser?.key });
    // if(key === "logo"){
    //   props.onChange({ ...props.data,logo_url: `https://res.cloudinary.com/dd2sdadrl/image/upload/v1669621246/${value}`,logo:value});
    // }
  };

  const onChangeBrandColor = (value, key) => {
    let brand_color = props.data.brand_color;
    brand_color[key] = value;
    onChangeFormData(brand_color, 'brand_color');
  };
  const onUploadLogoDone = (imageResponse) => {
    setImageUser(imageResponse);
  };

  return (
    <div className={props.active ? styles["register-section"]: styles["register-section"]+ " " +'d-none'}>
      <div className={hospitalStyles["form-section"]}>
        <Row align="bottom" justify="space-between" className={hospitalStyles["logo"]}>
          <Col>
            <div>
              {/* <img src="../../static/images/logo/logo.svg" /> */}
            </div>
          </Col>
          <Col className={hospitalStyles["back-link"]} onClick={props.onClickBack}>
            Go back
          </Col>
        </Row>
        <h3 className="title3">Personalisation</h3>
        <div className={hospitalStyles["info"]}>
          We will use this to create your personalized hospital page
        </div>
        <div className={styles['personalisation-section'] + " " + "form"}>
          <div className={styles["avatar-upload"]}>
            <div className={styles["label"]}>Upload logo</div>
            
            {/* <UploadLogo onChange={(value) => onChangeFormData(value, 'logo')} /> */}
            <SingleImageUpload
                    onUploadDone={onUploadLogoDone}
                    imageUrl={get(imageUser, "url")}
                    className={styles["icon-style mr--10"]}
                    setImageUser={setImageUser}
                  />
            <div className={styles["instructions"]}>
              *Please upload image in .jpg, .png format only
            </div>
          </div>

          <div className={styles["brand-colors"]}>
            <div className={styles["label"]}>Choose brand colors</div>
            <Row>
              <Col span={12} align="middle">
                <ColorPicker
                  value={get(props, 'data.brand_color.primary')}
                  onChange={(value) => onChangeBrandColor(value, 'primary')}
                />
              </Col>
              <Col span={12} align="middle">
                <ColorPicker
                  value={get(props, 'data.brand_color.secondary')}
                  onChange={(value) => onChangeBrandColor(value, 'secondary')}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} className={styles["info"]} align="middle">
                Primary Color
              </Col>
              <Col span={12} className={styles["info"]} align="middle">
                Secondary Color
              </Col>
            </Row>
          </div>

          <div className={styles["input-multiple"]}>
            <div className={styles["label"]}>
              Your custom Url<span className={styles["text-error"]}>*</span>
            </div>
            <Row>
              <Col>
                <FormItem
                  validateStatus={
                    !get(props, 'errors.slug') ? 'validating' : 'error'
                  }
                  help={get(props, 'errors.slug')}
                >
                  <Input
                    prefix="https://smartmeet.com/"
                    placeholder="myhospital"
                    className={styles["hospital-url"]}
                    value={props?.data?.slug}
                    onChange={(event) =>
                      onChangeFormData(event.target.value, 'slug')
                    }
                  />
                  {
                    errormessage ?
                    <div style={{color:"red"}}>Slug already been taken</div>
                    :
                    null
                  }
                </FormItem>
              </Col>
            </Row>
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
