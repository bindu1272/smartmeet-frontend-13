import LayoutContainer from "@/components/layoutContainer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutContainer hideBookAppointment={true}  searchShow={true}>{children}</LayoutContainer>
    </>
  );
}
