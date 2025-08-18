"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export function ResultCard() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        Result Card
      </CardHeader>
      <CardContent>
        <div className="relative h-[500px] w-[400px] overflow-hidden ">
          <Image src="/screenshots/Statistics.png" alt="Review" fill />
        </div>
      </CardContent>
    </Card>
  );
}
