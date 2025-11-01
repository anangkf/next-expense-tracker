"use client";

import AuthWrapper from "@/features/auth/components/AuthWrapper";
import OnboardStep1 from "@/features/auth/components/OnboardStep1";
import OnboardStep2 from "@/features/auth/components/OnboardStep2";
import RegisterForm from "@/features/auth/components/RegisterForm";
import {
  Bell,
  CircleCheckBig,
  FolderDown,
  LayoutDashboard,
  Rocket,
  Target,
  Timer,
  Wallet,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const steps = [
  {
    id: "register",
    banner: {
      title: undefined,
      icon: undefined,
      image: "/register-banner.jpg",
      alerts: [
        {
          title: "Set monthly goals",
          description: "Track remaining budget in real-time.",
          icon: <Target />,
        },
        {
          title: "Stay notified",
          description: "Get alerts for subscriptions and overspending.",
          icon: <Bell />,
        },
      ],
    },
    stepper: {
      steps: 3,
      currentStep: 1,
      title: "Step",
    },
    title: "Create your account",
    description: "Start tracking your expenses in minutes",
    form: <RegisterForm />,
  },
  {
    id: "onboard1",
    banner: {
      title: "Welcome to Exfens Trekker",
      icon: <Wallet />,
      image: "/onboard-1.jpg",
      alerts: [
        {
          title: "Account created",
          description:
            "Let's set a few preferences so your dashboard feels right.",
          icon: <CircleCheckBig />,
        },
        {
          title: "You can change these anytime",
          description: "Edit in Profile or Categories later.",
          icon: <LayoutDashboard />,
        },
      ],
    },
    stepper: {
      steps: 3,
      currentStep: 2,
      title: "Step",
    },
    title: "Set your preferences",
    description: "We'll prefill your workspace for a smoother start",
    form: <OnboardStep1 />,
  },
  {
    id: "onboard2",
    banner: {
      title: "Speed up with templates",
      icon: <FolderDown />,
      image: "/onboard-2.jpg",
      alerts: [
        {
          title: "Preload common expenses",
          description: "Daily coffe, commute, rent - ready to reuse.",
          icon: <Rocket />,
        },
        {
          title: "Takes less than a minute",
          description: "You can always modify or remove later.",
          icon: <Timer />,
        },
      ],
    },
    stepper: {
      steps: 3,
      currentStep: 3,
      title: "Step",
    },
    title: "Import starter templatesSet your preferences",
    description: "We'll add a few templates so you can log expenses faster",
    form: <OnboardStep2 />,
  },
];

export default function Page() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");

  const currentStep =
    steps.find((s) => s.stepper.currentStep === Number(step)) || steps[0];

  return (
    <AuthWrapper
      bannerTitle={currentStep?.banner?.title}
      bannerTitleIcon={currentStep?.banner?.icon}
      bannerImage={currentStep?.banner?.image}
      bannerAlerts={currentStep?.banner?.alerts}
      stepper={currentStep?.stepper}
      title={currentStep?.title}
      description={currentStep?.description}
      form={currentStep?.form}
    />
  );
}
