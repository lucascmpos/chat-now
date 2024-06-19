"use client";

import ItemList from "@/components/shared/item-list/item-list";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";
import DmConversationItem from "./_components/dm-conversation-item";
import CreateGroupDialog from "./_components/create-group-dialog";
import GroupConversationItem from "./_components/group-conversation-item";

type Props = React.PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);
  return (
    <>
      <ItemList title="Conversations" action={<CreateGroupDialog />}>
        {conversations ? (
          conversations.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No conversations. Add a friend to start a conversation!
            </p>
          ) : (
            conversations.map((conversations) => {
              return conversations.conversation.isGroup ? (
                <div className="flex flex-col items-start w-full">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Groups
                  </h1>
                  <GroupConversationItem
                    key={conversations.conversation._id}
                    id={conversations.conversation._id}
                    name={conversations.conversation.name || ""}
                    lastMessageContent={conversations.lastMessage?.content}
                    lastMessageSender={conversations.lastMessage?.sender}
                  />
                </div>
              ) : (
                <DmConversationItem
                  key={conversations.conversation._id}
                  id={conversations.conversation._id}
                  username={conversations.otherMember?.username || ""}
                  imageUrl={conversations.otherMember?.imageUrl || ""}
                  lastMessageContent={conversations.lastMessage?.content}
                  lastMessageSender={conversations.lastMessage?.sender}
                />
              );
            })
          )
        ) : (
          <Loader2 />
        )}
      </ItemList>
      {children}
    </>
  );
};

export default Layout;
