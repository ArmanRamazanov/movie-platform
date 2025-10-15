"use client";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, Alert } from "antd";
import { useState, useEffect, createContext } from "react";
import type { GenresObject } from "../types";

export const GenresContext = createContext<Record<number, string>>({});
export default function LayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOnline, setIsOnline] = useState(true);
  const [genres, setGenres] = useState([]);

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

  useEffect(() => {
    fetch("http://localhost:3000/api/guestSession");
  }, []);

  useEffect(() => {
    fetch("api/genres")
      .then((response) => response.json())
      .then((data) => {
        const genresObject: GenresObject = {};
        data.genres.map(
          (genre: { id: number; name: string }) =>
            (genresObject[`${genre.id}`] = genre.name),
        );
        setGenres(genresObject);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);
  return (
    <StyleProvider layer>
      <ConfigProvider>
        <GenresContext.Provider value={genres}>
          {isOnline ? (
            children
          ) : (
            <div className="h-screen text-center">
              <Alert type="error" message="Sorry, you are offline"></Alert>
            </div>
          )}
        </GenresContext.Provider>
      </ConfigProvider>
    </StyleProvider>
  );
}
