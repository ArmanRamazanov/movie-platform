"use client";
import Spinner from "./components/Spinner";

export default function Loading() {
  return (
    <div className="h-screen grid place-items-center">
      <Spinner />
    </div>
  );
}
