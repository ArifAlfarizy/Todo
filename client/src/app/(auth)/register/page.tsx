"use client";

import { SignupForm } from "@/src/components/signup-form";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/todos");
    }
  }, [loading, isAuthenticated]);

  if (loading) return null;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}