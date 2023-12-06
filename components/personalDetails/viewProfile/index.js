"use client";
import { useState } from 'react';
import { Col, Row, Divider } from 'antd';
import ButtonPrimary from '../../../components/buttons/buttonPrimary';

// styles
import styles from './styles.module.scss';
import { get } from 'lodash';
import { getAddress } from '../../../utilities/helpers';
import LoadingPage from '@/components/layoutContainer/loading';
import Image from "next/image";

export default function ViewProfile({ data, onClick }) {
  var done = 0,
    cancelled = 0,
    no_show = 0;

  for (var i = 0; i < get(data, 'stats')?.length; ++i) {
    if (get(data, 'stats')[i].status.value === 3) {
      done = get(data, 'stats')[i].count;
    }
    if (get(data, 'stats')[i].status.value === 2) {
      no_show = get(data, 'stats')[i].count;
    }
    if (get(data, 'stats')[i].status.value === 4) {
      cancelled = get(data, 'stats')[i].count;
    }
  }
  return (
    <div className={styles["view-profile-style"]}>
    <div className={styles["form-section"]}>
      <Row gutter={28}>
        <Col span={14}>
          <div className={styles["card"] + " " + "mb--50"}>
            <Row className={styles["card-title"]} justify="space-between">
              <Col>My details</Col>
              <Col>
                <ButtonPrimary title="Edit" theme="green" onClick={onClick} />
              </Col>
            </Row>
            <div className={styles["card-body"]}>
              <div className={styles["form"]}>
                <div className={styles["sec"]}>
                  <h4 className={styles["title"]}>USER INFORMATION</h4>
                  <Row gutter={16}>
                    <Col span={12} className={styles["item-col"]}>
                      <div className={styles["heading"]}>Name</div>
                      <div className={styles["info-text"]}>
                        {get(data, 'user.title')} {get(data, 'user.name')}
                      </div>
                    </Col>

                    <Col span={12} className={styles["item-col"]}>
                      <div className={styles["heading"]}>Email Address</div>
                      <div className={styles["info-text"]}>
                        {get(data, 'user.email')}
                      </div>
                    </Col>
                    <Col span={12} className={styles["item-col"]}>
                      <div className={styles["heading"]}>Gender</div>
                      <div className={styles["info-text"]}>
                        {get(data, 'user.gender') === 'M'
                          ? 'Male'
                          : get(data, 'user.gender') === 'F'
                          ? 'Female'
                          : null}
                      </div>
                    </Col>
                    <Col span={12} className={styles["item-col"]}>
                      <div className={styles["heading"]}>Insurance Details</div>
                      <div className={styles["info-text"]}>
                        {data?.user && get(data, 'user.insurance_details.number')}
                      </div>
                    </Col>
                  </Row>
                </div>

                <Divider />

                <div className={styles["sec"]}>
                  <h4 className={styles["title"]}>CONTACT INFORMATION </h4>
                  <Row gutter={16}>
                    <Col span={12} className={styles["item-col"]}>
                      <div className={styles["heading"]}>Contact Number</div>
                      <div className={styles["info-text"]}>
                        +{get(data, 'user.contact_code')}{' '}
                        {get(data, 'user.contact_number')}
                      </div>
                    </Col>
                    <Col span={12} className={styles["item-col"]}>
                      <div className={styles["heading"]}>Address</div>
                      <div className={styles["info-text"]}>
                        {data?.user && getAddress(get(data, 'user.address_details'))}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={10}>
          <div className={styles["profile-image-card"]}>
            <div className={styles["image-card"]}>
              <Image alt=""
              width={10}
              height={10}
                src={get(data, 'user.image')}
                className={styles["icon-style mr--10"]}
              />
            </div>

            <div className={styles["content-sec"]}>
              <div className={styles["appointments mb--10"]}> Appointments</div>

              <div className={styles["number-section"]}>
                <div className={styles["item"]}>
                  {done}
                  <span>Done</span>
                </div>

                <div className={styles["item"]}>
                  {cancelled}
                  <span>Cancelled</span>
                </div>

                <div className={styles["item"]}>
                  {no_show}
                  <span>No show</span>
                </div>
              </div>
            </div>
            <div className={styles["name-sec"]}>
              {get(data, 'user.name')}, <span>{get(data, 'user.age')}</span>
              <div className={styles["address"]}>
                {get(data, 'user.address_details.suburb')},{' '}
                {get(data, 'user.address_details.state')},{' '}
                {get(data, 'user.address_details.country')}
              </div>
            </div>
            <Divider />
            <div className={styles["personal-details"]}>
            <div className={styles["item"]}>
              <div className={styles["text-sec"]}>DOB :</div>
              <div className={styles["info"]}>{get(data, 'user.dob')}</div>
            </div>
              <div className={styles["item"]}>
                <div className={styles["text-sec"]}>Age :</div>
                <div className={styles["info"]}>{get(data, 'user.age')} Years</div>
              </div>
              <div className={styles["item"]}>
                <div className={styles["text-sec"]}>Blood group :</div>
                <div className={styles["info"]}>{get(data, 'user.blood_group')}</div>
              </div>
              <div className={styles["item"]}>
                <div className={styles["text-sec"]}>Height (m) :</div>
                <div className={styles["info"]}>{get(data, 'user.height')}</div>
              </div>
              <div className={styles["item"]}>
                <div className={styles["text-sec"]}>Weight (Kg) :</div>
                <div className={styles["info"]}>{get(data, 'user.weight')}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
  );
}
