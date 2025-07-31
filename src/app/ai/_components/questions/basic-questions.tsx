"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming shadcn/ui is installed and configured

// Helper component to render a table from an array of objects
const CustomTable = ({ headers, data }: { headers: string[]; data: any[] }) => {
  return (
    <div className="w-full mb-6 shadow-lg rounded-lg overflow-hidden">
      <Table className="naskh-arabic min-w-full bg-white dark:bg-gray-800 rounded-lg">
        <TableHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <TableRow>
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className="py-3 px-4 text-right font-semibold text-sm uppercase tracking-wider text-white"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row: any, rowIndex: number) => (
            <TableRow
              key={rowIndex}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              {Object.values(row).map((cell: any, cellIndex: number) => (
                <TableCell
                  key={cellIndex}
                  className="py-3 px-4 text-right text-gray-700 dark:text-gray-300"
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default function BasicQuestions() {
  const [showAnswers, setShowAnswers] = useState(false);

  const basicTools = [
    {
      urdu: "کیا",
      pronunciation: "kya",
      meaning: "ماذا / هل (للسؤال العام)",
    },
    { urdu: "کون", pronunciation: "kaun", meaning: "مَن" },
    { urdu: "کہاں", pronunciation: "kahan", meaning: "أين" },
    { urdu: "کیوں", pronunciation: "kyun", meaning: "لماذا" },
    { urdu: "کب", pronunciation: "kab", meaning: "متى" },
    { urdu: "کیسے", pronunciation: "kaise", meaning: "كيف" },
    { urdu: "کتنا", pronunciation: "kitna", meaning: "كم (للكمية أو العدد)" },
    {
      urdu: "کس لیے",
      pronunciation: "kis liye",
      meaning: "لماذا (لأي سبب) / من أجل مَن",
    },
  ];

  const additionalExamples = [
    {
      urdu: "یہ کس کی کار ہے؟",
      pronunciation: "Yeh kis ki car hai?",
      translation: "لمَن هذه السيارة؟",
    },
    {
      urdu: "تمہارا نام کیا ہے؟",
      pronunciation: "Tumhara naam kya hai?",
      translation: "ما اسمك؟",
    },
    {
      urdu: "کتاب کہاں ہے؟",
      pronunciation: "Kitab kahan hai?",
      translation: "أين الكتاب؟",
    },
    {
      urdu: "کام کیسے کریں؟",
      pronunciation: "Kaam kaise karein?",
      translation: "كيف نعمل؟",
    },
    {
      urdu: "یہ کتنا وقت لے گا؟",
      pronunciation: "Yeh kitna waqt lega?",
      translation: "كم من الوقت سيأخذ هذا؟",
    },
  ];

  const exercises = [
    {
      arabic: "متى ستبدأ الحفلة؟",
      answer: "پارٹی کب شروع ہوگی؟ (Party kab shuru hogi?)",
    },
    {
      arabic: "كم تكلف هذه القميص؟",
      answer: "یہ قمیض کتنی ہے؟ (Yeh qameez kitni hai?)",
    },
    {
      arabic: "لماذا أنت غاضب؟",
      answer: "تم کیوں ناراض ہو؟ (Tum kyun naraz ho?)",
    },
  ];

  return (
    <div className="w-full naskh-arabic-bold h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-inter p-6 flex flex-col">
      <div className=" w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 sm:p-10">
        <h1 className="naskh-arabic text-4xl sm:text-5xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-8 leading-tight">
          أدوات الاستفهام في اللغة الأردية
        </h1>
        <p className="naskh-arabic text-lg text-center mb-10 text-gray-600 dark:text-gray-300">
          شرح تفصيلي عن كيفية استخدام أدوات الاستفهام الأساسية في اللغة الأردية
          مع أمثلة.
        </p>

        {/* Section: Basic Question Tools */}
        <section className="mb-12">
          <h2 className="naskh-arabic text-3xl font-bold text-blue-600 dark:text-blue-300 mb-6 border-b-2 border-blue-300 dark:border-blue-600 pb-2">
            1. أدوات الاستفهام الأساسية
          </h2>
          <p className="naskh-arabic text-gray-700 dark:text-gray-300 mb-4">
            في الجدول التالي أشهر أدوات الاستفهام مع استخداماتها:
          </p>
          <CustomTable
            headers={["الأداة بالأردية", "النطق", "المعنى"]}
            data={basicTools}
          />
        </section>

        {/* Section: Usage with Examples */}
        <section className="mb-12">
          <h2 className="naskh-arabic text-3xl font-bold text-blue-600 dark:text-blue-300 mb-6 border-b-2 border-blue-300 dark:border-blue-600 pb-2">
            2. استخدام كل أداة مع أمثلة
          </h2>

          {/* Kya */}
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md">
            <h3 className="naskh-arabic text-2xl font-semibold text-blue-700 dark:text-blue-200 mb-3">
              أ. کیا (Kya) → &quot;ماذا / هل&quot;
            </h3>
            <p className="naskh-arabic text-gray-700 dark:text-gray-300 mb-2">
              تُستخدم لطرح أسئلة عامة (نعم/لا) أو لاستفسار عن شيء محدد.
            </p>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>
                <strong className="naskh-arabic text-blue-800 dark:text-blue-100">
                  کیا آپ کو پانی چاہیے؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Kya aap ko pani chahiye?)
                </span>{" "}
                - &quot;هل تحتاج ماءً؟&quot;
              </li>
              <li>
                <strong className="naskh-arabic text-blue-800 dark:text-blue-100">
                  کیا یہ تمہاری کتاب ہے؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Kya yeh tumhari kitab hai?)
                </span>{" "}
                - &quot;هل هذا كتابك؟&quot;
              </li>
            </ul>
          </div>

          {/* Kaun */}
          <div className="mb-8 p-6 bg-purple-50 dark:bg-purple-900 rounded-lg shadow-md">
            <h3 className="naskh-arabic text-2xl font-semibold text-purple-700 dark:text-purple-200 mb-3">
              ب. کون (Kaun) → &quot;مَن&quot;
            </h3>
            <p className="naskh-arabic text-gray-700 dark:text-gray-300 mb-2">
              للسؤال عن الأشخاص (مفرد/جمع).
            </p>
            <p className="naskh-arabic text-gray-700 dark:text-gray-300 mb-2 font-medium">
              ملاحظة: تتغير حسب الجنس في بعض الحالات:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>
                <strong className="naskh-arabic text-purple-800 dark:text-purple-100">
                  کون سی
                </strong>{" "}
                (kaun si) → &quot;أي&quot; (لمؤنث).
              </li>
            </ul>

            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>
                <strong className="naskh-arabic text-purple-800 dark:text-purple-100">
                  کون آیا ہے؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Kaun aaya hai?)
                </span>{" "}
                - &quot;مَن جاء؟&quot; (مذكر).
              </li>
              <li>
                <strong className="naskh-arabic text-purple-800 dark:text-purple-100">
                  کون سی کتاب چاہیے؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Kaun si kitab chahiye?)
                </span>{" "}
                - &quot;أي كتاب تريد؟&quot; (مؤنث).
              </li>
            </ul>
          </div>

          {/* Kahan */}
          <div className="mb-8 p-6 bg-green-50 dark:bg-green-900 rounded-lg shadow-md">
            <h3 className="naskh-arabic text-2xl font-semibold text-green-700 dark:text-green-200 mb-3">
              ج. کہاں (Kahan) → &quot;أين&quot;
            </h3>
            <p className="naskh-arabic text-gray-700 dark:text-gray-300 mb-2">
              للسؤال عن المكان.
            </p>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>
                <strong className="naskh-arabic text-green-800 dark:text-green-100">
                  آپ کہاں رہتے ہیں؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Aap kahan rehte hain?)
                </span>{" "}
                - &quot;أين تسكن؟&quot;
              </li>
              <li>
                <strong className="naskh-arabic text-green-800 dark:text-green-100">
                  ٹوائلٹ کہاں ہے؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Toilet kahan hai?)
                </span>{" "}
                - &quot;أين الحمام؟&quot;
              </li>
            </ul>
          </div>

          {/* Kyun */}
          <div className="mb-8 p-6 bg-red-50 dark:bg-red-900 rounded-lg shadow-md">
            <h3 className="naskh-arabic text-2xl font-semibold text-red-700 dark:text-red-200 mb-3">
              د. کیوں (Kyun) → &quot;لماذا&quot;
            </h3>
            <p className="naskh-arabic text-gray-700 dark:text-gray-300 mb-2">
              للسؤال عن السبب.
            </p>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>
                <strong className="naskh-arabic text-red-800 dark:text-red-100">
                  تم کیوں رو رہے ہو؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Tum kyun ro rahe ho?)
                </span>{" "}
                - &quot;لماذا تبكي؟&quot;
              </li>
              <li>
                <strong className="naskh-arabic text-red-800 dark:text-red-100">
                  یہ کیوں ہوا؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Yeh kyun hua?)
                </span>{" "}
                - &quot;لماذا حدث هذا؟&quot;
              </li>
            </ul>
          </div>

          {/* Kab */}
          <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900 rounded-lg shadow-md">
            <h3 className="naskh-arabic text-2xl font-semibold text-yellow-700 dark:text-yellow-200 mb-3">
              ه. کب (Kab) → &quot;متى&quot;
            </h3>
            <p className="naskh-arabic text-gray-700 dark:text-gray-300 mb-2">
              للسؤال عن الزمان.
            </p>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>
                <strong className="naskh-arabic text-yellow-800 dark:text-yellow-100">
                  ٹرین کب آئے گی؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Train kab aaye gi?)
                </span>{" "}
                - &quot;متى سيأتي القطار؟&quot;
              </li>
              <li>
                <strong className="naskh-arabic text-yellow-800 dark:text-yellow-100">
                  تم کب آؤ گے؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Tum kab aaoge?)
                </span>{" "}
                - &quot;متى ستأتي؟&quot;
              </li>
            </ul>
          </div>

          {/* Kaise */}
          <div className="mb-8 p-6 bg-indigo-50 dark:bg-indigo-900 rounded-lg shadow-md">
            <h3 className="naskh-arabic text-2xl font-semibold text-indigo-700 dark:text-indigo-200 mb-3">
              و. کیسے (Kaise) → &quot;كيف&quot; 
            </h3>
            <p className="naskh-arabic text-gray-700 dark:text-gray-300 mb-2">
              للسؤال عن الحالة أو الطريقة.
            </p>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>
                <strong className="naskh-arabic text-indigo-800 dark:text-indigo-100">
                  آپ کیسے ہیں؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Aap kaise hain?)
                </span>{" "}
                - &quot;كيف حالك؟&quot;
              </li>
              <li>
                <strong className="naskh-arabic text-indigo-800 dark:text-indigo-100">
                  یہ کیسے کام کرتا ہے؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Yeh kaise kaam karta hai?)
                </span>{" "}
                - &quot;كيف يعمل هذا؟&quot;
              </li>
            </ul>
          </div>

          {/* Kitna */}
          <div className="mb-8 p-6 bg-teal-50 dark:bg-teal-900 rounded-lg shadow-md">
            <h3 className="naskh-arabic text-2xl font-semibold text-teal-700 dark:text-teal-200 mb-3">
              ز. کتنا (Kitna) → &quot;كم&quot;
            </h3>
            <p className="naskh-arabic text-gray-700 dark:text-gray-300 mb-2">
              للسؤال عن الكمية أو العدد.
            </p>
            <p className="naskh-arabic text-gray-700 dark:text-gray-300 mb-2 font-medium">
              ملاحظة: تتغير حسب الجنس:
              <ul className="list-disc list-inside ml-4">
                <li>
                  <strong className="naskh-arabic text-teal-800 dark:text-teal-100">
                    کتنا
                  </strong>{" "}
                  (masc.) /{" "}
                  <strong className="naskh-arabic text-teal-800 dark:text-teal-100">
                    کتی
                  </strong>{" "}
                  (fem.) /{" "}
                  <strong className="naskh-arabic text-teal-800 dark:text-teal-100">
                    کتنی
                  </strong>{" "}
                  (fem. جمع).
                </li>
              </ul>
            </p>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>
                <strong className="naskh-arabic text-teal-800 dark:text-teal-100">
                  کتنا پیسہ چاہیے؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Kitna paisa chahiye?)
                </span>{" "}
                - &quot;كم من المال تحتاج؟&quot; (مذكر).
              </li>
              <li>
                <strong className="naskh-arabic text-teal-800 dark:text-teal-100">
                  کتی کتابیں ہیں؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Kiti kitabein hain?)
                </span>{" "}
                - &quot;كم عدد الكتب؟&quot; (مؤنث).
              </li>
            </ul>
          </div>

          {/* Kis Liye */}
          <div className="mb-8 p-6 bg-orange-50 dark:bg-orange-900 rounded-lg shadow-md">
            <h3 className="naskh-arabic text-2xl font-semibold text-orange-700 dark:text-orange-200 mb-3">
              ح. کس لیے (Kis Liye) → &quot;لماذا / من أجل مَن&quot;  
            </h3>
            <p className="naskh-arabic text-gray-700 dark:text-gray-300 mb-2">
              للسؤال عن الهدف أو السبب.
            </p>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>
                <strong className="naskh-arabic text-orange-800 dark:text-orange-100">
                  تم یہ کس لیے کر رہے ہو؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Tum yeh kis liye kar rahe ho?)
                </span>{" "}
                - &quot;لماذا تفعل هذا؟&quot;
              </li>
              <li>
                <strong className="naskh-arabic text-orange-800 dark:text-orange-100">
                  یہ تحفہ کس لیے ہے؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Yeh tohfa kis liye hai?)
                </span>{" "}
                - &quot;هذه الهدية من أجل مَن؟&quot;
              </li>
            </ul>
          </div>
        </section>

        {/* Section: Important Rules */}
        <section className="mb-12">
          <h2 className="naskh-arabic text-3xl font-bold text-blue-600 dark:text-blue-300 mb-6 border-b-2 border-blue-300 dark:border-blue-600 pb-2">
            3. قواعد هامة
          </h2>
          <ul className="list-none space-y-4 text-gray-700 dark:text-gray-300">
            <li className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
              <h4 className="naskh-arabic text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                أ. ترتيب الجملة الاستفهامية
              </h4>
              <p>
                التركيب العام:{" "}
                <strong className="text-blue-700 dark:text-blue-300">
                  أداة الاستفهام + الفاعل + الفعل
                </strong>
                .
              </p>
              <p className="mt-1">
                مثال:{" "}
                <strong className="text-blue-700 dark:text-blue-300">
                  کون آیا؟
                </strong>{" "}
                (Kaun aaya?) → &quot;مَن جاء؟&quot;
              </p>
            </li>
            <li className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
              <h4 className="naskh-arabic text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                ب. استخدام &quot;کیا&quot; لأسئلة (نعم/لا)
              </h4>
              <p>
                تُوضع{" "}
                <strong className="naskh-arabic text-blue-700 dark:text-blue-300">
                  کیا
                </strong>{" "}
                في بداية الجملة:
              </p>
              <p className="mt-1">
                مثال:{" "}
                <strong className="naskh-arabic text-blue-700 dark:text-blue-300">
                  کیا تم نے کھانا کھایا؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Kya tum ne khana khaya?)
                </span>{" "}
                → &quot;هل أكلتَ الطعام؟&quot;.
              </p>
            </li>
            <li className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
              <h4 className="naskh-arabic text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                ج. التطابق بين الأداة والجنس
              </h4>
              <p>
                <strong className="naskh-arabic text-blue-700 dark:text-blue-300">
                  کون
                </strong>{" "}
                →{" "}
                <strong className="naskh-arabic text-blue-700 dark:text-blue-300">
                  کون سی
                </strong>{" "}
                (للمؤنث):
              </p>
              <p className="mt-1">
                مثال:{" "}
                <strong className="naskh-arabic text-blue-700 dark:text-blue-300">
                  کون سی فلم اچھی ہے؟
                </strong>{" "}
                <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                  (Kaun si film achi hai?)
                </span>{" "}
                → &quot;أي فيلم جيد؟&quot;.
              </p>
            </li>
            <li className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
              <h4 className="naskh-arabic text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                د. أدوات الاستفهام مع حروف الجر
              </h4>
              <p>تُضاف حروف الجر بعد الأداة:</p>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>
                  <strong className="naskh-arabic text-blue-700 dark:text-blue-300">
                    کہاں تک؟
                  </strong>{" "}
                  <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                    (Kahan tak?)
                  </span>{" "}
                  → &quot;إلى أين؟&quot;.
                </li>
                <li>
                  <strong className="naskh-arabic text-blue-700 dark:text-blue-300">
                    کس کے ساتھ؟
                  </strong>{" "}
                  <span className="phonetic text-sm text-gray-600 dark:text-gray-400">
                    (Kis ke saath?)
                  </span>{" "}
                  → &quot;مع مَن؟&quot;.
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Section: Additional Examples */}
        <section className="mb-12">
          <h2 className="naskh-arabic text-3xl font-bold text-blue-600 dark:text-blue-300 mb-6 border-b-2 border-blue-300 dark:border-blue-600 pb-2">
            4. أمثلة إضافية في جمل
          </h2>
          <CustomTable
            headers={["الجملة بالأردية", "النطق", "الترجمة العربية"]}
            data={additionalExamples}
          />
        </section>

        {/* Section: Exercises */}
        <section className="mb-12">
          <h2 className="naskh-arabic text-3xl font-bold text-blue-600 dark:text-blue-300 mb-6 border-b-2 border-blue-300 dark:border-blue-600 pb-2">
            5. تمارين تطبيقية
          </h2>
          <p className="naskh-arabic text-gray-700 dark:text-gray-300 mb-4">
            <strong className="naskh-arabic text-blue-700 dark:text-blue-300">
              حول الأسئلة التالية إلى الأردية:
            </strong>
          </p>
          <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
            {exercises.map((exercise, index) => (
              <li key={index} className="naskh-arabic">
                &quot;{exercise.arabic}&quot; →{" "}
                {showAnswers ? (
                  <span className="font-semibold text-green-700 dark:text-green-300">
                    {exercise.answer}
                  </span>
                ) : (
                  "____________________"
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            {showAnswers ? "إخفاء الإجابات" : "إظهار الإجابات"}
          </button>
        </section>

        {/* Section: Quick Summary */}
        <section className="mb-8">
          <h2 className="naskh-arabic text-3xl font-bold text-blue-600 dark:text-blue-300 mb-6 border-b-2 border-blue-300 dark:border-blue-600 pb-2">
            6. ملخص سريع
          </h2>
          <ul className="list-disc list-inside naskh-arabic text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              كل أداة استفهام تُستخدم حسب{" "}
              <strong className="naskh-arabic text-blue-700 dark:text-blue-300">
                نوع المعلومة
              </strong>{" "}
              المطلوبة (زمان، مكان، سبب، إلخ).
            </li>
            <li>
              الترتيب:{" "}
              <strong className="naskh-arabic text-blue-700 dark:text-blue-300">
                أداة الاستفهام → الفاعل → الفعل
              </strong>
              .
            </li>
            <li>
              تطابق الجنس مهم في أدوات مثل{" "}
              <strong className="naskh-arabic text-blue-700 dark:text-blue-300">
                کون
              </strong>{" "}
              و{" "}
              <strong className="naskh-arabic text-blue-700 dark:text-blue-300">
                کتنا
              </strong>
              .
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
