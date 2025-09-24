"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LoadingStep {
  id: string
  message: string
  duration: number // in milliseconds
}

interface FakeSuspenseLoaderProps {
  isLoading: boolean
  steps: LoadingStep[]
  onComplete?: () => void
  className?: string
  backdropClassName?: string
}

export function FakeSuspenseLoader({
  isLoading,
  steps,
  onComplete,
  className,
  backdropClassName,
}: FakeSuspenseLoaderProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isLoading) {
      // Reset state when not loading
      setCurrentStepIndex(0)
      setCompletedSteps(new Set())
      setProgress(0)
      return
    }

    if (currentStepIndex >= steps.length) {
      // All steps completed
      onComplete?.()
      return
    }

    const currentStep = steps[currentStepIndex]

    // Simulate step progress
    const timer = setTimeout(() => {
      setCompletedSteps((prev) => new Set([...prev, currentStep.id]))
      setCurrentStepIndex((prev) => prev + 1)
      setProgress(((currentStepIndex + 1) / steps.length) * 100)
    }, currentStep.duration)

    return () => clearTimeout(timer)
  }, [isLoading, currentStepIndex, steps, onComplete])

  if (!isLoading) return null

  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center", backdropClassName)}>
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Loading card */}
      <Card className={cn("relative w-full max-w-md mx-4 p-6 shadow-lg", className)}>
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Loading...</h3>
            <p className="text-sm text-muted-foreground mt-1">Please wait while we process your request</p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Steps list */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.has(step.id)
              const isCurrent = index === currentStepIndex
              const isPending = index > currentStepIndex

              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md transition-colors",
                    isCurrent && "bg-primary/10",
                    isCompleted && "bg-muted/50",
                  )}
                >
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : isCurrent ? (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      isCompleted && "text-muted-foreground line-through",
                      isCurrent && "text-foreground font-medium",
                      isPending && "text-muted-foreground",
                    )}
                  >
                    {step.message}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Current step indicator */}
          {currentStepIndex < steps.length && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Step {currentStepIndex + 1} of {steps.length}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
