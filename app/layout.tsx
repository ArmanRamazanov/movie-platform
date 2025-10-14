import HeadLinks from "./components/HeadLinks";
import "./globals.css";
import LayerProvider from "./layerProvider";
import { NuqsAdapter } from "nuqs/adapters/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="xl:px-40 bg-gray-200">
        <LayerProvider>
          <NuqsAdapter>
            <main className="bg-white p-4 space-y-5">
              <HeadLinks />
              {children}
            </main>
          </NuqsAdapter>
        </LayerProvider>
      </body>
    </html>
  );
}
