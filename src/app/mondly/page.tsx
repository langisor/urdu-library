import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
export default function HomePage() {
  return (
    <Card className="flex flex-col  items-center justify-center gap-4">
      <Link href="/mondly/category" className="hover:bg-gray-100 p-2">
        <Button>إستعراض الأقسام</Button>
      </Link>
      <Link href="/mondly/category/allverbs" className="hover:bg-gray-100 p-2">
        <Button>جدول الأفعال</Button>
      </Link>
    </Card>
  );
}
