import { Carousel } from 'antd';
import ButtonPrimary from '../../buttons/buttonPrimary';
import get from 'lodash/get';
// Styles
import styles from './styles.module.scss';
import Image from "next/image";
import { useRouter } from 'next/navigation';

function onChange(a, b, c) {
  console.log(a, b, c);
}

export default function MeetDoctors(props) {
  const { details, doctors } = props;

  const router = useRouter();

  const goToHospital = () => {
    router.push('/hospital/' + get(details, 'id'));
  };

  const sliderData = [
    {
      imgUrl: '../../static/images/doctors/doctor1.png',
      title: 'General Practitioner',
      experience: '15 Years of Experience',
    },
    {
      imgUrl: '../../static/images/doctors/doctor2.png',
      title: 'General Practitioner',
      experience: '10 Years of Experience',
    },
    {
      imgUrl: '../../static/images/doctors/doctor3.png',
      title: 'General Practitioner',
      experience: '22 Years of Experience',
    },
    {
      imgUrl: '../../static/images/doctors/doctor4.png',
      title: 'General Practitioner',
      experience: '15 Years of Experience',
    },
    {
      imgUrl: '../../static/images/doctors/doctor5.png',
      title: 'General Practitioner',
      experience: '10 Years of Experience',
    },
    {
      imgUrl: '../../static/images/doctors/doctor6.png',
      title: 'General Practitioner',
      experience: '22 Years of Experience',
    },
  ];

  const meetSettings = {
    className: 'centerStyle',
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    speed: 500,
    dots: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles["meet-doctors-style"]}>
      <div className={styles["title2"]}>Meet Our Top Doctors</div>
      <div className={styles["description"]}>
        You will be handled by a team of doctors who have more than 10 years of
        experience
      </div>

      <div className={styles["slider-section"]}>
        <Carousel afterChange={onChange} {...meetSettings} arrows>
          {doctors.map((doctor, index) => (
            <div className={styles["slider-item"]} key={index}>
              <div className={styles["doctro-image"]}>
                <Image src={get(doctor, 'image')} alt="" width={10}
          height={10}/>
              </div>
              <div className={styles["title2"]}>
                {get(doctor, 'specialisations[0].name')}
              </div>
              <div className={styles["title3"]}>
                {get(doctor, 'title')} {get(doctor, 'name')}
              </div>
              <div className={styles["description"]}>
                {get(doctor, 'doctor_detail.experience')} years of experience
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <div className={styles["button-section"]}>
        <ButtonPrimary
          style={{ backgroundColor: get(details, 'brand_color.primary') }}
          title="See all our doctors"
          onClick={goToHospital}
        />
        <ButtonPrimary
          style={{ backgroundColor: get(details, 'brand_color.secondary') }}
          title="Book an appointment"
          onClick={goToHospital}
        />
      </div>
    </div>
  );
}
