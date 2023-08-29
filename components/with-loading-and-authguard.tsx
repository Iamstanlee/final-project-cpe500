"use client";

import { AuthState, useAuth } from "@/hooks/use-auth";
import React from "react";
import LoadingIndicator from "./ui/loading-indicator";
import { useRouter } from "next/router";

export default function withLoadingAndAuthGuard<P>(
  Component: React.ComponentType<P>
) {
  return (props: any) => {
    const { authState } = useAuth();
    const router = useRouter();
    if ([AuthState.LOADING].includes(authState))
      return (
        <div className="w-screen h-screen">
          <LoadingIndicator />
        </div>
      );

    return <Component {...props} />;
  };
}
