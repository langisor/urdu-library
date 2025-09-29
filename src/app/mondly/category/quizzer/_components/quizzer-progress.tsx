"use client";
import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
interface Props {
  totalSteps: number;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  restart: () => void;
  steps?: string[];
}
export default function QuizzerProgress({
  totalSteps,
  currentStep,
  nextStep,
  prevStep,
  restart,
  steps = [],
}: Props) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  console.log("QuizzerProgress....")
  return (
    <Card className="px-2 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="">{steps[currentStep - 1]}</span>
        </div>
        <Progress
          value={progress}
          className="w-full   h-4   bg-gradient-to-b from-primary to-primary/40  text-blue-600"
        />

        <div className="flex justify-between">
          {/* previous */}
          <Button
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          {/* restart */}
          <Button
            size="sm"
            onClick={restart}
            disabled={currentStep < 2}
          >
            <RotateCcw className="mr-1 h-4 w-4" />
            Restart
          </Button>

          {/* next */}
          <Button
            size="sm"
            onClick={nextStep}
            disabled={currentStep === totalSteps}
          >
            <ChevronRight className="ml-1 h-4 w-4" />
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
