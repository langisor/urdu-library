"use client"

import { JsonViewerComponent } from "@/components/json-viewer"
import {QuizFItem} from "./definitions"

import * as React from "react"

export function QuizF({quizItem}:{quizItem:QuizFItem}) {
  
   return (
    <JsonViewerComponent data={quizItem} />
   )
}


