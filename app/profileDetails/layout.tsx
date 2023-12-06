import LayoutContainer from "@/components/layoutContainer";

function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutContainer searchShow>{children}</LayoutContainer>;
}

export default Layout;
