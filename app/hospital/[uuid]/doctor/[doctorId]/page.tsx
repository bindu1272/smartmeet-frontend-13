import { Tabs} from "antd";
import get from "lodash/get";
import { getAvailabilityTime } from "@/utilities/helpers";
import {
  getDoctors,
  getHospitals,
  getDoctorAvailability,
} from "@/utilities/ApiHelper";
import DoctorPage from "@/components/doctorDetailsInfo/doctorsPage/index";

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

export default async function DoctorInfo(props: any) {
  let doctorId = props?.params?.doctorId;
  let uuid = props?.params?.uuid;
  let hospital = null;
  let doctorAvailability:any = null;
  let doctor: any = {};
  const res = await getDoctors(doctorId);

  const resHospital = await getHospitals(uuid);

  doctor = get(res, "data.data");
  hospital = get(resHospital, "data.data");
  doctorAvailability = await getDoctorAvailability(hospital, doctorId);
  doctorAvailability = getAvailabilityTime(doctorAvailability?.data?.data);

  console.log("DOCTOR>>>", doctor);

  return (
    <>
      <DoctorPage
        doctor={doctor}
        hospital={hospital}
        doctorAvailability={doctorAvailability}
      />
    </>
  );
}
