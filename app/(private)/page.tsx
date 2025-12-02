"use client";

import ConfirmDialog from "@/components/ui/confirm-dialog";
import { useLogout } from "@/services/shared/useLogout";
import { LoaderCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { isPending, mutate } = useLogout();

  const handleLogout = async () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.success("Logout success");
        router.push("/login");
      },
      onError: (error: any) => {
        toast.error("Logout failed", {
          description: `${error?.message}: ${error?.error}`,
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ConfirmDialog
          buttonLabel="Logout"
          buttonVariant="default"
          buttonIcon={
            isPending ? <LoaderCircle className="animate-spin" /> : <LogOut />
          }
          title="Are you sure you want to logout?"
          onConfirm={handleLogout}
        />
      </main>
    </div>
  );
}
