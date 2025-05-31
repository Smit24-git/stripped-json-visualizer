import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin-ext"],
});

const StyledLayoutWrapper = ({children}) =>{
  return <div style={{
    background: '#fff',
    fontFamily: inter.style.fontFamily,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }}>{children}</div>
}

const PageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <StyledLayoutWrapper>
      <div style={{flex: 1}}>{children}</div>
    </StyledLayoutWrapper>
  );
};

export default PageLayout;
