import { prisma } from "@/lib/prisma";
import { JsonViewerComponent } from "@/components/json-viewer";
import { Loading } from "@/components/loading";
import { Suspense } from "react";
export default async function WordsExamplesPage() {
  const words = await prisma.word.findMany({
    include: {
      examples: true,
    },
  });
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <h1>Words Examples</h1>
        <JsonViewerComponent data={words} />
      </div>
    </Suspense>
  )
}

