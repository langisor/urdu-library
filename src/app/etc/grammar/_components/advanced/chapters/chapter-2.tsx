"use client";
import {ArrowRight,ArrowLeft} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Chapter2 = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  return (
    <div className="p-8">
      <Button
        onClick={() => navigateTo("toc")}
        className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-300"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Table of Contents
      </Button>
      <h1 className="text-4xl font-bold mb-4 text-teal-700">Chapter 2: Parts of Speech (Ajzaa-e-Kalaam)</h1>
      <p>
        <strong>Introduction:</strong> Words are the workers building sentences! This chapter introduces the different _types_ of workers (parts of speech) in Urdu and their jobs.
      </p>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2">2.1 Nouns (Ism, <span className="urdu-text">اسم</span>): Naming Things</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Definition:</strong> Words that name a person, place, thing, quality, or idea.
          <span className="urdu-text">کتاب</span> (Kitaab - Book), <span className="urdu-text">لڑکا</span> (Larka - Boy), <span className="urdu-text">لاہور</span> (Lahore - Lahore), <span className="urdu-text">محبت</span> (Muhabbat - Love), <span className="urdu-text">آزادی</span> (Aazaadi - Freedom).
        </li>
        <li>
          <strong>Types:</strong>
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              <strong>Common Noun (Ism-e-Aam, <span className="urdu-text">اسم عام</span>):</strong> Names general things.
              <span className="urdu-text">شہر</span> (Shehar - City), <span className="urdu-text">درخت</span> (Darakht - Tree), <span className="urdu-text">کتاب</span> (Kitaab - Book).
            </li>
            <li>
              <strong>Proper Noun (Ism-e-Khaas, <span className="urdu-text">اسم خاص</span>):</strong> Names specific, unique things (capitalized).
              <span className="urdu-text">علی</span> (Ali - Ali), <span className="urdu-text">پاکستان</span> (Pakistan - Pakistan), <span className="urdu-text">دریائے سندھ</span> (Darya-e-Sindh - Indus River).
            </li>
          </ul>
        </li>
        <li>
          <strong>Gender (Jins, <span className="urdu-text">جنس</span>):</strong>
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              <strong>Masculine (Muzakkar, <span className="urdu-text">مذکر</span>):</strong> Most nouns not ending in a sound are masculine.
              <span className="urdu-text">کمرہ</span> (Kamrah - Room), <span className="urdu-text">دروازہ</span> (Darwaaza - Door), <span className="urdu-text">لڑکا</span> (Larka - Boy).
            </li>
            <li>
              <strong>Feminine (Muannas, <span className="urdu-text">مونث</span>):</strong> Often (but not always!) nouns ending in:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>"-i" sound (represented by <span className="urdu-text">ی</span> or <span className="urdu-text">ے</span>):
                  <span className="urdu-text">کتاب</span> (Kitaab - Book), <span className="urdu-text">کرسی</span> (Kursi - Chair), <span className="urdu-text">گاڑی</span> (Gaṛi - Vehicle).
                </li>
                <li>"-at": <span className="urdu-text">دولت</span> (Daulat - Wealth), <span className="urdu-text">حقیقت</span> (Haqeeqat - Reality).
                </li>
                <li>
                  <strong>Common Exceptions:</strong> Some inherently feminine nouns:
                  <span className="urdu-text">ماں</span> (Maan - Mother), <span className="urdu-text">بہن</span> (Behan - Sister), <span className="urdu-text">آنکھ</span> (Aankh - Eye), <span className="urdu-text">زبان</span> (Zubaan - Tongue/Language), <span className="urdu-text">چیز</span> (Cheez - Thing). _Remember KOHA: Zubaan, Oonkh, Hawa, Aag - all feminine._
                </li>
              </ul>
            </li>
            <li>
              <strong>Rules:</strong> Adjectives and verbs must agree with the noun's gender.
            </li>
          </ul>
        </li>
        <li>
          <strong>Number (Adad, <span className="urdu-text">عدد</span>):</strong>
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              <strong>Singular (Waahid, <span className="urdu-text">واحد</span>):</strong> One thing.
              <span className="urdu-text">کتاب</span> (Kitaab - Book), <span className="urdu-text">لڑکا</span> (Larka - Boy).
            </li>
            <li>
              <strong>Plural (Jama', <span className="urdu-text">جمع</span>):</strong> More than one thing. Plurals are often irregular, but common formations:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>
                  <strong>Adding "-ain" (<span className="urdu-text">یں</span>):</strong>
                  <span className="urdu-text">لڑکا</span> <ArrowRight className="ml-2 h-2 w-2" /> <span className="urdu-text">لڑکے</span> (Larkay - Boys), <span className="urdu-text">کتاب</span> <ArrowRight className="ml-2 h-2 w-2" /> <span className="urdu-text">کتابیں</span> (Kitaabein - Books). _(Masculine nouns ending in -a)_
                </li>
                <li>
                  <strong>Adding "-ein" (<span className="urdu-text">یں</span>):</strong>
                  <span className="urdu-text">کرسی</span> <ArrowRight className="ml-2 h-2 w-2" /> <span className="urdu-text">کرسیاں</span> (Kursiyaan - Chairs). _(Feminine nouns ending in -i)_
                </li>
                <li>
                  <strong>Adding "-oon" (<span className="urdu-text">وں</span>):</strong>
                  <span className="urdu-text">استاد</span> <ArrowRight className="ml-2 h-2 w-2" /> <span className="urdu-text">استادوں</span> (Ustaadoon - Teachers). _(Nouns ending in consonants or long vowels)_
                </li>
                <li>
                  <strong>Adding "-aat" (<span className="urdu-text">ات</span>):</strong>
                  <span className="urdu-text">دولت</span> <ArrowRight className="ml-2 h-2 w-2" /> <span className="urdu-text">دولتین</span> (Daulatein - Two wealths - rare),
                  <span className="urdu-text">لفظ</span> <ArrowRight className="ml-2 h-2 w-2" /> <span className="urdu-text">الفاظ</span> (Alfaaz - Words - Arabic pattern).
                </li>
                <li>
                  <strong>Broken Plural (Jama' ul Kasra, <span className="urdu-text">جمع الکسرہ</span>):</strong> Completely changes the word structure (often Arabic loans).
                  <span className="urdu-text">کتاب</span> <ArrowRight className="ml-2 h-2 w-2" /> <span className="urdu-text">کتب</span> (Kutub - Books), <span className="urdu-text">سوال</span> <ArrowRight className="ml-2 h-2 w-2" /> <span className="urdu-text">سوالات</span> (Sawaalaat - Questions), <span className="urdu-text">استاد</span> <ArrowRight className="ml-2 h-2 w-2" /> <span className="urdu-text">اساتذہ</span> (Asaatizah - Teachers).
                </li>
                <li>
                  <em>Many nouns have multiple possible plural forms.</em>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">2.2 Pronouns (Zameer, <span className="urdu-text">ضمیر</span>): Standing In</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Definition:</strong> Words that replace nouns to avoid repetition.
          <span className="urdu-text">میں</span> (Main - I), <span className="urdu-text">تم</span> (Tum - You - informal), <span className="urdu-text">وہ</span> (Woh - He/She/It/That/They), <span className="urdu-text">یہ</span> (Yeh - This/He/She/It/These).
        </li>
        <li>
          <strong>Types with Examples (Isolated Form):</strong>
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              <strong>Personal Pronouns:</strong>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>1st Person Sing: <span className="urdu-text">میں</span> (Main - I), Plur: <span className="urdu-text">ہم</span> (Hum - We)</li>
                <li>2nd Person Sing (Intimate): <span className="urdu-text">تو</span> (Tu - You - very informal/familiar), Sing/Plur (Informal): <span className="urdu-text">تم</span> (Tum - You), Sing/Plur (Formal): <span className="urdu-text">آپ</span> (Aap - You)</li>
                <li>3rd Person Sing Proximal (Near): <span className="urdu-text">یہ</span> (Yeh - This/He/She/It), Sing Distal (Far): <span className="urdu-text">وہ</span> (Woh - That/He/She/It), Plur Proximal: <span className="urdu-text">یہ</span> (Yeh - These/They - near), Plur Distal: <span className="urdu-text">وہ</span> (Woh - Those/They - far)</li>
              </ul>
            </li>
            <li>
              <strong>Possessive Pronouns:</strong> <span className="urdu-text">میرا</span> (Mera - My), <span className="urdu-text">تمہارا</span> (Tumhaara - Your - inf.), <span className="urdu-text">آپ کا</span> (Aap ka - Your - form.), <span className="urdu-text">اس کا</span> (Us ka - His/Her/Its), <span className="urdu-text">ان کا</span> (Un ka - Their).
            </li>
            <li>
              <strong>Demonstrative Pronouns:</strong> <span className="urdu-text">یہ</span> (Yeh - This/These), <span className="urdu-text">وہ</span> (Woh - That/Those).
            </li>
            <li>
              <strong>Interrogative Pronouns:</strong> <span className="urdu-text">کون</span> (Koun - Who?), <span className="urdu-text">کیا</span> (Kya - What?).
            </li>
            <li>
              <strong>Relative Pronouns:</strong> <span className="urdu-text">جو</span> (Jo - Who/Which/That), <span className="urdu-text">جس</span> (Jis - Whom/Which - oblique sing.), <span className="urdu-text">جن</span> (Jin - Whom/Which - oblique plur.).
            </li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">2.3 Verbs (Fe'l, <span className="urdu-text">فعل</span>): Action Words!</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Definition:</strong> Words that express an action (<span className="urdu-text">کھانا</span> - Khaana - To eat), state (<span className="urdu-text">ہونا</span> - Hona - To be), or occurrence (<span className="urdu-text">ہوجانا</span> - Ho jaana - To happen).
        </li>
        <li>
          <strong>Transitive (Mutaddi, <span className="urdu-text">متعدی</span>):</strong> Require a direct object (<span className="urdu-text">مفعول</span> - Maf'ool). Object receives the action.
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li><span className="urdu-text">علی نے <strong>کتاب</strong> پڑھی۔</span> (Ali ne <strong>kitaab</strong> paṛhi. - Ali read <strong>the book</strong>.)</li>
          </ul>
        </li>
        <li>
          <strong>Intransitive (Lazim, <span className="urdu-text">لازم</span>):</strong> Do not require a direct object.
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li><span className="urdu-text">علی <strong>سو</strong> گیا۔</span> (Ali <strong>so</strong> gaya. - Ali <strong>slept</strong>.)</li>
          </ul>
        </li>
        <li>
          <strong>Forms:</strong> Verbs change based on tense, gender, number, and person (conjugation covered in Ch4). The basic dictionary form is the Infinitive:
          <span className="urdu-text">پڑھنا</span> (Paṛhna - To read), <span className="urdu-text">لکھنا</span> (Likna - To write), <span className="urdu-text">جانا</span> (Jaana - To go).
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">2.4 Adjectives (Sifat, <span className="urdu-text">صفت</span>): Describing Words</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Definition:</strong> Words that describe or modify nouns.
          <span className="urdu-text">اچھا لڑکا</span> (Acha Larka - Good boy), <span className="urdu-text">بڑا گھر</span> (Baṛa Ghar - Big house), <span className="urdu-text">سرخ گلاب</span> (Surkh Gulaab - Red rose).
        </li>
        <li>
          <strong>Degrees of Comparison:</strong>
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              <strong>Positive (Sifat-e-Musabbaha, <span className="urdu-text">صفت مثبتہ</span>):</strong> Basic description.
              <span className="urdu-text">اچھا</span> (Acha - Good), <span className="urdu-text">بڑا</span> (Baṛa - Big).
            </li>
            <li>
              <strong>Comparative (Tafdeeli Darja, <span className="urdu-text">تفدیلی درجہ</span>):</strong> Comparison between two. Formed by adding "<span className="urdu-text">سے</span>" (se) _after_ the adjective.
              <span className="urdu-text">علی احمد <strong>سے اچھا</strong> ہے۔</span> (Ali Ahmad <strong>se acha</strong> hai. - Ali is <strong>better than</strong> Ahmad.)
              <span className="urdu-text">احمد <strong>سے بڑا</strong> گھر۔</span> (Ahmad <strong>se baṛa</strong> ghar. - A house <strong>bigger than</strong> Ahmad's.)
            </li>
            <li>
              <strong>Superlative (Sifat-e-Tafdeel, <span className="urdu-text">صفت تفضیل</span>):</strong> Highest degree. Often uses "<span className="urdu-text">سب سے</span>" (sab se - than all) _before_ the adjective.
              <span className="urdu-text">علی <strong>سب سے اچھا</strong> لڑکا ہے۔</span> (Ali <strong>sab se acha</strong> larka hai. - Ali is <strong>the best</strong> boy.)
              <span className="urdu-text">سب سے بڑا</span> شہر۔ (<strong>Sab se baṛa</strong> shehar. - <strong>The biggest</strong> city.)
            </li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">2.5 Adverbs (Mutaliq-e-Fe'l, <span className="urdu-text">متعلق فعل</span>): Describing Actions</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Definition:</strong> Words that modify verbs, adjectives, or other adverbs, telling _how_, _when_, _where_, or _to what extent_.
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              <strong>Manner (<span className="urdu-text">کیفیت</span>):</strong> <span className="urdu-text">تیزی سے</span> (Tezi se - Quickly), <span className="urdu-text">آہستہ</span> (Aahista - Slowly), <span className="urdu-text">اچھی طرح</span> (Achi tarah - Well). <span className="urdu-text">وہ <strong>تیزی سے</strong> دوڑا۔</span> (Woh <strong>tezi se</strong> daurra. - He ran <strong>quickly</strong>.)
            </li>
            <li>
              <strong>Time (<span className="urdu-text">وقت</span>):</strong> <span className="urdu-text">آج</span> (Aaj - Today), <span className="urdu-text">کل</span> (Kal - Yesterday/Tomorrow), <span className="urdu-text">اب</span> (Ab - Now), <span className="urdu-text">پہلے</span> (Pehle - Before). <span className="urdu-text">وہ <strong>کل</strong> آئے گا۔</span> (Woh <strong>kal</strong> aaye ga. - He will come <strong>tomorrow</strong>.)
            </li>
            <li>
              <strong>Place (<span className="urdu-text">مقام</span>):</strong> <span className="urdu-text">یہاں</span> (Yahaan - Here), <span className="urdu-text">وہاں</span> (Wahaan - There), <span className="urdu-text">اندر</span> (Andar - Inside), <span className="urdu-text">باہر</span> (Bahar - Outside). <span className="urdu-text">کتاب <strong>یہاں</strong> رکھو۔</span> (Kitaab <strong>yahaan</strong> rakho. - Put the book <strong>here</strong>.)
            </li>
            <li>
              <strong>Degree (<span className="urdu-text">مقدار</span>):</strong> <span className="urdu-text">بہت</span> (Bohat - Very), <span className="urdu-text">زیادہ</span> (Zyada - More), <span className="urdu-text">تھوڑا</span> (Thora - A little). <span className="urdu-text">یہ <strong>بہت</strong> اچھا ہے۔</span> (Yeh <strong>bohat</strong> acha hai. - This is <strong>very</strong> good.)
            </li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">2.6 Prepositions, Conjunctions & Interjections: The Connectors and Reactors</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Prepositions (Huroof-e-Jarr, <span className="urdu-text">حروف جر</span>):</strong> Show relationships (location, direction, time, possession) between nouns/pronouns and other words. Urdu primarily uses <strong>Postpositions</strong> - they come _after_ the noun.
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li><span className="urdu-text">میں <strong>کے لیے</strong></span> (Mere <strong>liye</strong> - For me)</li>
            <li><span className="urdu-text">میز <strong>پر</strong></span> (Mez <strong>par</strong> - On the table)</li>
          </ul>
        </li>
        <li>
          <strong>Conjunctions (Huroof-e-Aṭaf, <span className="urdu-text">حروف عطف</span>):</strong> Words that join two sentences or parts of a sentence.
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li><span className="urdu-text">اور</span> (aur - and), <span className="urdu-text">لیکن</span> (lekin - but), <span className="urdu-text">یا</span> (ya - or).</li>
          </ul>
        </li>
        <li>
          <strong>Interjections (Huroof-e-Nida, <span className="urdu-text">حروف ندا</span>):</strong> Words that express emotion or surprise.
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li><span className="urdu-text">واہ!</span> (Waah! - Wow!), <span className="urdu-text">اف!</span> (Uff! - Ugh!), <span className="urdu-text">ارے!</span> (Are! - Hey!).</li>
          </ul>
        </li>
      </ul>

    </div>
  );
};