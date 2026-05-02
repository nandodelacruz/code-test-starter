"use client";

import type { ReactNode } from "react";

import { ErrorBoundary } from "@/components/features/ErrorBoundary";

export function ErrorBoundaryShell({ children }: { children: ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
