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
import { useNavigation } from "@/hooks/use-navigation";
import { UserButton } from "@clerk/clerk-react";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const DesktopNav = () => {
  const paths = useNavigation();
  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav>
        <ul className="flex flex-col items-center gap-4">
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
                        className="absolute left-6 bottom-7 px-2"
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
        </ul>
      </nav>
      <div className="flex flex-col gap-4 items-center">
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
        <ThemeToggle />
        <UserButton />
      </div>
    </Card>
  );
};

export default DesktopNav;
