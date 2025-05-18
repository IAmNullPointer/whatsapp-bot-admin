"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken, isTokenExpired } from "@/lib/auth";

export function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const expired = isTokenExpired(token);

    if (!token || expired) {
      removeToken();
      router.push("/signin");
    }
  }, [router]);
}
