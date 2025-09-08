import { queryClient } from "@/lib/postgres-client"
import { JsonViewerComponent } from "@/components/json-viewer";
import MainScreen from "./_components/screens/main-screen";


async function getQuizzes(lid: string) {
 const quizzesData = await queryClient`
  select * from "Quiz" where "lessonID"=${lid}
 `
 const paresedData: any[] = [];
 for (const q of quizzesData) {
  const data = JSON.parse(JSON.stringify(q.quizData));
  paresedData.push(data)
 }
 return paresedData;
}
export default async function DemoPage() {
 const quizzes = await getQuizzes('101');

 return (
  <div className="flex flex-col">
   <h1 className="text-2xl">Demo page</h1>
   <JsonViewerComponent data={quizzes} />
   <MainScreen quizzes={quizzes} />
  </div>

 )
}