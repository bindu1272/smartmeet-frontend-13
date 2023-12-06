import FavoritesSection from "@/components/homepage/favoritesSection";
// styles
import get from "lodash/get";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/authOptions";

const FavoriteSectionPage = async ({ blogs }: any) => {
  const session = await getServerSession(authOptions);
  console.log("session**", session);
  return <>{get(session, "user") && <FavoritesSection />}</>;
};

export default FavoriteSectionPage;
