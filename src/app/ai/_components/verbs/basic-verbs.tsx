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
import "./basic-verbs.css";
// Helper component to render a table from an array of objects
const CustomTable = ({ headers, data }: { headers: string[]; data: any[] }) => (
  <div className="mb-6 shadow-lg rounded-lg overflow-hidden">
    <Table className="min-w-full naskh-arabic  bg-white dark:bg-gray-800 rounded-lg">
      <TableHeader className="bg-gradient-to-r from-teal-500 to-green-600 text-white">
        <TableRow>
          {headers.map((header: string, index: number) => (
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

const BasicVerbs = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const presentTenseSimple = [
    {
      pronoun: "میں (أنا)",
      masculineSingular: "کھاتا ہوں (khata hoon)",
      feminineSingular: "کھاتی ہوں (khati hoon)",
      plural: "—",
    },
    {
      pronoun: "تم (أنت informal)",
      masculineSingular: "کھاتے ہو (khate ho)",
      feminineSingular: "کھاتی ہو (khati ho)",
      plural: "—",
    },
    {
      pronoun: "آپ (أنت formal)",
      masculineSingular: "کھاتے ہیں (khate hain)",
      feminineSingular: "—",
      plural: "—",
    },
    {
      pronoun: "وہ (هو/هي)",
      masculineSingular: "کھاتا ہے (khata hai)",
      feminineSingular: "کھاتی ہے (khati hai)",
      plural: "کھاتے ہیں (khate hain)",
    },
  ];

  const pastTenseSimple = [
    {
      pronoun: "میں",
      masculineSingular: "کھایا (khaya)",
      feminineSingular: "کھائی (khayi)",
      plural: "—",
    },
    {
      pronoun: "تم",
      masculineSingular: "کھایا (khaya)",
      feminineSingular: "کھائی (khayi)",
      plural: "—",
    },
    {
      pronoun: "وہ",
      masculineSingular: "کھایا (khaya)",
      feminineSingular: "کھائی (khayi)",
      plural: "کھائے (khaye)",
    },
  ];

  const futureTense = [
    {
      pronoun: "میں",
      masculineSingular: "کھاؤں گا (khaunga)",
      feminineSingular: "کھاؤں گی (khaungi)",
      plural: "—",
    },
    {
      pronoun: "تم",
      masculineSingular: "کھاؤ گے (khao ge)",
      feminineSingular: "کھاؤ گی (khao gi)",
      plural: "—",
    },
    {
      pronoun: "وہ",
      masculineSingular: "کھائے گا (khayega)",
      feminineSingular: "کھائے گی (khayegi)",
      plural: "کھائیں گے (khayenge)",
    },
  ];

  const comprehensiveExamples = [
    {
      tense: "حاضر",
      urduSentence: "وہ گانا گاتی ہے۔",
      translation: "هي تغني.",
    },
    {
      tense: "ماضي",
      urduSentence: "ہم نے فلم دیکھی۔",
      translation: "شاهدنا فيلمًا.",
    },
    {
      tense: "مستقبل",
      urduSentence: "تم کل آؤ گے۔",
      translation: "ستأتي غدًا.",
    },
    { tense: "أمر", urduSentence: "خاموش رہو!", translation: "اصمت!" },
  ];

  const exercises = [
    {
      arabic: "سأسافر غدًا.",
      answer: "میں کل سفر کروں گا۔ (Main kal safar karunga.)",
    },
    {
      arabic: "كانوا يلعبون.",
      answer: "وہ کھیل رہے تھے۔ (Woh khel rahe the.)",
    },
    {
      arabic: "لا تأكل هذا! (رسمي)",
      answer: "یہ مت کھائیے! (Yeh mat khaiye!)",
    },
  ];

  return (
    <div className="naskh-arabic min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-inter p-6 sm:p-10 flex flex-col">
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 sm:p-10">
        <h1 className="font-extrabold text-center text-teal-700 dark:text-teal-400 mb-8 leading-tight">
          الأفعال في اللغة الأردية
        </h1>
        <p className="text-center mb-10 text-gray-600 dark:text-gray-300">
          شرح تفصيلي عن أنواع وتصريف الأفعال في اللغة الأردية مع أمثلة وقواعد
          هامة.
        </p>

        {/* Section: Types of Verbs */}
        <section className="mb-12">
          <h2 className="font-bold text-teal-600 dark:text-teal-300 mb-6 border-b-2 border-teal-300 dark:border-teal-600 pb-2">
            1. أنواع الأفعال
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            تنقسم الأفعال في الأردية إلى:
          </p>
          <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
            <li>
              <strong className="text-teal-800 dark:text-teal-100">
                الفعل الرئيسي
                <span className="text-gray-600 dark:text-gray-300">
                  (Main Verb)
                </span>
              </strong>
              : مثل{" "}
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                کھانا
              </strong>
              <span className="text-gray-600 dark:text-gray-300">(أكل)</span>,{" "}
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                پڑھنا
              </strong>
              <span className="text-gray-600 dark:text-gray-300">(قراءة)</span>.
            </li>
            <li>
              <strong className="text-teal-800 dark:text-teal-100">
                الفعل المساعد (Auxiliary Verb)
              </strong>
              : مثل{" "}
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                ہونا
              </strong>
              <span className="text-gray-600 dark:text-gray-300">(يكون)</span>,{" "}
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                چاہیے
              </strong>
              <span className="text-gray-600 dark:text-gray-300">(يجب)</span>.
            </li>
          </ul>
        </section>

        {/* Section: Verb Conjugation */}
        <section className="mb-12">
          <h2 className="font-bold text-teal-600 dark:text-teal-300 mb-6 border-b-2 border-teal-300 dark:border-teal-600 pb-2">
            2. تصريف الأفعال (الفعل الرئيسي)
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            الأفعال في الأردية{" "}
            <strong className="text-teal-700 dark:text-teal-300">
              تتغير حسب
            </strong>
            :
          </p>
          <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
            <li>
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                الزمن
              </strong>
              <span className="text-gray-600 dark:text-gray-300">
                (ماضي، حاضر، مستقبل).
              </span>
            </li>
            <li>
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                الجنس
              </strong>
              <span className="text-gray-600 dark:text-gray-300">
                (مذكر/مؤنث).
              </span>
            </li>
            <li>
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                العدد
              </strong>
              <span className="text-gray-600 dark:text-gray-300">
                (مفرد/جمع).
              </span>
            </li>
            <li>
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                مستوى الاحترام
              </strong>
              <span className="text-gray-600 dark:text-gray-300">
                (رسمي/غير رسمي).
              </span>
            </li>
          </ul>
        </section>

        {/* Section: Present Tense */}
        <section className="mb-12">
          <h2 className="font-bold text-teal-600 dark:text-teal-300 mb-6 border-b-2 border-teal-300 dark:border-teal-600 pb-2">
            3. الزمن الحاضر (Present Tense)
          </h2>

          {/* Simple Present */}
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md">
            <h3 className="font-semibold text-blue-700 dark:text-blue-200 mb-3">
              أ. الفعل البسيط{" "}
              <span className="text-gray-600 dark:text-gray-300">
                (Simple Present)
              </span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong className="text-blue-700 dark:text-blue-300 mx-2">
                صيغة التصريف
              </strong>
              : جذر الفعل +{" "}
              <strong className="text-blue-700 dark:text-blue-300 mx-2">
                تا/تی/تے
              </strong>{" "}
              <span className="text-gray-600 dark:text-gray-300">
                (حسب الجنس والعدد).
              </span>
            </p>
            <CustomTable
              headers={[
                "الضمير",
                "المذكر (مفرد)",
                "المؤنث (مفرد)",
                "الجمع (لكلا الجنسين)",
              ]}
              data={presentTenseSimple}
            />
            <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
              أمثلة:
            </p>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>
                <strong className="text-blue-800 dark:text-blue-100">
                  میں پڑھتا ہوں
                </strong>{" "}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  (Main parhta hoon)
                </span>{" "}
                = "أنا أقرأ" (مذكر).
              </li>
              <li>
                <strong className="text-blue-800 dark:text-blue-100">
                  وہ کھاتی ہے
                </strong>{" "}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  (Woh khati hai)
                </span>{" "}
                = "هي تأكل".
              </li>
            </ul>
          </div>

          {/* Present Continuous */}
          <div className="mb-8 p-6 bg-purple-50 dark:bg-purple-900 rounded-lg shadow-md">
            <h3 className="font-semibold text-purple-700 dark:text-purple-200 mb-3">
              ب. المضارع المستمر{" "}
              <span className="text-gray-600 dark:text-gray-300">
                (Present Continuous)
              </span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong className="text-purple-700 dark:text-purple-300 mx-2">
                صيغة التصريف
              </strong>
              : مصدر الفعل (بدون `&quot;`نا`&quot;`) +{" "}
              <strong className="text-purple-700 dark:text-purple-300 mx-2">
                رہا/رہی/رہے
              </strong>{" "}
              +{" "}
              <strong className="text-purple-700 dark:text-purple-300 mx-2">
                ہونا
              </strong>
              .
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
              أمثلة:
            </p>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>
                <strong className="text-purple-800 dark:text-purple-100">
                  میں کھا رہا ہوں
                </strong>{" "}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  (Main kha raha hoon)
                </span>{" "}
                = &quot;أنا آكل الآن&quot; (مذكر).
              </li>
              <li>
                <strong className="text-purple-800 dark:text-purple-100">
                  وہ پڑھ رہی ہے
                </strong>{" "}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  (Woh parh rahi hai)
                </span>{" "}
                = &quot;هي تقرأ الآن&quot;.
              </li>
            </ul>
          </div>
        </section>

        {/* Section: Past Tense */}
        <section className="mb-12">
          <h2 className="font-bold text-teal-600 dark:text-teal-300 mb-6 border-b-2 border-teal-300 dark:border-teal-600 pb-2">
            4. الزمن الماضي (Past Tense)
          </h2>

          {/* Simple Past */}
          <div className="mb-8 p-6 bg-green-50 dark:bg-green-900 rounded-lg shadow-md">
            <h3 className="font-semibold text-green-700 dark:text-green-200 mb-3">
              أ. الماضي البسيط{" "}
              <span className="text-gray-600 dark:text-gray-300">
                (Simple Past)
              </span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong className="text-green-700 dark:text-green-300 mx-2">
                صيغة التصريف
              </strong>
              : جذر الفعل +{" "}
              <strong className="text-green-700 dark:text-green-300 mx-2">
                یا/ی/یے
              </strong>{" "}
              (حسب الجنس والعدد).
            </p>
            <CustomTable
              headers={["الضمير", "المذكر (مفرد)", "المؤنث (مفرد)", "الجمع"]}
              data={pastTenseSimple}
            />
            <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
              أمثلة:
            </p>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>
                <strong className="text-green-800 dark:text-green-100">
                  میں نے کھایا
                </strong>{" "}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  (Main ne khaya)
                </span>{" "}
                = &quot;أكلتُ&quot; (مذكر).
              </li>
              <li>
                <strong className="text-green-800 dark:text-green-100">
                  اس نے پڑھا
                </strong>{" "}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  (Us ne parha)
                </span>{" "}
                = &quot;هو قرأ&quot;.
              </li>
            </ul>
          </div>

          {/* Past Continuous */}
          <div className="mb-8 p-6 bg-red-50 dark:bg-red-900 rounded-lg shadow-md">
            <h3 className="font-semibold text-red-700 dark:text-red-200 mb-3">
              ب. الماضي المستمر{" "}
              <span className="text-gray-600 dark:text-gray-300">
                (Past Continuous)
              </span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong className="text-red-700 dark:text-red-300 mx-2">
                صيغة التصريف
              </strong>
              : مصدر الفعل (بدون "نا") +{" "}
              <strong className="text-red-700 dark:text-red-300 mx-2">
                رہا/رہی/رہے تھا
              </strong>
              .
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
              أمثلة:
            </p>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>
                <strong className="text-red-800 dark:text-red-100 mx-2">
                  میں پڑھ رہا تھا
                </strong>{" "}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  (Main parh raha tha)
                </span>{" "}
                = &quot;كنتُ أقرأ&quot; (مذكر).
              </li>
              <li>
                <strong className="text-red-800 dark:text-red-100 mx-2">
                  وہ سورہی تھی
                </strong>{" "}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  (Woh so rahi thi)
                </span>{" "}
                = &quot;كانت نائمة&quot;.
              </li>
            </ul>
          </div>
        </section>

        {/* Section: Future Tense */}
        <section className="mb-12">
          <h2 className="font-bold text-teal-600 dark:text-teal-300 mb-6 border-b-2 border-teal-300 dark:border-teal-600 pb-2">
            5. الزمن المستقبل{" "}
            <span className="text-gray-600 dark:text-gray-300">
              (Future Tense)
            </span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong className="text-teal-700 dark:text-teal-300">
              صيغة التصريف
            </strong>
            : مصدر الفعل (بدون "نا") +{" "}
            <strong className="text-teal-700 dark:text-teal-300">
              وں گا/وگی/یں گے
            </strong>{" "}
            (حسب الجنس والعدد).
          </p>
          <CustomTable
            headers={["الضمير", "المذكر (مفرد)", "المؤنث (مفرد)", "الجمع"]}
            data={futureTense}
          />
          <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
            أمثلة:
          </p>
          <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
            <li>
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                میں پڑھوں گا
              </strong>{" "}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                (Main parhunga)
              </span>{" "}
              = &quot;سأقرأ&quot; (مذكر).
            </li>
            <li>
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                وہ آئے گی
              </strong>{" "}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                (Woh aayegi)
              </span>{" "}
              = &quot;ستأتي&quot;.
            </li>
          </ul>
        </section>

        {/* Section: Imperative Mood */}
        <section className="mb-12">
          <h2 className="font-bold text-teal-600 dark:text-teal-300 mb-6 border-b-2 border-teal-300 dark:border-teal-600 pb-2">
            6. الأمر{" "}
            <span className="text-gray-600 dark:text-gray-300">
              (Imperative Mood)
            </span>
          </h2>
          <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
            <li>
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                غير رسمي
              </strong>
              : جذر الفعل +{" "}
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                ـو
              </strong>{" "}
              (للمخاطب المفرد).
              <ul className="list-circle list-inside ml-4">
                <li>
                  <strong className="text-teal-800 dark:text-teal-100 mx-2">
                    کھاؤ
                  </strong>{" "}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    (Khao)
                  </span>{" "}
                  = &quot;كُل!&quot;
                </li>
              </ul>
            </li>
            <li>
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                رسمي
              </strong>
              : جذر الفعل +{" "}
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                ـئیے
              </strong>{" "}
              (للمخاطب الجمع/الرسمي).
              <ul className="list-circle list-inside ml-4">
                <li>
                  <strong className="text-teal-800 dark:text-teal-100 mx-2">
                    پڑھئیے
                  </strong>{" "}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    (Parhiye)
                  </span>{" "}
                  = &quot;اقرأوا!&quot;
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Section: Auxiliary Verbs */}
        <section className="mb-12">
          <h2 className="font-bold text-teal-600 dark:text-teal-300 mb-6 border-b-2 border-teal-300 dark:border-teal-600 pb-2">
            7. الأفعال المساعدة{" "}
            <span className="text-gray-600 dark:text-gray-300">
              (Auxiliary Verbs)
            </span>
          </h2>
          <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
            <li>
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                ہونا
              </strong>{" "}
              (Hona) = &quot;يكون&quot;:
              <ul className="list-circle list-inside ml-4">
                <li>
                  <strong className="text-teal-800 dark:text-teal-100 mx-2">
                    میں ہوں
                  </strong>{" "}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    (Main hoon)
                  </span>{" "}
                  = &quot;أنا أكون&quot;.
                </li>
              </ul>
            </li>
            <li>
              <strong className="text-teal-800 dark:text-teal-100 mx-2">
                چاہیے
              </strong>{" "}
              (Chahiye) = &quot;يجب&quot;:
              <ul className="list-circle list-inside ml-4">
                <li>
                  <strong className="text-teal-800 dark:text-teal-100 mx-2">
                    مجھے جانا چاہیے
                  </strong>{" "}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    (Mujhe jana chahiye)
                  </span>{" "}
                  = &quot;يجب أن أذهب&quot;.
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Section: Important Rules */}
        <section className="mb-12">
          <h2 className="font-bold text-teal-600 dark:text-teal-300 mb-6 border-b-2 border-teal-300 dark:border-teal-600 pb-2">
            8. قواعد هامة{" "}
            <span className="text-gray-600 dark:text-gray-300">
              (Important Rules)
            </span>
          </h2>
          <ul className="list-none space-y-4 text-gray-700 dark:text-gray-300">
            <li className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                أ. تطابق الجنس
              </h4>
              <p>
                الأفعال{" "}
                <strong className="text-teal-700 dark:text-teal-300">
                  تتغير مع المؤنث
                </strong>{" "}
                بإضافة{" "}
                <strong className="text-teal-700 dark:text-teal-300">ـی</strong>{" "}
                (مثال: کھاتی ہے).
              </p>
            </li>
            <li className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                ب. الفاعل المخفي
              </h4>
              <p>
                في الأردية،{" "}
                <strong className="text-teal-700 dark:text-teal-300">
                  لا يُحذف الضمير
                </strong>{" "}
                عادةً:
              </p>
              <p className="mt-1">
                مثال:{" "}
                <strong className="text-teal-700 dark:text-teal-300">
                  میں جاتا ہوں
                </strong>{" "}
                (لا تقل "جاتا ہوں" فقط).
              </p>
            </li>
            <li className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                ج. النفي
              </h4>
              <p>
                تُضاف{" "}
                <strong className="text-teal-700 dark:text-teal-300">
                  نہیں
                </strong>{" "}
                قبل الفعل:
              </p>
              <p className="mt-1">
                مثال:{" "}
                <strong className="text-teal-700 dark:text-teal-300">
                  میں نہیں پڑھتا
                </strong>{" "}
                <span className="text-gray-600 dark:text-gray-300">
                  (Main nahi parhta)
                </span>{" "}
                = "أنا لا أقرأ".
              </p>
            </li>
          </ul>
        </section>

        {/* Section: Comprehensive Examples */}
        <section className="mb-12">
          <h2 className="font-bold text-teal-600 dark:text-teal-300 mb-6 border-b-2 border-teal-300 dark:border-teal-600 pb-2">
            9. أمثلة شاملة
          </h2>
          <CustomTable
            headers={["الزمن", "الجملة بالأردية", "الترجمة"]}
            data={comprehensiveExamples}
          />
        </section>

        {/* Section: Exercises */}
        <section className="mb-12">
          <h2 className="font-bold text-teal-600 dark:text-teal-300 mb-6 border-b-2 border-teal-300 dark:border-teal-600 pb-2">
            10. تمارين
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong className="text-teal-700 dark:text-teal-300">
              حول الجمل التالية إلى الأردية:
            </strong>
          </p>
          <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
            {exercises.map((exercise, index) => (
              <li key={index}>
                "{exercise.arabic}" →{" "}
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
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75"
          >
            {showAnswers ? "إخفاء الإجابات" : "إظهار الإجابات"}
          </button>
        </section>

        {/* Section: Quick Summary */}
        <section className="mb-8">
          <h2 className="font-bold text-teal-600 dark:text-teal-300 mb-6 border-b-2 border-teal-300 dark:border-teal-600 pb-2">
            11. ملخص سريع
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              الأفعال{" "}
              <strong className="text-teal-700 dark:text-teal-300">
                تتغير حسب الزمن والجنس والعدد
              </strong>
              .
            </li>
            <li>
              <strong className="text-teal-700 dark:text-teal-300">
                الضمائر
              </strong>{" "}
              تُستخدم دائمًا (لا تُحذف).
            </li>
            <li>
              <strong className="text-teal-700 dark:text-teal-300">
                الهيئة الرسمية
              </strong>{" "}
              تتطلب أفعالًا مختلفة (مثل{" "}
              <strong className="text-teal-700 dark:text-teal-300">
                پڑھئیے
              </strong>{" "}
              بدلًا من{" "}
              <strong className="text-teal-700 dark:text-teal-300">پڑھو</strong>
              ).
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default BasicVerbs;
