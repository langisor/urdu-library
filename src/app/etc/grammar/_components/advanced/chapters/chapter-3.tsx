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
import { ArrowLeft } from "lucide-react";

export const Chapter3 = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  return (
    <div className="p-8">
      <Button
        onClick={() => navigateTo("toc")}
        className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-300"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Table of Contents
      </Button>
      <h1 className="text-4xl font-bold mb-4 text-teal-700">
        Chapter 3: Sentence Structure (جملوں کی ساخت - _Jumlon ki Saakht_)
      </h1>
      <p>
        Mastering vocabulary is essential, but the real magic of Urdu happens
        when you string words together meaningfully.{" "}
        <strong>Chapter 3: Sentence Structure</strong> is your guide to
        understanding how Urdu sentences are built, organized, and varied. This
        knowledge is crucial for forming correct sentences, expressing complex
        ideas, and understanding native speech and writing. Let's break down the
        components and patterns.
      </p>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">1. Components of a Sentence (جملے کے اجزاء - _Jumlay ke Ajza_)</h2>
      <p>
        Every complete Urdu sentence fundamentally consists of two core parts:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Subject (فاعل - _Faa'il_):</strong> This is the person, place,
          thing, or concept that performs the action or about which something is
          stated. It usually comes first.
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              Example:
              <span className="urdu-text">لڑکا</span>
              (_Larka_ - The boy),
              <span className="urdu-text">کتا</span>
              (_Kutta_ - The dog),
              <span className="urdu-text">وہ کتاب</span>
              (_Woh kitaab_ - That book),
              <span className="urdu-text">ہم</span>
              (_Hum_ - We)
            </li>
          </ul>
        </li>
        <li>
          <strong>Predicate (خبر - _Khabar_):</strong> This part tells us
          something <em>about</em> the subject. It contains the action (verb) or
          describes the state of the subject. It typically follows the subject.
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              Example:
              <span className="urdu-text">پڑھتا ہے۔</span>
              (_Parhta hai._ - reads.),
              <span className="urdu-text">سیب ہے۔</span>
              (_Seb hai._ - is an apple.),
              <span className="urdu-text">خوش ہیں۔</span>
              (_Khush hain._ - are happy.)
            </li>
          </ul>
        </li>
        <li>
          <strong>Object (مفعول - _Maf'ool_):</strong> Often included within the
          predicate, this is the person or thing that receives the action of the
          verb.
          <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
            <li>
              Example:
              <span className="urdu-text">
                لڑکا <strong>کتاب</strong> پڑھتا ہے۔
              </span>
              (_Larka <strong>kitaab</strong> parhta hai._ - The boy reads <strong>a book</strong>.)
            </li>
          </ul>
        </li>
      </ul>
      <p className="mt-4">
        <strong>Key Point:</strong> Identifying the <em>Faa'il</em> (Subject) and <em>Khabar</em> (Predicate) is the first step to understanding or constructing any Urdu sentence.
      </p>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">2. Basic Sentence Patterns: SOV Order</h2>
      <p>
        Urdu has a flexible but common sentence structure:
        <strong>Subject-Object-Verb (SOV)</strong>. This differs from English (SVO).
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>S + O + V:</strong>
          <span className="urdu-text">میں کتاب پڑھتا ہوں۔</span>
          (_Main kitaab parhta hoon._ - I a book read.)
        </li>
        <li>
          <strong>S + V:</strong> (Intransitive sentences)
          <span className="urdu-text">وہ آتا ہے۔</span>
          (_Woh aata hai._ - He comes.)
        </li>
        <li>
          <strong>Questions (S + O + V):</strong>
          <span className="urdu-text">کیا آپ سکول جاتے ہیں؟</span>
          (_Kya aap school jaate hain?_ - Do you go to school?)
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">3. Types of Sentences</h2>
      <p>
        Sentences can be classified by their structure and purpose:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Simple Sentence (Jumla-e-Mufrad, <span className="urdu-text">جملہ مفرد</span>):</strong> One independent clause.
          <span className="urdu-text">موسم اچھا ہے۔</span>
          (_Mausam acha hai._ - The weather is good.)
        </li>
        <li>
          <strong>Compound Sentence (Jumla-e-Murakkab, <span className="urdu-text">جملہ مرکب</span>):</strong> Two or more independent clauses joined by a conjunction.
          <span className="urdu-text">میں آیا لیکن وہ نہیں آیا۔</span>
          (_Main aaya lekin woh nahin aaya._ - I came, but he didn't.)
        </li>
        <li>
          <strong>Complex Sentence (Jumla-e-Pechida, <span className="urdu-text">جملہ پیچیدہ</span>):</strong> Contains at least one independent and one or more dependent clauses.
          <span className="urdu-text">اگر وہ آئے گا، تو ہم چلیں گے۔</span>
          (_Agar woh aaye ga, to hum chalenge._ - If he comes, then we'll go.)
        </li>
      </ul>
    </div>
  );
};
