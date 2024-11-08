"use client";

import { api } from "@/api";
import FormPortal from "@/app/(components)/Portal/form";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Portal() {
  const router = useRouter();

  useLayoutEffect(() => {
    const currentToken = window.localStorage.getItem("token");
    const tokenCreateAt = window.localStorage.getItem("tokenCreateAt");
    const username = window.localStorage.getItem("username");
    const roomName = window.localStorage.getItem("roomName");
    const currentTime = Date.now();

    console.log({
      currentToken,
      tokenCreateAt,
      username,
    });

    if (!tokenCreateAt || !currentToken) {
      return;
    }

    const TTL = 55 * 60 * 1000; // 55 minutes
    const tokenAge = currentTime - parseInt(tokenCreateAt);
    const isTokenExpired = tokenAge > TTL;

    if (isTokenExpired) {
      console.log("Token expired", {
        tokenAge,
        TTL,
        currentTime,
      });
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("tokenCreateAt");
      window.localStorage.removeItem("roomName");
    } else {
      if (confirm(`You have an active session (${roomName}), do you want to continue?`)) {
        router.push(`/room/?token=${currentToken}`);
      } else {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenCreateAt");
        window.localStorage.removeItem("roomName");
      }
    }
  }, []);

  return (
    <div className="w-full flex-col h-full flex justify-center items-center p-4">
      <p className="text-2xl font-bold">VDOC</p>
      <FormPortal
        onSubmit={values => {
          api({
            method: "POST",
            url: "/api/token",
            data: {
              participantName: values.username,
              roomName: values.roomName,
            },
          }).then(res => {
            const token = res.data.token;

            if (token) {
              window.localStorage.setItem("token", token);
              window.localStorage.setItem("username", values.username);
              window.localStorage.setItem("roomName", values.roomName);
              window.localStorage.setItem("tokenCreateAt", Date.now().toString());

              router.push(`/room/?token=${res.data.token}`);
            }
          });
        }}
      />
    </div>
  );
}
