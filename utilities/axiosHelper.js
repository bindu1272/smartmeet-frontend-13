import get from 'lodash/get';
import { axiosInstance } from '../remote/axios';

export const authorizeGetRequest = async (axiosInstance, user, url) => {
  axiosInstance.defaults.headers.common.authorization = `Bearer ${get(
    user,
    'token',
  )}`;
  let result = await axiosInstance.get(url);
  return result;
};

export const authorizePostRequest = async (
  axiosInstance,
  user,
  url,
  payload,
) => {
  axiosInstance.defaults.headers.common.authorization = `Bearer ${get(
    user,
    'token',
  )}`;
  let result = await axiosInstance.post(url, payload);
  return result;
};

export const authorizePutRequest = async (
  axiosInstance,
  user,
  url,
  payload,
) => {
  axiosInstance.defaults.headers.common.authorization = `Bearer ${get(
    user,
    'token',
  )}`;
  let result = await axiosInstance.put(url, payload);
  return result;
};
