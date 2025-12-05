import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StatsPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <Link href="/stats/items">
            <Button>Items</Button>
          </Link>

          <h1 className="italic">Add states and other features</h1>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
