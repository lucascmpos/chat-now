import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: Id<"conversations">;
  imageUrl: string;
  username: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
  unseenCount: number;
};

const DmConversationItem = ({
  id,
  imageUrl,
  username,
  lastMessageSender,
  lastMessageContent,
  unseenCount,
}: Props) => {
  return (
    <Link className="w-full" href={`/conversations/${id}`}>
      <Card className="p-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col truncate">
            <h4 className="truncate">{username}</h4>
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
                Click here to start a conversation with {username}!
              </p>
            )}
          </div>
        </div>
        {unseenCount ? <Badge>{unseenCount}</Badge> : null}
      </Card>
    </Link>
  );
};

export default DmConversationItem;
