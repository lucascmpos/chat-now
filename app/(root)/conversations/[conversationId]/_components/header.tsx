import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CircleArrowLeft, Settings } from "lucide-react";
import Link from "next/link";
import React, { ReactElement } from "react";

type Props = {
  imageUrl?: string;
  email: string;
  name: string;
  members: string[];
  options?: {
    label: string;
    icon: ReactElement;
    destructive: boolean;
    onClick: () => void;
  }[];
};

const Header = ({ imageUrl, email, name, members, options }: Props) => {
  return (
    <Card className="w-full flex rounded-lg items-center p-2 justify-between">
      <div className="flex w-full items-center gap-2">
        <Link href="/conversations" className="block lg:hidden">
          <CircleArrowLeft />
        </Link>
        <Avatar className="h-8 w-8">
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full  justify-start">
          <h2 className="font-semibold">{name}</h2>
          <p className="font-semibold text-xs text-muted-foreground">{email}</p>
          <p className="font-semibold text-xs text-muted-foreground">
            {members.length > 0 ? `Você, ${members.join(", ")}` : ""}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        {options ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" variant="secondary">
                <Settings />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((option, id) => {
                return (
                  <DropdownMenuItem
                    key={id}
                    onClick={option.onClick}
                    className={cn(
                      "font-semibold items-center flex gap-2 cursor-pointer",
                      {
                        "text-destructive": option.destructive,
                      }
                    )}
                  >
                    {option.icon}
                    {option.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </Card>
  );
};

export default Header;
