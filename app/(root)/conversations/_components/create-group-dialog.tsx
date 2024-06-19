"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";
import { useMutationState } from "@/hooks/use-mutation-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { PlusIcon, X } from "lucide-react";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {};

const CreateGroupFormSchema = z.object({
  name: z.string().min(1, { message: "É preciso um nome" }),
  members: z
    .string()
    .array()
    .min(1, { message: "Adicione pelo menos um membro" }),
});

const CreateGroupDialog = (props: Props) => {
  const friends = useQuery(api.friends.get);

  const { mutate: createGroup, pending } = useMutationState(
    api.friends.createGroup
  );

  const form = useForm<z.infer<typeof CreateGroupFormSchema>>({
    resolver: zodResolver(CreateGroupFormSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = form.watch("members", []);

  const unselectedFriends = useMemo(() => {
    return friends
      ? friends.filter((friend) => !members.includes(friend._id))
      : [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members.length, friends?.length]);

  const handleSubmit = async (
    values: z.infer<typeof CreateGroupFormSchema>
  ) => {
    await createGroup({ name: values.name, members: values.members })
      .then(() => {
        form.reset();
        toast.success("Grupo criado com sucesso");
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError ? error.data : "Erro inesperado"
        );
      });
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant="outline">
            <DialogTrigger asChild>
              <PlusIcon />
            </DialogTrigger>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Criar grupo</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="block">
        <DialogHeader>
          <DialogTitle>Crie um grupo</DialogTitle>
          <DialogDescription>
            Adicione seus amigos para um grupo!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome do grupo</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nome do grupo aqui..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="members"
              render={() => {
                return (
                  <FormItem>
                    <FormLabel>Amigos</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          disabled={unselectedFriends.length === 0}
                        >
                          <Button className="w-full" variant="outline">
                            Selecionar amigos
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-full">
                          {unselectedFriends.map((friend) => {
                            return (
                              <DropdownMenuCheckboxItem
                                className="flex items-center gap-2 w-full p-2"
                                key={friend._id}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    form.setValue("members", [
                                      ...members,
                                      friend._id,
                                    ]);
                                  }
                                }}
                              >
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={friend.imageUrl} />
                                  <AvatarFallback>
                                    {friend.username.substring(0, 1)}
                                  </AvatarFallback>
                                </Avatar>
                                <h4 className="truncate">{friend.username}</h4>
                              </DropdownMenuCheckboxItem>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {members && members.length ? (
              <Card className="flex items-center gap-3 overflow-x-auto w-full h-24 p-2 no-scrollbar">
                {friends
                  ?.filter((friend) => members.includes(friend._id))
                  ?.map((friend) => {
                    return (
                      <div
                        key={friend._id}
                        className="flex flex-col items-center"
                      >
                        <div className="relative">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={friend.imageUrl} />
                            <AvatarFallback>
                              {friend.username.substring(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                          <X
                            className="text-muted-foreground w-4 h-4 absolute bottom-8 left-7 bg-muted rounded-full cursor-pointer"
                            onClick={() =>
                              form.setValue(
                                "members",
                                members.filter((id) => id !== friend._id)
                              )
                            }
                          />
                        </div>
                        <p className="truncate text-sm">
                          {friend.username.split(" ")[0]}
                        </p>
                      </div>
                    );
                  })}
              </Card>
            ) : null}
            <DialogFooter>
              <Button disabled={pending} type="submit">
                Criar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
