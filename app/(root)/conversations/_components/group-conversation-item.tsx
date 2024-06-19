import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
import { User, UsersRound } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: Id<"conversations">;
  name: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
};

const GroupConversationItem = ({
  id,
  name,
  lastMessageSender,
  lastMessageContent,
}: Props) => {
  return (
    <Link className="w-full" href={`/conversations/${id}`}>
      <Card className="p-2 flex flex-row items-center gap-4 truncate">
        <div className="flex items-center gap-4 truncate">
          <Avatar>
            <AvatarFallback>
              <UsersRound />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col truncate">
            <h4 className="truncate">{name}</h4>
            {lastMessageSender && lastMessageContent ? (
              <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis ">
                <p className="font-semibold">
                  {lastMessageSender}
                  {":"}&nbsp;
                </p>
                <p className="truncate overflow-ellipsis">
                  {lastMessageContent}
                </p>
              </span>
            ) : (
              <p className="text-sm text-muted-foreground truncate">
                Click here to start a conversation with {name}!
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default GroupConversationItem;
