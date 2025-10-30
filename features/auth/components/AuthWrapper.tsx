import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/logo";
import Stepper from "@/components/ui/stepper";
import Image from "next/image";
import { ReactNode } from "react";

type BannerAlert = {
  title: string;
  description: string;
  icon: ReactNode;
};

interface AuthWrapperProps {
  bannerTitle?: string;
  bannerTitleIcon?: ReactNode;
  bannerImage: string;
  bannerAlerts?: BannerAlert[];
  stepper?: {
    steps: number;
    currentStep: number;
    title?: string;
  };
  title: string;
  description: string;
  form: ReactNode;
}

export default function AuthWrapper({
  bannerTitle,
  bannerTitleIcon,
  bannerImage,
  bannerAlerts,
  stepper,
  title,
  description,
  form,
}: Readonly<AuthWrapperProps>) {
  return (
    <div className="flex justify-center w-full p-6">
      <div className="flex flex-col lg:flex-row justify-center w-full max-w-5xl gap-6">
        {/* BANNER */}
        <Card className="w-full lg:w-7/12 bg-brand-50/50 backdrop-blur-md h-fit">
          {bannerTitle && (
            <CardHeader>
              <h4 className="flex items-center gap-2 text-brand-600">
                {bannerTitleIcon}
                {bannerTitle}
              </h4>
            </CardHeader>
          )}
          <CardContent>
            <AspectRatio ratio={16 / 9} className="rounded-md">
              <Image
                src={bannerImage}
                alt={"Banner Image"}
                fill
                className="object-cover rounded-md"
              />
            </AspectRatio>
          </CardContent>
          <CardFooter className="flex flex-col w-full gap-4">
            {bannerAlerts?.map((alert) => (
              <Alert key={alert.title}>
                {alert.icon}
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
              </Alert>
            ))}
          </CardFooter>
        </Card>

        {/* FORM */}
        <Card className="w-full lg:w-5/12 h-fit">
          <CardHeader>
            <div className="flex justify-between">
              <Logo />
              {stepper && (
                <Stepper
                  length={stepper.steps}
                  currentStep={stepper.currentStep}
                  title={stepper.title}
                />
              )}
            </div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{form}</CardContent>
        </Card>
      </div>
    </div>
  );
}
