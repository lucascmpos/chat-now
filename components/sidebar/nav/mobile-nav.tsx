"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConversation } from "@/hooks/use-conversation";
import { useNavigation } from "@/hooks/use-navigation";
import { UserButton } from "@clerk/clerk-react";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const MobileNav = () => {
  const paths = useNavigation();

  const { isActive } = useConversation();

  if (isActive) return null;
  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
          {paths.map((path, id) => {
            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        size="icon"
                        variant={path.active ? "default" : "outline"}
                      >
                        {path.icon}
                      </Button>
                    </TooltipTrigger>
                    {path.count ? (
                      <Badge
                        variant="secondary"
                        className="absolute left-7 bottom-6"
                      >
                        {path.count}
                      </Badge>
                    ) : null}
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
          <li>
            <Tooltip>
              <TooltipTrigger>
                <a
                  href="https://github.com/lucascmpos/chat-now"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="icon" variant="outline">
                    <Github />
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>Repositório do Chat Now</TooltipContent>
            </Tooltip>
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
