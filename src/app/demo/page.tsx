"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import quizData from "./d-samples.json";
import { QuizDItem } from "./definitions";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useQuizD } from "./use-quiz-d";
import { Badge, Keyboard, Mouse, PlayCircle } from "lucide-react";
import React from "react";
 import { TonePlayerButton } from "@/components/general/tone-button-player";
 import { useTune } from "@/hooks/use-tone";
 

const quiz = quizData[0] as QuizDItem;

export default function DemoPage() {
  
  return(
    <div>
      <h1>Quiz D</h1>
    </div>
  )
}
