"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLogout } from "@/services/shared/useLogout";
import { LoaderCircle, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Logo from "./ui/logo";

const navs = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "Expenses",
    url: "#",
  },
  {
    title: "Categories",
    url: "#",
  },
  {
    title: "Templates",
    url: "#",
  },
  {
    title: "Profile",
    url: "#",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();
  const router = useRouter();
  const { isPending, mutate } = useLogout();

  const handleLogout = async () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.success("Logout success");
        router.push("/login");
      },
      onError: (error: any) => {
        toast.error("Logout failed", {
          description: `${error?.message}: ${error?.error}`,
        });
      },
    });
  };

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="py-2">
            {/* <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard"> */}
            <Logo />
            {/* </a>
            </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navs.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={path === item.url}>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout} disabled={isPending}>
          {isPending ? <LoaderCircle className="animate-spin" /> : <LogOut />}{" "}
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
