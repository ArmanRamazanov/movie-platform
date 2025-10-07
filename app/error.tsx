"use client";
import { Alert } from "antd";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="h-screen text-center">
      <Alert type="error" message={error.message}></Alert>
    </div>
  );
}
