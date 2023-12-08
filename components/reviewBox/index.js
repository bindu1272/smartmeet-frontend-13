"use client";
import { Input, Card, Row, Col, Spin, Empty } from 'antd';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../remote/axios';
import RatingBox from '../ratingBox';
import map from 'lodash/map';
import { authorizeGetRequest } from '../../utilities/axiosHelper';
// Styles
import styles from './styles.module.scss';
import get from 'lodash/get';
import { useSession } from 'next-auth/react';
import Image from "next/image";

const { TextArea } = Input;

export default function ReviewBox(props) {
  const { id, type } = props;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const session = data;

  useEffect(() => {
    setLoading(true);
    const getReviews = async () => {
      let result = await authorizeGetRequest(
        axiosInstance,
        get(session, 'user'),
        `${type}/${id}/reviews`
      );
      setReviews(get(result, 'data.data.data'));
      setLoading(false);
    }
    getReviews()
  }, []);

  return (
    <Spin spinning={loading}>
      <div className={styles["reviewbox-style"]}>
        {reviews.length > 0 ? (
          <>
            {' '}
            {map(reviews, (data, index) => (
              <Card className={styles["card-review"]} key={index}>
                <Row>
                  <Col xs={24} xl={16}>
                    <div className={styles["head-sec"]}>
                      <div className={styles["img-circle"]}>
                        <Image src={get(data, 'user.image.url')} alt="" width={10}
                          height={10} />
                      </div>

                      <div className={styles["text-sec"]}>
                        <div className={styles["title4"]}>{`${get(
                          data,
                          'user.title'
                        )} ${get(data, 'user.name')}`}</div>
                        <div className={styles["sub-text"]}>
                          {get(data, 'updated_at_formatted')}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} xl={8}>
                    <RatingBox
                      ratingValue={get(data, 'rating', 0)}
                      edit={false}
                    // onChange={props.onChange}
                    />
                  </Col>
                </Row>
                <div className={styles["description"]}>{get(data, 'comment')}</div>
              </Card>
            ))}
          </>
        ) : (
          <Empty description="No reviews found" />
        )}
      </div>
    </Spin>
  );
}
