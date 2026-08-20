"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SuccessSessionRefresh() {
  const router = useRouter();

  useEffect(() => {
    const refreshSession = async () => {
      try {
        // Ignore cached session and fetch the latest user
        await authClient.getSession({
          query: {
            disableCookieCache: true,
          },
        });

        // Refresh Server Components (Navbar, Dashboard, etc.)
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    };

    refreshSession();
  }, [router]);

  return null;
}