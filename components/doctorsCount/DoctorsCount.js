import { Col, Row } from 'antd';
import React, { useState } from 'react';
import filter from 'lodash/filter';
import map from 'lodash/map';
import get from 'lodash/get';
import DoctorsListStyles from '../doctorsList/styles.module.scss';

function DoctorsCount({ doctors, specialisations }) {
  var doctorsCount = [{ text: 'All', value: doctors.length }];

  for (var i in specialisations) {
    const specCount = filter(doctors, function (doctor) {
      return get(doctor, 'doctor.specialisations').some(function (o) {
        return o['name'] === specialisations[i].name;
      });
    });
    doctorsCount.push({
      text: specialisations[i].name,
      value: specCount.length,
    });
  }

  return (
    <Row>
      <Col xs={24} xl={16}>
        <div className={DoctorsListStyles["tags"]}>
          {doctorsCount.map((data) => (
            <>
              {get(data, 'value') !== 0 && (
                <div className={DoctorsListStyles["tag-item"]}>
                  {get(data, 'text')} <span>{get(data, 'value')}</span>
                </div>
              )}
            </>
          ))}
        </div>
      </Col>
    </Row>
  );
}

export default DoctorsCount;
