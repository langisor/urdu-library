"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function VocabularyUnit2Content() {
  return (
    <div className="unit-2-content p-6 space-y-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white">
        Unit 2: The <span className="lang-arabic  ">Arabic</span>{" "}
        Element in <span className="lang-english ">Urdu</span>{" "}
        Vocabulary
      </h2>

      {/* 1. Introduction */}
      <Card>
        <CardHeader>
          <CardTitle>1. Introduction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The <span className="lang-english">Urdu</span> language, a product
            of cultural and linguistic syncretism, incorporates vocabulary from
            a wide range of sources. Among these,{" "}
            <span className="lang-arabic">Arabic</span> stands out due to its
            profound influence on religious, philosophical, scholarly, and legal
            expressions. This unit explores how{" "}
            <span className="lang-arabic">Arabic</span> has entered the{" "}
            <span className="lang-english">Urdu</span> language, the mechanisms
            of its adaptation, and strategies for recognizing and mastering{" "}
            <span className="lang-arabic">Arabic</span>-derived vocabulary in{" "}
            <span className="lang-english">Urdu</span>.
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* 2. Historical Pathways */}
      <Card>
        <CardHeader>
          <CardTitle>2. Historical Pathways</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">
              2.1 Indirect Entry through Persian
            </h4>
            <p>
              <span className="lang-arabic">Arabic</span> vocabulary entered{" "}
              <span className="lang-english">Urdu</span> primarily via{" "}
              <span className="lang-english">Persian</span>, the court and
              literary language of the{" "}
              <span className="lang-english">Delhi Sultanate</span> and the{" "}
              <span className="lang-english">Mughal Empire</span>. While some{" "}
              <span className="lang-arabic">Arabic</span> words were borrowed
              directly (especially in religious texts), most were filtered
              through <span className="lang-english">Persian</span>, altering
              their form and pronunciation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">2.2 Direct Religious Influence</h4>
            <p>
              Words from <span className="lang-arabic">Arabic</span> entered{" "}
              <span className="lang-english">Urdu</span> directly through the{" "}
              <span className="lang-arabic">Quran</span>,{" "}
              <span className="lang-arabic">Hadith</span>, and{" "}
              <span className="lang-english">Islamic</span> scholarship.
            </p>
            <p>
              <strong>Example:</strong>
              <br />
              <span className="lang-arabic">صلاة</span> →{" "}
              <span className="lang-urdu">نماز</span> (Persianized), but also{" "}
              <span className="lang-arabic">صلاۃ</span> used in formal
              discourse.
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* 3. Adaptation Mechanisms */}
      <Card>
        <CardHeader>
          <CardTitle>3. Adaptation Mechanisms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">3.1 Phonological Changes</h4>
            <p>
              <span className="lang-arabic">Arabic</span>’s complex consonantal
              system is simplified in <span className="lang-english">Urdu</span>
              .
            </p>
            <p>
              <strong>Example:</strong>{" "}
              <span className="lang-arabic">‘ayn (ع)</span> and{" "}
              <span className="lang-arabic">ḥā’ (ح)</span> are often merged or
              softened. <span className="lang-urdu">علم</span> (
              <span className="lang-roman-urdu">ʿilm</span>) is pronounced as{" "}
              <span className="lang-roman-urdu">ilm</span>.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">3.2 Morphological Adjustment</h4>
            <p>
              <span className="lang-arabic">Arabic</span> root-based morphology
              (e.g., triliteral roots like{" "}
              <span className="lang-arabic">ك-ت-ب</span>) is not productive in{" "}
              <span className="lang-english">Urdu</span>.
            </p>
            <p>
              <strong>Example:</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>
                <span className="lang-arabic">كاتب</span>,{" "}
                <span className="lang-arabic">مكتوب</span>,{" "}
                <span className="lang-arabic">كتاب</span>
              </li>
              <li>
                <span className="lang-urdu">کتاب</span> (
                <span className="lang-roman-urdu">kitāb</span>),{" "}
                <span className="lang-urdu">مکتوب</span> (
                <span className="lang-roman-urdu">maktūb</span>),{" "}
                <span className="lang-urdu">کاتب</span> (
                <span className="lang-roman-urdu">kātib</span>)
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* 4. Patterns of Arabic Derivatives in Urdu */}
      <Card>
        <CardHeader>
          <CardTitle>4. Patterns of Arabic Derivatives in Urdu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h4 className="font-semibold">4.1 Common Forms</h4>
          <ul className="list-disc list-inside">
            <li>
              <span className="lang-arabic">فَعَلَ (fa‘ala)</span> →{" "}
              <span className="lang-urdu">دخل</span> (
              <span className="lang-english">to enter</span>)
            </li>
            <li>
              <span className="lang-arabic">مَفْعُول</span> →{" "}
              <span className="lang-urdu">مکتوب</span> (
              <span className="lang-english">written</span>)
            </li>
            <li>
              <span className="lang-arabic">مُفَاعِل</span> →{" "}
              <span className="lang-urdu">معلم</span> (
              <span className="lang-english">teacher</span>)
            </li>
            <li>
              <span className="lang-arabic">تَفْعِيل</span> →{" "}
              <span className="lang-urdu">تعلیم</span> (
              <span className="lang-english">education</span>)
            </li>
            <li>
              <span className="lang-arabic">اِسْتِفْعَال</span> →{" "}
              <span className="lang-urdu">استعمال</span> (
              <span className="lang-english">usage</span>)
            </li>
          </ul>
          <h4 className="font-semibold">4.2 Roots and Word Families</h4>
          <p>
            <strong>Root:</strong> <span className="lang-arabic">ع-ل-م</span>
          </p>
          <ul className="list-disc list-inside">
            <li>
              <span className="lang-urdu">علم</span> (
              <span className="lang-roman-urdu">ʿilm</span>):{" "}
              <span className="lang-english">knowledge</span>
            </li>
            <li>
              <span className="lang-urdu">معلم</span> (
              <span className="lang-roman-urdu">muʿallim</span>):{" "}
              <span className="lang-english">teacher</span>
            </li>
            <li>
              <span className="lang-urdu">تعلیم</span> (
              <span className="lang-roman-urdu">taʿlīm</span>):{" "}
              <span className="lang-english">education</span>
            </li>
            <li>
              <span className="lang-urdu">عالم</span> (
              <span className="lang-roman-urdu">ʿālim</span>):{" "}
              <span className="lang-english">scholar</span>
            </li>
            <li>
              <span className="lang-urdu">معلوم</span> (
              <span className="lang-roman-urdu">maʿlūm</span>):{" "}
              <span className="lang-english">known</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Separator />

      {/* 5. Vocabulary Categories */}
      <Card>
        <CardHeader>
          <CardTitle>5. Vocabulary Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h4 className="font-semibold">5.1 Religious Vocabulary</h4>
          <p>
            Examples: <span className="lang-urdu">ایمان</span>,{" "}
            <span className="lang-urdu">صبر</span>,{" "}
            <span className="lang-urdu">قرآن</span>,{" "}
            <span className="lang-urdu">حدیث</span>,{" "}
            <span className="lang-urdu">جنت</span>
          </p>
          <h4 className="font-semibold">5.2 Legal and Ethical Terms</h4>
          <p>
            Examples: <span className="lang-urdu">عدل</span> (
            <span className="lang-roman-urdu">ʿadl</span> –{" "}
            <span className="lang-english">justice</span>),{" "}
            <span className="lang-urdu">قاعدہ</span> (
            <span className="lang-roman-urdu">qāʿidah</span> –{" "}
            <span className="lang-english">rule</span>),{" "}
            <span className="lang-urdu">شریعت</span> (
            <span className="lang-roman-urdu">sharīʿat</span> –{" "}
            <span className="lang-english">Islamic law</span>)
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* 6. Usage in Urdu Sentences */}
      <Card>
        <CardHeader>
          <CardTitle>6. Usage in Urdu Sentences</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="lang-urdu">ہمیں صبر سے کام لینا چاہیے۔</span>
            </li>
            <li>
              <span className="lang-urdu">علم ایک قیمتی دولت ہے۔</span>
            </li>
            <li>
              <span className="lang-urdu">سچ اور حق کی ہمیشہ جیت ہوتی ہے۔</span>
            </li>
            <li>
              <span className="lang-urdu">
                عدل و انصاف سے معاشرہ قائم رہتا ہے۔
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Separator />

      {/* 7. Practice Exercises */}
      <Card>
        <CardHeader>
          <CardTitle>7. Practice Exercises</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">7.1 Word Identification</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="lang-urdu">ہمیں عدل سے کام لینا چاہیے۔</span>
              </li>
              <li>
                <span className="lang-urdu">
                  علم حاصل کرنا ہر مسلمان پر فرض ہے۔
                </span>
              </li>
              <li>
                <span className="lang-urdu">
                  قرآن پڑھنے سے دل کو سکون ملتا ہے۔
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">7.3 Fill in the Blanks</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>_____</strong>{" "}
                <span className="lang-urdu">ایک عظیم نعمت ہے۔</span> (
                <span className="lang-english">knowledge</span>)
              </li>
              <li>
                <span className="lang-urdu">ہمیں</span> <strong>_____</strong>{" "}
                <span className="lang-urdu">پر قائم رہنا چاہیے۔</span> (
                <span className="lang-english">truth</span>)
              </li>
              <li>
                <strong>_____</strong>{" "}
                <span className="lang-urdu">کے بغیر کامیابی ممکن نہیں۔</span> (
                <span className="lang-english">effort</span>)
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* 8. Arabic in Urdu Poetry */}
      <Card>
        <CardHeader>
          <CardTitle>8. Arabic in Urdu Poetry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <blockquote>
            <span className="lang-urdu">
              خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے
              <br />
              خدا بندے سے خود پوچھے، بتا تیری رضا کیا ہے
            </span>
          </blockquote>
          <p>
            <span className="lang-urdu">خودی</span>,{" "}
            <span className="lang-urdu">تقدیر</span>,{" "}
            <span className="lang-urdu">رضا</span> are all{" "}
            <span className="lang-arabic">Arabic</span>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
