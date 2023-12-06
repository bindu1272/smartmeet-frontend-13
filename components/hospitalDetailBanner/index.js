import { Row, Col, Carousel, Tag } from 'antd';
import RatingBox from '../ratingBox';
import map from 'lodash/map';
import get from 'lodash/get';
import Image from "next/image";

// Styles
import styles from './styles.module.scss';

export default function HospitalDetailBanner(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles["hospital-detail-banner"]}>
      <Row>
        <Col xs={24} xl={12}>
          <div className={styles["content"]}>
            <div className={styles["title2"]}>
              {props.title}
              <div className={styles["tag"]}>
                <Image src="../../static/images/icons/favourite.svg" alt="" width={18}
          height={25}/>
              </div>
            </div>
            <div className={styles["rating-sec"]}>
              <RatingBox
                ratingValue={props.ratingValue}
                onChange={props.onChange}
                ratingText={true}
                edit={false}
              />
            </div>
            <div className={styles["address-text"]}>{props.address}</div>
            <div className={styles["timing-text"]}>
              <span>Timing:</span>
              {props.timing}
            </div>

            <div className={styles["phone-text"] + " " + styles["text-info"]}>
              <Image src="../../static/images/icons/phone.svg" alt="" width={10}
          height={10}/>
              <span>Phone:</span> {props.phone}
            </div>
            <div className={styles["mobile-text"] + " " + styles["text-info"]}>
              <Image src="../../static/images/icons/mobile.svg" alt="" width={10}
          height={10}/>
              <span>Mobile:</span> {props.mobile}
            </div>
            <div className={styles["email-text"] + " " + styles["text-info"]}>
              <Image src="../../static/images/icons/email.svg" alt="" width={10}
          height={10}/>
              <span>Email:</span> {props.email}
            </div>

            <div className={styles["treatment"]}>{props.treatment}</div>
            <div className={styles["available-resources"]}>
              {props?.specialisations &&  map(get(props, 'specialisations', []), (spec,index) => (
                <Tag color="magenta" key={index}>{get(spec, 'name')}</Tag>
              ))}
              {/* {props.availableResourceslist.map((list) => (
                <div className={styles["ar-item">
                  {' '}
                  <img src="../../static/images/icons/check.svg" /> {list}
                </div>
              ))} */}
            </div>
          </div>
        </Col>
        <Col xs={24} xl={12}>
          <div className={styles["banner-section"]}>
            <Carousel {...settings} arrows>
              { props?.sliderOpations && props?.sliderOpations?.map((option,index) => (
                <div className={styles["slider-item"]} key={index}>
                  { option ?
                  <Image src={option} alt="" 
                  layout='fill'
                  />
                  : null
              }
                </div>
              ))}
            </Carousel>
          </div>
        </Col>
      </Row>
    </div>
  );
}
