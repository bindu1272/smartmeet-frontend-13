import FavoritesSection from "@/components/homepage/favoritesSection";
// styles
import get from "lodash/get";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/authOptions";
import React from "react";

const FavoriteSectionPage = async ({ blogs }: any) => {
  const session = await getServerSession(authOptions);
  console.log("session**", session);
  return <>
    {
      get(session, "user") 
      ? 
        <FavoritesSection /> 
      : null
    }
  </>;
};

export default FavoriteSectionPage;
