import * as React from "react";
import { JsonViewer } from "@/components/json-viewer";
import Quizzer from "./quizzer";
import { IQuiz } from "@/types/lesson";
import { promises } from "fs";
import { Suspense } from "react";
import path from "path";

const dataPath = "src/lib/json/urdu/data/";
function constructFilePath(lessonID: string) {
  // check if id is exactly 3 digits long
  if (lessonID.length === 3) {
    // first char is the directory
    return `${dataPath}${lessonID[0]}/${lessonID}.json`;
  }

  // check if id is exactly 4 digits long
  if (lessonID.length === 4) {
    // first two chars are the directory
    let dir = `${lessonID[0]}${lessonID[1]}/`;
    // all
    let filename = lessonID;
    return `${dataPath}/${dir}${filename}.json`;
  } else return "un recognized id";
}

async function getLessonData(lessonID: string) {
  const filepath = constructFilePath(lessonID);
  const data = await promises.readFile(filepath, "utf-8");
  return JSON.parse(data);
}
export default async function Lesson({
  params,
}: {
  params: Promise<{ cid: string; lid: string }>;
}) {
  const { cid, lid } = await params;
  const filepath = path.join(process.cwd(), dataPath, `${lid}.json`);
  const data = await getLessonData(lid);
  // console.log("data", data.quizzes);
  // console.log("filepath", filepath);
  return (
    <div className=" ">
      <h1 className="text-2xl bg-blue-700 text-white px-2 py-1 rounded-lg">
        Lesson: {lid}
      </h1>
      <p>Full path: {filepath}</p>

      {/* <JsonViewer value={data} /> */}
      <Quizzer quizzes={data.quizzes} />
    </div>
  );
}
