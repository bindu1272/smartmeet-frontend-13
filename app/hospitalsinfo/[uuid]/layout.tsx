import Hospital from "@/app/hospital/[uuid]/page";
import LayoutContainer from "@/components/layoutContainer";
import { axiosInstance } from "@/remote/axios";
import get from "lodash/get";



export default function layout({ children }: { children: React.ReactNode },{props}:any) {
    let hospital = null;
    const { uuid } = props?.params
    const getHospital=async()=>{
    const resHospital = await axiosInstance.get(`hospitals/${uuid}`);
    hospital = get(resHospital, "data.data");

    }
  return (
    <>
      <LayoutContainer details={Hospital}>{children}</LayoutContainer>
    </>
  );
}
