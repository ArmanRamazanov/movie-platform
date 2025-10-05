"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";

export default function LayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyleProvider layer>
      <ConfigProvider>{children}</ConfigProvider>
    </StyleProvider>
  );
}
