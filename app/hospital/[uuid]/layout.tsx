import React from "react";
import LayoutContainer from "../../../components/layoutContainer/index";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
      <LayoutContainer hideBookAppointment={true}>{children}</LayoutContainer>
  );
}
