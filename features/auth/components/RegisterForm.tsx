import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/ui/logo";
import { Bell, ChartLine, Target, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="flex justify-center w-full p-6">
      <div className="flex flex-col lg:flex-row justify-center w-full max-w-5xl gap-6">
        {/* REGISTER BANNER */}
        <Card className="w-full lg:w-7/12 bg-brand-50/50 backdrop-blur-md h-fit">
          <CardHeader>
            <h4 className="flex items-center gap-2 text-brand-600">
              <ChartLine /> Get clarity fast
            </h4>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16 / 9} className="rounded-md">
              <Image
                src="/register-banner.jpg"
                alt="Register Image"
                fill
                className="object-cover rounded-md"
              />
            </AspectRatio>
          </CardContent>
          <CardFooter className="flex flex-col w-full gap-4">
            <Alert>
              <Target />
              <AlertTitle>Set monthly goals</AlertTitle>
              <AlertDescription>
                Track remaining budget in real-time
              </AlertDescription>
            </Alert>
            <Alert>
              <Bell />
              <AlertTitle>Stay notified</AlertTitle>
              <AlertDescription>
                Get alerts for subscriptions and overspending
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>

        {/* REGISTER FORM */}
        <Card className="w-full lg:w-5/12 h-fit">
          <CardHeader>
            <div className="flex justify-between">
              <Logo />
              <span className="flex items-center gap-2 text-sm p-0">
                <p className="m-0 text-neutral-500">Step</p>
                <div className="flex items-center gap-1">
                  <Link href="/register">
                    <div className="w-2 h-2 rounded-full bg-brand-600"></div>
                  </Link>
                  <Link href="/register">
                    <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
                  </Link>
                  <Link href="/register">
                    <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
                  </Link>
                </div>
              </span>
            </div>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Start tracking your expenses in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="">
              <div className="grid w-full max-w-sm items-center">
                <Label htmlFor="email" className="mb-2 mt-4">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="grid w-full max-w-sm items-center">
                <Label htmlFor="username" className="mb-2 mt-4">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
              <div className="grid w-full max-w-sm items-center">
                <Label htmlFor="password" className="mb-2 mt-4">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <CardAction className="mt-4 w-full">
                <Button type="submit" className="w-full">
                  <UserRoundPlus />
                  Create Account
                </Button>
              </CardAction>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center items-center gap-1">
            <span>Already have an account?</span>
            <Link href="/login">
              <Button variant="link" className="text-brand-500 p-0">
                Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
