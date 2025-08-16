import mdIndex from "./md-toc.json";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

interface MdIndex {
  index: number;
  id: string;
  section: string;
  path: string;
  title: string;
  lang: string;
}

export default async function AIPage() {
  const indexData = mdIndex.data as MdIndex[];
  return (
    <div className="flex flex-wrap gap-2 mx-auto items-center justify-center">
      {indexData.map((article) => (
        <Card
          key={article.id}
          className="min-w-[200px] hover:scale-105 transition-all bg-gradient-to-br from-slate-200 to-slate-900 text-white"
        >
          <CardContent>
            <Link href={`/etc/ai/${article.index}`}>
              <h2>{article.title}</h2>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
