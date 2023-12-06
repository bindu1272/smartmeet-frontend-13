import { Row, Col } from 'antd';
import ButtonPrimary from '../../buttons/buttonPrimary';
import get from 'lodash/get';
import Image from "next/image";

// Styles
import styles from './styles.module.scss';

export default function LatestNews(props) {
  const { details } = props;

  const cardDataList = [
    {
      imgUrl:
        'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG9zcGl0YWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '28th May 2021',
      cardTitle: '100 beds arraged by Max hospital',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG9zcGl0YWwlMjBiZWR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '28th May 2021',
      cardTitle: '100 beds arraged by Max hospital',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1551076805-e1869033e561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhvc3BpdGFsJTIwYmVkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '28th May 2021',
      cardTitle: '100 beds arraged by Max hospital',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1580281657702-257584239a55?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGhvc3BpdGFsJTIwYmVkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '28th May 2021',
      cardTitle: '100 beds arraged by Max hospital',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1563932127565-699eeea1e17a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fGhvc3BpdGFsJTIwYmVkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '28th May 2021',
      cardTitle: '100 beds arraged by Max hospital',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1619975101918-6d27886e8c6a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aG9zcGl0YWwlMjBiZWR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '28th May 2021',
      cardTitle: '100 beds arraged by Max hospital',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1611587266391-2e1605329537?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGhvc3BpdGFsJTIwYmVkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '28th May 2021',
      cardTitle: '100 beds arraged by Max hospital',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1550792436-181701c71f63?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGhvc3BpdGFsJTIwYmVkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '28th May 2021',
      cardTitle: '100 beds arraged by Max hospital',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
  ];

  return (
    <div className={styles["latest-news-style"]}>
      <div className={styles["header-section"]}>
        <div className={styles["title2"]}>Latest News</div>
      </div>

      <div className={styles["image-card-section"]}>
        <Row gutter={50}>
          {cardDataList.map((data, index) => (
            <Col xs={24} xl={6} key={index}>
              <div className={styles["card-body"+ " "+data.cardStyle]}>
                <div className={styles["img-card"]}>
                  <Image alt=""
                    src={data.imgUrl}
                    className={styles["icon-image"+" "+ data.style]}
                    width={10}
          height={10}
                  />
                </div>
                <div className={styles["date"]}>{data.date}</div>
                <div className={styles["card-title"]}>{data.cardTitle}</div>
                <div className={styles["description"]}>{data.description}</div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className={styles["button-section"]}>
        <ButtonPrimary
          style={{ backgroundColor: get(details, 'brand_color.primary') }}
          title="Read more"
        />
      </div>
    </div>
  );
}
