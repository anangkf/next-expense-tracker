import OnboardStepper from "@/features/auth/components/OnboardStepper";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <OnboardStepper />
    </Suspense>
  );
}
