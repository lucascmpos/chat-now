import SidebarWrapper from "@/components/sidebar/sidebar-wraper";
import React from "react";

type Props = React.PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return <SidebarWrapper>{children}</SidebarWrapper>;
};

export default Layout;
