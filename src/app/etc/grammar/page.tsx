import { Suspense } from "react";
import Loading from "@/app/loading";

import Grammar from "./_components/grammar";
export default function GrammarApp() {
  return (
    <Suspense fallback={<Loading />}>
      <Grammar />
    </Suspense>
  );
}
