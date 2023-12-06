// import BookAppointement from "@/components/homepage/bookAppointement";
import HowWorks from "@/components/homepage/howWorks";
import OurPartnerships from "@/components/homepage/ourPartnerships";
import SmartMeet from "@/components/homepage/smartMeet";
import PatientsTrust from "@/components/homepage/patientsTrust";
import HealthTips from "@/components/homepage/healthTips";
import FaqStatic from "@/components/faqStatic/FaqStatic";
import AppBottom from "@/components/appBottom";
import FavoritesSection from "../favoritesSection/page";
// styles
import homePageStyles from "../home/styles.module.scss";
import BookAppointementMainPage from "@/components/homepage/bookAppointementMainPage";

export default function Home() {
  return (
    <div className={homePageStyles["homepage-main"]}>
      {/* <BookAppointement /> */}
      <BookAppointementMainPage/>

      <FavoritesSection />

      <HowWorks />

      <OurPartnerships />

      <SmartMeet />

      <PatientsTrust />

      <HealthTips />

      <FaqStatic />

      <AppBottom />
    </div>
  );
}
