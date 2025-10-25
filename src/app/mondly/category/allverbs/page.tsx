// import { getAllCategoriesVerbs } from "../[cid]/verbs/services";
import verbsData from "./_data/all-verbs.json";
import { Suspense } from "react";
import type { Verb } from "./_components/types";
import { VerbsTable } from "./_components/verbs-table";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
export default async function AllVerbsPage() {
  // to generate json, only one time
  // const verbs = await getAllCategoriesVerbs();
  const verbs = verbsData as Verb[];
  return (
    <div>
      <h1 className="text-2xl font-bold">All Verbs</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <VerbsTable verbs={verbs} />
      </Suspense>
    </div>
  );
}
