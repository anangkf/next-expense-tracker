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
import Logo from "@/features/components/Logo";
import {
  Clock,
  Gauge,
  ShieldCheck,
  Sparkles,
  UserRoundPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  return (
    <div className="flex justify-center w-full p-6">
      <div className="flex flex-col lg:flex-row justify-center w-full max-w-5xl gap-6">
        {/* LOGIN BANNER */}
        <Card className="w-full lg:w-7/12 bg-brand-50/50 backdrop-blur-md h-fit">
          <CardContent>
            <AspectRatio ratio={16 / 9} className="rounded-md">
              <Image
                src="/login-banner.jpg"
                alt="Login Image"
                fill
                className="object-cover rounded-md"
              />
            </AspectRatio>
          </CardContent>
          <CardFooter className="flex flex-col w-full gap-4">
            <Alert>
              <Gauge />
              <AlertTitle>Track your spending</AlertTitle>
              <AlertDescription>
                Clean insights with charts and categories.
              </AlertDescription>
            </Alert>
            <Alert>
              <Sparkles />
              <AlertTitle>Templates to move faster</AlertTitle>
              <AlertDescription>
                Save frequent expenses and reuse with one click.
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>

        {/* LOGIN FORM */}
        <Card className="w-full lg:w-5/12 h-fit">
          <CardHeader>
            <Logo />
            <CardTitle>Wellcome back</CardTitle>
            <CardDescription>Login to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form action="">
              <div className="grid w-full items-center">
                <Label htmlFor="email" className="mb-2 mt-4">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="grid w-full items-center">
                <Label htmlFor="password" className="mb-2 mt-4">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <CardAction className="flex flex-col gap-2 mt-4 w-full">
                <Button type="submit" className="w-full">
                  <UserRoundPlus />
                  Create Account
                </Button>
                <AlertDescription className="flex items-center gap-1">
                  <ShieldCheck size={16} />
                  Your data is encripted in transit and at rest.
                </AlertDescription>
                <AlertDescription className="flex items-center gap-1">
                  <Clock size={16} />
                  Session remains active for 7 days on this device.
                </AlertDescription>
              </CardAction>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center items-center gap-1">
            <span>Don't have an account?</span>
            <Link href="/register">
              <Button variant="link" className="text-brand-500 p-0">
                Create one
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
