"use client";

import ConversationContainer from "@/components/shared/conversation/conversation-container";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2, LogOut, Trash2, UserX } from "lucide-react";
import React, { useState } from "react";
import Header from "./_components/header";
import Body from "./_components/body/body";
import ChatInput from "./_components/input/chat-input";
import RemoveFriendDialog from "./dialogs/remove-friend-dialog";
import DeleteGroupDialog from "./dialogs/delete-group-dialog";
import LeaveGroupDialog from "./dialogs/leave-group-dialog";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);

  return conversation === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Nenhuma conversa encontrada
    </p>
  ) : (
    <ConversationContainer>
      <RemoveFriendDialog
        conversationId={conversationId}
        open={removeFriendDialogOpen}
        setOpen={setRemoveFriendDialogOpen}
      />
      <LeaveGroupDialog
        conversationId={conversationId}
        open={leaveGroupDialogOpen}
        setOpen={setLeaveGroupDialogOpen}
      />
      <DeleteGroupDialog
        conversationId={conversationId}
        open={deleteGroupDialogOpen}
        setOpen={setDeleteGroupDialogOpen}
      />
      <Header
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember?.imageUrl
        }
        email={
          conversation.isGroup ? "" : conversation.otherMember?.email || ""
        }
        name={
          conversation.isGroup
            ? conversation.name
            : conversation.otherMember?.username || ""
        }
        members={
          conversation.isGroup
            ? conversation.members.map((member) => member.username)
            : []
        }
        options={
          conversation.isGroup
            ? [
                {
                  label: "Sair do grupo",
                  icon: <LogOut size={16} />,
                  destructive: false,
                  onClick: () => setLeaveGroupDialogOpen(true),
                },
                {
                  label: "Deletar grupo",
                  icon: <Trash2 size={16} />,
                  destructive: true,
                  onClick: () => setDeleteGroupDialogOpen(true),
                },
              ]
            : [
                {
                  label: "Remover amigo",
                  icon: <UserX size={16} />,
                  destructive: true,
                  onClick: () => setRemoveFriendDialogOpen(true),
                },
              ]
        }
      />
      <Body
        members={
          conversation.isGroup
            ? []
            : conversation.otherMember
              ? [conversation.otherMember]
              : []
        }
      />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
