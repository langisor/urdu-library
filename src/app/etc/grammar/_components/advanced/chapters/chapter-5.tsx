"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Chapter5 = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  return (
    <div className="p-8">
      <Button
        onClick={() => navigateTo("toc")}
        className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-300"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Table of Contents
      </Button>
      <h1 className="text-4xl font-bold mb-4 text-teal-700">Chapter 5: Advanced Grammar & Stylistics - A Comprehensive Guide</h1>
      <p>
        This chapter delves into the finer points of Urdu grammar, equipping you
        with tools for sophisticated expression, nuanced meaning, and stylistic
        flair.
      </p>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">1. Case and its Role (<span className="urdu-text">حالت</span>- <em>Haalat</em>)</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Concept:</strong> Case refers to the grammatical function of a
          noun or pronoun in a sentence (Subject, Direct Object, Indirect
          Object, Instrument, Location, etc.). Unlike languages with extensive
          declensions (like Russian or Latin), Urdu primarily uses{" "}
          <strong>postpositions</strong> (words <em>following</em> the noun) and
          specific verb agreements to indicate case relationships.
        </li>
      </ul>
      <h3 className="text-xl font-semibold text-teal-600 mb-2 mt-4">How Forms Change:</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Pronouns:</strong> Pronouns change form significantly based on
          case. (See Chapter 4 for Pronoun Tables - Nominative,
          Accusative/Dative, Ergative, Oblique).
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              Nominative:
              <span className="urdu-text">وہ کتاب پڑھتا ہے۔</span>
              (Who reads? He - <em>Woh kitab parhta hai.</em>)
            </li>
            <li>
              Accusative/Dative:
              <span className="urdu-text"> میں نے <strong>اسے</strong> کتاب دی۔ </span>
              (To whom? Him - <em>Main ne <strong>use</strong> kitaab di.</em>)
            </li>
            <li>
              Ergative:
              <span className="urdu-text"> <strong>اس نے</strong> کہا۔ </span>
              (Who said? He - <em><strong>Us ne</strong> kaha.</em>)
            </li>
          </ul>
        </li>
        <li>
          <strong>Nouns:</strong> Most nouns have two case forms:
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              <strong>Direct Case:</strong> The basic form of the noun, used as the subject of an intransitive verb, or as the object of a transitive verb without a postposition.
              <span className="urdu-text">لڑکا آیا۔</span>
              (_Larka aaya._ - The boy came.)
            </li>
            <li>
              <strong>Oblique Case:</strong> The form of the noun used before a postposition.
              <span className="urdu-text">لڑکے <strong>نے</strong> کہا۔</span>
              (_Larke ne kaha._ - The boy said.)
              <span className="urdu-text">لڑکے <strong>کو</strong> کتاب دی۔</span>
              (_Larke ko kitaab di._ - Gave the book <strong>to the boy</strong>.)
            </li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">2. Active and Passive Voice: Changing the Focus</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Active Voice (Fe'l-e-Ma'roof, <span className="urdu-text">فعل معروف</span>):</strong> The subject performs the action.
          <span className="urdu-text">استاد نے خط لکھا۔</span>
          (_Ustaad ne khat likha._ - The teacher wrote a letter.)
        </li>
        <li>
          <strong>Passive Voice (Fe'l-e-Majhool, <span className="urdu-text">فعل مجہول</span>):</strong> The subject receives the action. Formed using the verb <span className="urdu-text">جانا</span> (_jaana_ - to go/become).
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              <strong>Formation:</strong> Past Participle of the Main Verb + Conjugation of <span className="urdu-text">جانا</span>.
            </li>
            <li>
              <strong>Example:</strong>
              <span className="urdu-text">خط لکھا گیا۔</span>
              (_Khat likha gaya._ - The letter was written.)
              <span className="urdu-text">کھانا کھایا گیا۔</span>
              (_Khaana khaya gaya._ - The food was eaten.)
            </li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">3. Direct and Indirect Speech</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Direct Speech (<span className="urdu-text">کلامِ مستقیم</span>):</strong> The exact words of a speaker. In Urdu, this is often marked by <span className="urdu-text">کہ</span> (_ke_) or <span className="urdu-text">کہا کہ</span> (_kaha ke_) and the exact quote.
          <span className="urdu-text">اس نے کہا کہ "میں جا رہا ہوں۔"</span>
          (_Us ne kaha ke "Main jaa raha hoon."_ - He said, "I am going.")
        </li>
        <li>
          <strong>Indirect Speech (<span className="urdu-text">کلامِ غیر مستقیم</span>):</strong> Reporting what was said without using the exact words.
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              <strong>Example:</strong>
              <span className="urdu-text">اس نے کہا کہ وہ جا رہا تھا۔</span>
              (_Us ne kaha ke woh jaa raha tha._ - He said that he was going.)
            </li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">4. Prefixes and Suffixes</h2>
      <p>
        These are small word parts that change the meaning or function of a word.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Prefixes (<span className="urdu-text">سابَقے</span>- _Saa'biqe_):</strong> Added to the beginning of a word.
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              <strong>نا-</strong> (_na-_): not, non- (<span className="urdu-text">ناکام</span>- unsuccessful, <span className="urdu-text">ناممکن</span>- impossible)
            </li>
            <li>
              <strong>بے-</strong> (_be-_): without (<span className="urdu-text">بے کار</span>- useless, <span className="urdu-text">بے ادب</span>- disrespectful)
            </li>
          </ul>
        </li>
        <li>
          <strong>Suffixes (<span className="urdu-text">لاحَقے</span>- _Laa'hiqe_):</strong> Added to the end of a word.
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              <strong>-ی</strong> (_-i_): Forms adjectives or abstract nouns from nouns or other adjectives.
              <span className="urdu-text">پاکستان</span> <ArrowRight className="ml-2 h-2 w-2" /> <span className="urdu-text">پاکستانی</span> (Pakistani), <span className="urdu-text">دوست</span> <ArrowRight className="ml-2 h-2 w-2" /> <span className="urdu-text">دوستی</span> (Friendship)
            </li>
            <li>
              <strong>-انہ</strong> (_-ana_): Forms adverbs or adjectives meaning "in the manner of".
              <span className="urdu-text">دوست</span> <ArrowRight className="ml-2 h-2 w-2" /> <span className="urdu-text">دوستانہ</span> (Friendly)
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};