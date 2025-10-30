import { AlertDescription } from "@components/ui/alert";
import { Button } from "@components/ui/button";
import { CardAction } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Clock, ShieldCheck, UserRoundPlus } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  return (
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
        <div className="flex justify-center items-center gap-1">
          <span>Don&apos;t have an account?</span>
          <Link href="/register">
            <Button variant="link" className="text-brand-500 p-0">
              Create one
            </Button>
          </Link>
        </div>
      </CardAction>
    </form>
  );
}
