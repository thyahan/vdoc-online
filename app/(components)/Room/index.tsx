"use client";

import AgentRenderer from "@/app/(components)/Room/AgentRenderer";
import CustomerRenderer from "@/app/(components)/Room/CustomerRenderer";
import { LiveKitRoom } from "@livekit/components-react";

function getRole() {
  return window.localStorage.getItem("username")?.toLocaleLowerCase().includes("agent") ? "agent" : "customer";
}

function getRoomName() {
  return window.localStorage.getItem("roomName");
}

export default function Room({ token }: { token: string }) {
  const role = getRole();
  const roomName = getRoomName();

  const smallBox =
    "lg:w-[240px] lg:h-[320px] p-2 w-[120px] h-[180px] flex justify-center absolute top-4 right-4 z-20 border border-red-500";
  const largeBox = "w-screen h-screen p-2 bg-black flex items-center justify-center border border-red-500";

  return (
    <LiveKitRoom audio={true} video={true} token={token} serverUrl={process.env.NEXT_PUBLIC_WS_URL}>
      <p className="top-4 left-4 text-4xl opacity-20 text-white fixed">{roomName}</p>
      <div className="w-full h-full">
        <div className={role === "agent" ? smallBox : largeBox}>
          <AgentRenderer />
        </div>
        <div className={role === "customer" ? smallBox : largeBox}>
          <CustomerRenderer />
        </div>
      </div>
    </LiveKitRoom>
  );
}
