import LayoutContainer from "@/components/layoutContainer";
import HowWorks from "@/components/homepage/howWorks";
import OurPartnerships from "@/components/homepage/ourPartnerships";
import SmartMeet from "@/components/homepage/smartMeet";
import PatientsTrust from "@/components/homepage/patientsTrust";
import HealthTips from "@/components/homepage/healthTips";
import AppBottom from "@/components/appBottom";

// styles
import homePageStyles from "./home/styles.module.scss";
import FaqStatic from "@/components/faqStatic/FaqStatic";

import FavoriteSectionPage from "@/components/homepage/favoritesSection/favoriteSectionPage";
import BookAppointementMainPage from "@/components/homepage/bookAppointementMainPage";

export default function Home({ blogs }: any) {
  return (
    <>
      <LayoutContainer>
        <div className={homePageStyles["homepage-main"]}>
          <BookAppointementMainPage />
          <FavoriteSectionPage />
          <HowWorks />
          <OurPartnerships />
          <SmartMeet />
          <PatientsTrust />
          <HealthTips blogs={blogs} />
          <FaqStatic />
          <AppBottom />
        </div>
      </LayoutContainer>
    </>
  );
}
