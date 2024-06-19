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
  let firstGroupRendered = false;

  return (
    <>
      <ItemList title="Conversas" action={<CreateGroupDialog />}>
        {conversations ? (
          conversations.length === 0 ? (
            <p className="w-full h-full flex text-center items-center justify-center">
              Adicione um amigo para começar a conversar!
            </p>
          ) : (
            conversations.map((conversation) => {
              if (conversation.conversation.isGroup) {
                if (!firstGroupRendered) {
                  firstGroupRendered = true;
                  return (
                    <React.Fragment key={conversation.conversation._id}>
                      <div className="flex flex-col items-start w-full">
                        <h1 className="text-2xl font-semibold tracking-tight">
                          Grupos
                        </h1>
                      </div>
                      <GroupConversationItem
                        id={conversation.conversation._id}
                        name={conversation.conversation.name || ""}
                        lastMessageContent={conversation.lastMessage?.content}
                        lastMessageSender={conversation.lastMessage?.sender}
                        unseenCount={conversation.unseenCount}
                      />
                    </React.Fragment>
                  );
                } else {
                  return (
                    <GroupConversationItem
                      key={conversation.conversation._id}
                      id={conversation.conversation._id}
                      name={conversation.conversation.name || ""}
                      lastMessageContent={conversation.lastMessage?.content}
                      lastMessageSender={conversation.lastMessage?.sender}
                      unseenCount={conversation.unseenCount}
                    />
                  );
                }
              } else {
                return (
                  <DmConversationItem
                    key={conversation.conversation._id}
                    id={conversation.conversation._id}
                    username={conversation.otherMember?.username || ""}
                    imageUrl={conversation.otherMember?.imageUrl || ""}
                    lastMessageContent={conversation.lastMessage?.content}
                    lastMessageSender={conversation.lastMessage?.sender}
                    unseenCount={conversation.unseenCount}
                  />
                );
              }
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
