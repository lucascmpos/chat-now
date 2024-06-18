import ConversationFallback from "@/components/shared/conversation/conversation-fallback";
import ItemList from "@/components/shared/item-list/item-list";
import React from "react";

type Props = {};

const FriendsPage = (props: Props) => {
  return (
    <>
      <ItemList title="Friends">
        <p>Friends</p>
      </ItemList>
      <ConversationFallback />
    </>
  );
};

export default FriendsPage;
