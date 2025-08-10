"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

export function ResultCard() {
  return (
    <Card className="w-full h-full">
      <CardContent>
        <div className="relative">
          <Image src="/screenshots/WordsReview.png" alt="Review" fill />
        </div>
      </CardContent>
    </Card>
  );
}
