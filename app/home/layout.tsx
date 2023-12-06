import LayoutContainer from "@/components/layoutContainer";


function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
           <LayoutContainer>
        {children}</LayoutContainer>
      </body>
    </html>
  );
}

export default Layout;
