"use client";

import { Spinner } from "@heroui/react";



export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-2">
        <Spinner color="success" />
        <span className="text-xs text-muted">Success</span>
      </div>
  );
}