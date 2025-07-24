import { prisma } from "@/lib/prisma";
import { JsonViewerComponent } from "@/components/json-viewer";
import { Loading } from "@/components/loading";
import { Suspense } from "react";
import { WordCard } from "@/components/word-card";

interface ExampleProps {
  id: string;
  t3: string;
  t1: string;
  t2: string;
}
interface WordProps {
  id: string;
  t3: string;
  t1: string;
  t2: string;
  examples: ExampleProps[];
}
export default async function WordsExamplesPage() {
  const words = await prisma.word.findMany({
    include: {
      examples: true,
    },
  });
  const wordsData: WordProps[] = words.map((word) => ({
    id: word.id.toString(),
    t3: word.t3,
    t1: word.t1,
    t2: word.t2,
    examples: word.examples.map((example) => ({
      id: example.id.toString(),
      t3: example.t3,
      t1: example.t1,
      t2: example.t2,
    })),
  }));
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-4 p-4">
        <div className="float-right">
          <div className="text-white bg-red-500 px-2 py-1 rounded">
            Fix or replace these - there are errors
          </div>
        </div>
        <div className="flex justify-center">
          <h1 className="phonetic">1911 Words with Examples</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wordsData.map((word) => (
            <div key={Number(word.id)}>
              <WordCard word={word} />
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
