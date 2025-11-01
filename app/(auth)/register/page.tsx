import AuthWrapper from "@/features/auth/components/AuthWrapper";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { Bell, Target } from "lucide-react";

const alerts = [
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
];

export default function Page() {
  return (
    <AuthWrapper
      bannerImage={"/register-banner.jpg"}
      bannerAlerts={alerts}
      title={"Create your account"}
      description={"Start tracking your expenses in minutes"}
      form={<RegisterForm />}
    />
  );
}
