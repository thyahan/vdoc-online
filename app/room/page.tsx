import Room from "@/app/(components)/Room";
import { Suspense } from "react";

export default function PageRoom() {
  return (
    <Suspense>
      <Room />
    </Suspense>
  );
}
