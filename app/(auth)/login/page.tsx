import AuthWrapper from "@/features/auth/components/AuthWrapper";
import LoginForm from "@/features/auth/components/LoginForm";
import { Gauge, Sparkles } from "lucide-react";

export default function Page() {
  return (
    <AuthWrapper
      bannerImage="/login-banner.jpg"
      bannerAlerts={[
        {
          title: "Track your spending",
          description: "Clean insights with charts and categories.",
          icon: <Gauge />,
        },
        {
          title: "Templates to move faster",
          description: "Save frequent expenses and reuse with one click.",
          icon: <Sparkles />,
        },
      ]}
      title="Welcome back"
      description="Login to access your dashboard"
      form={<LoginForm />}
    />
  );
}
