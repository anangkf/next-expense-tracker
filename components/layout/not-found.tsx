"use client";

import {
  ArrowLeft,
  Folder,
  Gauge,
  Home,
  Layers,
  Receipt,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Logo from "../ui/logo";

export default function NotFound() {
  const router = useRouter();
  return (
    <Card className="max-w-xs md:max-w-[75vw] lg:max-w-2xl">
      <CardHeader>
        <Logo />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Card className="w-full bg-brand-50/50 p-4 gap-0">
          <CardContent className="flex flex-col text-center gap-2">
            <CardTitle className="text-2xl md:text-4xl text-brand-900 text-bold line-clamp-1">
              404
            </CardTitle>
            <CardDescription className="text-xs md:text-sm text-muted-foreground">
              The page you are looking for doesn&apos;t exist or was moved.
            </CardDescription>
          </CardContent>
        </Card>
        <CardAction className="flex gap-2 justify-center w-full">
          <Button
            variant="outline-brand"
            size={"sm"}
            onClick={() => router.back()}
          >
            <ArrowLeft />
            Go Back
          </Button>
          <Button size={"sm"} asChild>
            <a href="/dashboard">
              <Home />
              Go to Dashboard
            </a>
          </Button>
        </CardAction>
      </CardContent>
      <CardFooter className="px-6 hidden md:flex">
        <div className="flex flex-col w-full gap-1 p-4 justify-start text-left border rounded-xl">
          <div className="text-sm text-muted-foreground">Quick access</div>
          <CardAction className="flex flex-wrap gap-2">
            <Button title="Dashboard" variant="outline" size={"sm"} asChild>
              <a href="/dashboard">
                <Gauge />
                Dashboard
              </a>
            </Button>
            <Button title="Expenses" variant="outline" size={"sm"} asChild>
              <a href="/expenses">
                <Receipt />
                Expenses
              </a>
            </Button>
            <Button title="Categories" variant="outline" size={"sm"} asChild>
              <a href="/categories">
                <Folder />
                Categories
              </a>
            </Button>
            <Button title="Templates" variant="outline" size={"sm"} asChild>
              <a href="/templates">
                <Layers />
                Templates
              </a>
            </Button>
            <Button title="Profile" variant="outline" size={"sm"} asChild>
              <a href="/profile">
                <User />
                Profile
              </a>
            </Button>
          </CardAction>
        </div>
      </CardFooter>
    </Card>
  );
}
