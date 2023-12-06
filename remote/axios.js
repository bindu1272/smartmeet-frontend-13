import axios from 'axios';
import { notification } from 'antd';
import { get } from 'lodash';
import getConfig from 'next/config';
import { signOut } from 'next-auth/react';
// const { publicRuntimeConfig } = getConfig();

const configureAxios = () =>
  axios.create({
    baseURL: "https://6rnx921uec.execute-api.ap-south-1.amazonaws.com/dev/api/v1",
    // "http://localhost:9700/api/v1",
    // publicRuntimeConfig.backendUrl,
    timeout: 10000,
  });

export const axiosInstance = configureAxios();

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (!err.response) {
      notification['error']({
        message: 'Something Went Wrong',
        description: 'Please Check Your Internet Connection',
      });
    } else {
      console.log("hello",err);
      // notification['error']({
      //   message: get(err, 'response.data.message', 'Something Went Wrong'),
      // });
    }
    return Promise.reject(err);
  }
);
