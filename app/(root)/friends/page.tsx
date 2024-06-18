import ConversationFallback from "@/components/shared/conversation/conversation-fallback";
import ItemList from "@/components/shared/item-list/item-list";
import React from "react";
import AddFriendDialog from "./_components/add-friend-dialog";

type Props = {};

const FriendsPage = (props: Props) => {
  return (
    <>
      <ItemList title="Friends" action={<AddFriendDialog />}>
        <p>Friends</p>
      </ItemList>
      <ConversationFallback />
    </>
  );
};

export default FriendsPage;
