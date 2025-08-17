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
    <div className="container">
      <Button onClick={() => navigateTo("toc")} className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-300">
        &larr; Back to Table of Contents
      </Button>
      <h1>
        Chapter 3: Sentence Structure (جملوں کی ساخت - <em>Jumlon ki Saakht</em>
        )
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

      <h3>1. Components of a Sentence (جملے کے اجزاء - <em>Jumlay ke Ajza</em>)</h3>
      <p>
        Every complete Urdu sentence fundamentally consists of two core parts:
      </p>
      <ul>
        <li>
          <strong>Subject (فاعل - <em>Faa'il</em>):</strong> This is the person,
          place, thing, or concept that performs the action or about which
          something is stated. It usually comes first.
          <ul>
            <li>
              Example:
              <span className="urdu-text">لڑکا</span>
              (<em>Larka</em> - The boy),
              <span className="urdu-text">کتا</span>
              (<em>Kutta</em> - The dog),
              <span className="urdu-text">وہ کتاب</span>
              (<em>Woh kitaab</em> - That book),
              <span className="urdu-text">ہم</span>
              (<em>Hum</em> - We).
            </li>
          </ul>
        </li>
        <li>
          <strong>Predicate (خبر - <em>Khabar</em>):</strong> This is the part
          of the sentence that contains the verb and provides information about
          the subject. In Urdu, the verb typically comes at the very end of the
          sentence.
          <ul>
            <li>
              Example:
              <span className="urdu-text">سو رہا ہے۔</span>
              (<em>So raha hai.</em> - Is sleeping.),
              <span className="urdu-text">بہت تیز دوڑتا ہے۔</span>
              (<em>Bohat tez daurta hai.</em> - Runs very fast.),
              <span className="urdu-text">پرانی ہے۔</span>
              (<em>Purani hai.</em> - Is old.).
            </li>
          </ul>
        </li>
      </ul>

      <h3>2. Basic Sentence Patterns (بنیادی جملے کے نمونے - <em>Buniyadi Jumlay ke Namoonay</em>)</h3>
      <p>
        Urdu follows a Subject-Object-Verb (SOV) word order, which is different
        from English's Subject-Verb-Object (SVO).
      </p>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Pattern</th>
              <th>Urdu Example</th>
              <th>Romanization</th>
              <th>Literal Translation (for understanding)</th>
              <th>Correct English Translation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Subject + Verb</td>
              <td>
                <span className="urdu-text">وہ آتا ہے۔</span>
              </td>
              <td>
                <em>Woh aata hai.</em>
              </td>
              <td>He comes.</td>
              <td>He comes.</td>
            </tr>
            <tr>
              <td>Subject + Object + Verb</td>
              <td>
                <span className="urdu-text">علی کتاب پڑھتا ہے۔</span>
              </td>
              <td>
                <em>Ali kitaab parhta hai.</em>
              </td>
              <td>Ali book reads.</td>
              <td>Ali reads a book.</td>
            </tr>
            <tr>
              <td>Subject + Adjective + Verb</td>
              <td>
                <span className="urdu-text">کھانا ٹھنڈا ہے۔</span>
              </td>
              <td>
                <em>Khana thanda hai.</em>
              </td>
              <td>Food cold is.</td>
              <td>The food is cold.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>3. Sentence Types</h3>
      <ul>
        <li>
          <strong>Declarative Sentences (خبری جملے - <em>Khabari Jumlay</em>):</strong>
          Make a statement.
          <ul>
            <li>
              Example:
              <span className="urdu-text">وہ سکول جاتا ہے۔</span>
              (<em>Woh school jata hai.</em> - He goes to school.)
            </li>
          </ul>
        </li>
        <li>
          <strong>Interrogative Sentences (سوالیہ جملے - <em>Sawaliya Jumlay</em>):</strong>
          Ask a question. Often use
          <span className="urdu-text">کیا</span>
          (<em>kya</em> - what) at the beginning or an interrogative pronoun
          (who, where, when, why) within the sentence.
          <ul>
            <li>
              Example:
              <span className="urdu-text">کیا وہ سکول جاتا ہے؟</span>
              (<em>Kya woh school jata hai?</em> - Does he go to school?)
            </li>
          </ul>
        </li>
        <li>
          <strong>Negative Sentences (منفی جملے - <em>Manfi Jumlay</em>):</strong>
          Deny something. Use the particle
          <span className="urdu-text">نہیں</span>
          (<em>nahin</em> - not) before the verb.
          <ul>
            <li>
              Example:
              <span className="urdu-text">وہ سکول نہیں جاتا ہے۔</span>
              (<em>Woh school nahin jata hai.</em> - He does not go to school.)
            </li>
          </ul>
        </li>
        <li>
          <strong>Imperative Sentences (حکمیہ جملے - <em>Hukmiya Jumlay</em>):</strong>
          Give a command or request. The verb form changes.
          <ul>
            <li>
              Example (Polite):
              <span className="urdu-text">براہ مہربانی یہاں آئیں۔</span>
              (<em>Baraa-e meherbani yahan aaiye.</em> - Please come here.)
            </li>
            <li>
              Example (Informal):
              <span className="urdu-text">یہاں آؤ۔</span>
              (<em>Yahan aao.</em> - Come here.)
            </li>
          </ul>
        </li>
      </ul>

      <h3>4. Compound & Complex Sentences</h3>
      <ul>
        <li>
          <strong>Compound Sentences:</strong> Two or more independent clauses
          joined by a conjunction like
          <span className="urdu-text">اور</span>
          (<em>aur</em> - and) or
          <span className="urdu-text">لیکن</span>
          (<em>lekin</em> - but).
          <ul>
            <li>
              Example:
              <span className="urdu-text">میں آیا اور اس نے مجھ سے بات کی۔</span>
              (<em>Main aaya aur us ne mujh se baat ki.</em> - I came and he
              talked to me.)
            </li>
          </ul>
        </li>
        <li>
          <strong>Complex Sentences:</strong> One independent clause and at least
          one dependent (subordinate) clause, often introduced by words like
          <span className="urdu-text">جب</span>
          (<em>jab</em> - when),
          <span className="urdu-text">اگر</span>
          (<em>agar</em> - if),
          <span className="urdu-text">کیونکہ</span>
          (<em>kyunki</em> - because).
          <ul>
            <li>
              Example:
              <span className="urdu-text">جب میں آیا، وہ چلا گیا۔</span>
              (<em>Jab main aaya, woh chala gaya.</em> - When I came, he left.)
            </li>
          </ul>
        </li>
      </ul>

      <h2>Chapter Review & Quiz</h2>
      <div className="quiz-container">
        <h3>Chapter 3 Quiz</h3>
        <p>
          Test your understanding of Urdu sentence structure.
        </p>
        <div className="quiz-question">
          1. Break down the sentence into its subject (S) and predicate (P):
          <span className="urdu-text">پرندہ اُڑ رہا ہے۔</span>
          (<em>Parinda urh raha hai.</em> - The bird is flying.)
        </div>
        <div className="quiz-question">
          2. Change the word order of this sentence to the standard
          Subject-Object-Verb pattern:
          <span className="urdu-text">کھاتا ہے سیب لڑکا۔</span>
          (<em>Khata hai seb larka.</em> - The boy eats an apple.)
        </div>
        <div className="quiz-question">
          3. What kind of sentence is this:
          <span className="urdu-text">اگر بارش ہوتی، تو میں نہیں جاتا۔</span>
          (<em>Agar barish hoti, to main nahin jata.</em> - If it rained, I would
          not go.)
        </div>
        <div className="quiz-question">
          4. Form an interrogative (question) sentence from:
          <span className="urdu-text">وہ پڑھ رہا ہے۔</span>
          (<em>Woh parh raha hai.</em> - He is reading.)
        </div>
        <div className="quiz-question">
          5. Make this sentence negative:
          <span className="urdu-text">میں سکول جاتا ہوں۔</span>
          (<em>Main school jata hoon.</em> - I go to school.)
        </div>
        <div className="quiz-question">
          6. Give the polite imperative form for
          <span className="urdu-text">کھانا</span>
          (<em>khana</em> - to eat).
        </div>
        <div className="quiz-question">
          7. Complete the conditional:
          <span className="urdu-text">اگر وقت ہوتا، ...</span>
          (<em>Agar waqt hota, ...</em> - If there was time, ...) (Give a suitable
          result clause)
        </div>
        <div className="quiz-question">
          8. Add a relative clause to describe
          <span className="urdu-text">کتاب</span>
          (<em>kitaab</em> - book):
          <span className="urdu-text">میں نے کتاب خریدی۔</span>
          (<em>Main ne kitaab khareedi.</em> - I bought the book.) Use
          <span className="urdu-text">وہ</span>
          (<em>woh</em> - that) and
          <span className="urdu-text">پرانی</span>
          (<em>purani</em> - old).
        </div>
        <div className="quiz-answers">
          (Answers: 1. S:
          <span className="urdu-text">پرندہ</span>
          (<em>Parinda</em>), P:
          <span className="urdu-text">اُڑ رہا ہے۔</span>
          (<em>Urh raha hai.</em>); 2.
          <span className="urdu-text">لڑکا سیب کھاتا ہے۔</span>
          (<em>Larka seb khata hai.</em>); 3. Complex Sentence; 4.
          <span className="urdu-text">کیا وہ پڑھ رہا ہے؟</span>
          (<em>Kya woh parh raha hai?</em>); 5.
          <span className="urdu-text">میں سکول نہیں جاتا ہوں۔</span>
          (<em>Main school nahi jata hoon.</em>); 6.
          <span className="urdu-text">کھائیے۔</span>
          (<em>Khaiye.</em>); 7. ...
          <span className="urdu-text">تو میں آتا۔</span>
          (... <em>to main aata.</em> - ... then I would come.) OR ...
          <span className="urdu-text">تو ہم چلتے۔</span>
          (... <em>to hum chalte.</em> - ... then we would go.) (Any suitable unreal
          result); 8.
          <span className="urdu-text">میں نے وہ کتاب خریدی جو بہت پرانی تھی۔</span>
          (<em>Main ne woh kitaab khareedi jo bohat purani thi.</em> - I bought
          that book which was very old.)
        </div>
      </div>
    </div>
  );
};
