"use client";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, Alert } from "antd";
import { useState, useEffect } from "react";

export default function LayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return (): void => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <StyleProvider layer>
      <ConfigProvider>
        {isOnline ? (
          children
        ) : (
          <div className="h-screen text-center">
            <Alert type="error" message="Sorry, you are offline"></Alert>
          </div>
        )}
      </ConfigProvider>
    </StyleProvider>
  );
}
