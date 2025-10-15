"use client";
import { Rate } from "antd";
import { useEffect, useState } from "react";

export default function MovieRating({
  movieId,
  userRating,
}: {
  movieId: number;
  userRating: {
    id: number;
    favorite: boolean;
    rated: boolean | { value: number };
    watchList: boolean;
  };
}) {
  const [guestSessionId, setGuestSessionId] = useState("");

  useEffect(() => {
    const getCookie = () => {
      const cookies = document.cookie;
      setGuestSessionId(
        cookies
          .split(";")
          .find((row) => row.startsWith(" guestSessionId="))
          ?.split("=")[1] || "",
      );
    };
    getCookie();
  }, []);
  const [ratingError, setRatingError] = useState("");
  const [ratingSuccess, setRatingSuccess] = useState("");

  const addRating = async (rating: number) => {
    try {
      const response = await fetch(
        `/api/rate/${movieId}?guest_session_id=${guestSessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ value: rating }),
        },
      );
      if (!response.ok) throw Error("Something went wrong");
      setRatingSuccess("rated");
      setTimeout(() => setRatingSuccess(""), 1500);
      return;
    } catch {
      setRatingError("Something went wrong");
      setTimeout(() => setRatingError(""), 1500);
    }
  };
  return (
    <div className="flex flex-row align-middle gap-0.5">
      <div>
        <p className="text-light-gray">Your rating:</p>
      </div>
      <Rate
        defaultValue={
          userRating.rated ? (userRating.rated as { value: number }).value : 0
        }
        allowHalf
        disabled={!movieId || !guestSessionId}
        count={10}
        onChange={async (value: number) => {
          await addRating(value);
        }}
      />
      {ratingError ? (
        <p className="text-sm text-red-500">{ratingError}</p>
      ) : (
        ratingSuccess && (
          <p className="text-sm text-green-400">{ratingSuccess}</p>
        )
      )}
    </div>
  );
}
