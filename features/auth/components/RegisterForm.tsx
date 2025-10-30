import { Button } from "@components/ui/button";
import { CardAction } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push("/register?step=2");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center">
        <Label htmlFor="email" className="mb-2 mt-4">
          Email
        </Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      <div className="grid w-full items-center">
        <Label htmlFor="username" className="mb-2 mt-4">
          Username
        </Label>
        <Input id="username" type="text" placeholder="Enter your username" />
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
      <CardAction className="mt-4 w-full">
        <Button type="submit" className="w-full">
          <UserRoundPlus />
          Create Account
        </Button>
        <div className="flex justify-center items-center gap-1 mt-4">
          <span>Already have an account?</span>
          <Link href="/login">
            <Button variant="link" className="text-brand-500 p-0">
              Login
            </Button>
          </Link>
        </div>
      </CardAction>
    </form>
  );
}
