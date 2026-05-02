"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto">
      <div className="bg-destructive/10 p-6 rounded-full mb-8">
        <AlertTriangle className="h-16 w-16 text-destructive" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">
        Oops! Something went wrong
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        We apologize for the inconvenience. An unexpected error has occurred on
        our end.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Button onClick={() => reset()} size="lg" className="font-semibold">
          Try again
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href={ROUTES.HOME}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
