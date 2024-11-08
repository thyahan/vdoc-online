"use client";

import Room from "@/app/(components)/Room";
import { useSearchParams } from "next/navigation";

export default function PageRoom() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return <div>Invalid token</div>;
  }

  return <Room token={token} />;
}
