import ItemList from "@/components/shared/item-list/item-list";
import React from "react";

type Props = React.PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return (
    <>
      <ItemList title="Conversations">Conversation Page</ItemList>
      {children}
    </>
  );
};

export default Layout;
