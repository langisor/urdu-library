"use client";
import { JsonViewerComponent } from "@/components/json-viewer";
import { useHookstate, hookstate } from "@hookstate/core";
import * as React from "react";

 export const mainScreenStore = hookstate({
    currentQuizIndex: 0,
    totalQuizzes: 0,
    isComplete: false,
    score: 0,

});

 