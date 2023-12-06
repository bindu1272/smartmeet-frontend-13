import { axiosInstance } from '@/remote/axios';
import get from 'lodash/get';

export const getDoctors=async(doctorId)=>{
    return await axiosInstance.get(`doctors/${doctorId}`);
}


export const getHospitals =async(slug)=>{
    return await axiosInstance.get(`hospitals/${slug}`)
}

export const getDoctorAvailability = async(hospital,doctorId)=>{
   return  await axiosInstance.get(`hospitals/${get(hospital, 'id')}/doctors/${doctorId}/working-hours`)
}