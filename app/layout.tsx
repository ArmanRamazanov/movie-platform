import MovieCard from "./components/MovieCard";
import "./globals.css";
import LayerProvider from "./layerProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayerProvider>{children}</LayerProvider>
      </body>
    </html>
  );
}
