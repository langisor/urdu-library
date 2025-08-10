"use client";
import * as React from "react";
import BasicQuestions from "./basic-questions";

export default function Questions() {
  return (
    <div className="w-full p-4 naskh-arabic flex flex-col">
      <h1 className="inter-bold text-3xl">
        Questions{" "}
        <span className="naskh-arabic-bold text-3xl">(أدوات الإستفهام)</span>
      </h1>
      <BasicQuestions />
    </div>
  );
}
