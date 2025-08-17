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
    <div className="container">
      <Button onClick={() => navigateTo("toc")} className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-300">
        &larr; Back to Table of Contents
      </Button>
      <h1>
        Chapter 2: Parts of Speech (Ajzaa-e-Kalaam)
      </h1>
      <p>
        <strong>Introduction:</strong> Words are the workers building sentences!
        This chapter introduces the different <em>types</em> of workers (parts of
        speech) in Urdu and their jobs.
      </p>

      <h3>
        2.1 Nouns (Ism,
        <span className="urdu-text">اسم</span>
        ): Naming Things
      </h3>
      <ul>
        <li>
          <strong>Definition:</strong> Words that name a person, place, thing,
          quality, or idea.
          <span className="urdu-text">کتاب</span>
          (Kitaab - Book),
          <span className="urdu-text">لڑکا</span>
          (Larka - Boy),
          <span className="urdu-text">لاہور</span>
          (Lahore - Lahore),
          <span className="urdu-text">محبت</span>
          (Muhabbat - Love),
          <span className="urdu-text">آزادی</span>
          (Aazaadi - Freedom).
        </li>
        <li>
          <strong>Types:</strong>
          <ul>
            <li>
              <strong>Common Noun (Ism-e-Aam,
                <span className="urdu-text">اسم عام</span>
                ):
              </strong>
              Names general things.
              <span className="urdu-text">شہر</span>
              (Shehar - City),
              <span className="urdu-text">نہر</span>
              (Nahar - River).
            </li>
            <li>
              <strong>Proper Noun (Ism-e-Khaas,
                <span className="urdu-text">اسم خاص</span>
                ):
              </strong>
              Names a specific person, place, or thing.
              <span className="urdu-text">علی</span>
              (Ali),
              <span className="urdu-text">پاکستان</span>
              (Pakistan),
              <span className="urdu-text">قرآن</span>
              (Quran).
            </li>
          </ul>
        </li>
        <li>
          <strong>Gender (Tazkeer-o-Taanees,
            <span className="urdu-text">تذکیر و تانیث</span>
            ):
          </strong>
          Urdu nouns have one of two genders:
          <ul>
            <li>
              <strong>Masculine (Muzakkar,
                <span className="urdu-text">مذکر</span>
                ):
              </strong>
              <span className="urdu-text">لڑکا</span>
              (Larka - boy),
              <span className="urdu-text">دروازہ</span>
              (Darwaaza - door).
            </li>
            <li>
              <strong>Feminine (Muannas,
                <span className="urdu-text">مؤنث</span>
                ):
              </strong>
              <span className="urdu-text">لڑکی</span>
              (Larki - girl),
              <span className="urdu-text">کتاب</span>
              (Kitaab - book).
            </li>
            <li>
              <strong>Rules:</strong>
              The gender of many nouns is unpredictable and must be memorized.
              However, some endings give clues (e.g., words ending in
              <span className="urdu-text">ا</span>
              often masculine, in
              <span className="urdu-text">ی</span>
              often feminine).
            </li>
          </ul>
        </li>
      </ul>

      <h3>
        2.2 Pronouns (Zameer,
        <span className="urdu-text">ضمیر</span>
        ): Stand-ins for Nouns
      </h3>
      <p>
        These replace nouns to avoid repetition.
      </p>
      <ul>
        <li>
          <strong>I/Me:</strong>
          <span className="urdu-text">میں</span>
          (Main)
        </li>
        <li>
          <strong>You:</strong>
          <span className="urdu-text">تم</span>
          (Tum - informal),
          <span className="urdu-text">آپ</span>
          (Aap - formal/plural)
        </li>
        <li>
          <strong>He/She/It/They:</strong>
          <span className="urdu-text">وہ</span>
          (Woh)
        </li>
        <li>
          <strong>We:</strong>
          <span className="urdu-text">ہم</span>
          (Hum)
        </li>
      </ul>

      <h3>
        2.3 Adjectives (Sifat,
        <span className="urdu-text">صفت</span>
        ): Describing Nouns
      </h3>
      <p>
        Adjectives describe or modify nouns and pronouns. They usually precede
        the noun they modify.
      </p>
      <ul>
        <li>
          Example:
          <span className="urdu-text">
            خوبصورت پھول
          </span>
          (Khoobsurat phool - beautiful flower),
          <span className="urdu-text">بڑا گھر</span>
          (Bara ghar - big house).
        </li>
        <li>
          <strong>Agreement:</strong> Some adjectives change their endings to
          match the gender and number of the noun.
          <br />
          <span className="urdu-text">موٹا لڑکا</span>
          (Mota larka - fat boy)
          <br />
          <span className="urdu-text">موٹی لڑکی</span>
          (Moti larki - fat girl)
        </li>
      </ul>

      <h3>
        2.4 Verbs (Fe'l,
        <span className="urdu-text">فعل</span>
        ): The Action Words
      </h3>
      <p>
        Verbs describe an action, state, or occurrence. They are the core of the
        sentence.
      </p>
      <ul>
        <li>
          Infinitive verbs in Urdu always end with
          <span className="urdu-text">نا</span>
          (-na).
        </li>
        <li>
          Example:
          <span className="urdu-text">جانا</span>
          (Jana - to go),
          <span className="urdu-text">پڑھنا</span>
          (Parhna - to read).
        </li>
      </ul>

      <h3>
        2.5 Adverbs (Mutalaq Fe'l,
        <span className="urdu-text">متعلق فعل</span>
        ): Modifying Actions
      </h3>
      <p>
        Adverbs modify a verb, adjective, or another adverb.
      </p>
      <ul>
        <li>
          Example:
          <span className="urdu-text">تیز دوڑنا</span>
          (Tez daurna - to run fast),
          <span className="urdu-text">آہستہ چلنا</span>
          (Aahista chalna - to walk slowly).
        </li>
      </ul>

      <h3>
        2.6 Postpositions (Huroof-e-Rabt,
        <span className="urdu-text">حروفِ ربط</span>
        ): The Opposite of Prepositions
      </h3>
      <p>
        These are words that come <em>after</em> a noun or pronoun to show a
        relationship (location, possession, etc.).
      </p>
      <ul>
        <li>
          Common examples:
          <span className="urdu-text">میں</span>
          (mein - in),
          <span className="urdu-text">پر</span>
          (par - on),
          <span className="urdu-text">سے</span>
          (se - from/by),
          <span className="urdu-text">کو</span>
          (ko - to/for).
        </li>
      </ul>

      <h3>
        2.7 Conjunctions (Huroof-e-Atf,
        <span className="urdu-text">حروفِ عطف</span>
        ): Connecting Words
      </h3>
      <p>
        Conjunctions join words, phrases, or clauses.
      </p>
      <ul>
        <li>
          Example:
          <span className="urdu-text">اور</span>
          (aur - and),
          <span className="urdu-text">یا</span>
          (ya - or),
          <span className="urdu-text">لیکن</span>
          (lekin - but).
        </li>
      </ul>

      <h3>
        2.8 Interjections (Huroof-e-Nidaa,
        <span className="urdu-text">حروفِ ندا</span>
        ): Expressing Emotion
      </h3>
      <p>
        Words used to express strong emotion or surprise.
      </p>
      <ul>
        <li>
          Example:
          <span className="urdu-text">ارے!</span>
          (Arey! - Hey!),
          <span className="urdu-text">اف!</span>
          (Uff! - Ugh!),
          <span className="urdu-text">واہ!</span>
          (Wah! - Wow!).
        </li>
      </ul>

      <h2>Chapter Review & Quiz</h2>
      <div className="quiz-container">
        <h3>Chapter 2 Quiz</h3>
        <p>
          Test your knowledge of the different parts of speech in Urdu.
        </p>
        <div className="quiz-question">
          1. Identify the feminine noun:
        </div>
        <ol className="quiz-options">
          <li>
            <span className="urdu-text">دروازہ</span>
            (Door)
          </li>
          <li>
            <span className="urdu-text">کتاب</span>
            (Book)
          </li>
          <li>
            <span className="urdu-text">لڑکا</span>
            (Boy)
          </li>
        </ol>
        <div className="quiz-question">
          2. The word
          <span className="urdu-text"> وہ</span>
          (Woh) can function as a pronoun for which of the following?
        </div>
        <ol className="quiz-options">
          <li>Only "He" or "She"</li>
          <li>Only "They"</li>
          <li>"He," "She," "It," and "They"</li>
        </ol>
        <div className="quiz-question">
          3. Which of the following is an example of an adjective in Urdu?
        </div>
        <ol className="quiz-options">
          <li>
            <span className="urdu-text">گھر</span>
            (Ghar - house)
          </li>
          <li>
            <span className="urdu-text">جانا</span>
            (Jana - to go)
          </li>
          <li>
            <span className="urdu-text">خوبصورت</span>
            (Khoobsurat - beautiful)
          </li>
          <li>
            <span className="urdu-text">اور</span>
            (Aur - and)
          </li>
        </ol>
        <div className="quiz-question">
          4. Which verb form ends with
          <span className="urdu-text">نا</span>
          (-na)?
        </div>
        <ol className="quiz-options">
          <li>Past Tense</li>
          <li>Present Tense</li>
          <li>Future Tense</li>
          <li>Infinitive</li>
        </ol>
        <div className="quiz-question">
          5. Which word is a postposition?
        </div>
        <ol className="quiz-options">
          <li>
            <span className="urdu-text">کیوں</span>
            (Kyun - why)
          </li>
          <li>
            <span className="urdu-text">کاش</span>
            (Kaash - I wish)
          </li>
          <li>
            <span className="urdu-text">پر</span>
            (Par - on)
          </li>
          <li>
            <span className="urdu-text">جب</span>
            (Jab - when)
          </li>
        </ol>
        <div className="quiz-question">
          6. In the phrase
          <span className="urdu-text"> آہستہ چلو</span>
          (Aahista chalo - Walk slowly), the word
          <span className="urdu-text"> آہستہ</span>
          (Aahista - slowly) is a(n):
        </div>
        <ol className="quiz-options">
          <li>Adjective</li>
          <li>Adverb</li>
          <li>Pronoun</li>
          <li>Noun</li>
        </ol>
        <div className="quiz-question">
          7. A verb describes:
        </div>
        <ol className="quiz-options">
          <li>The action itself</li>
          <li>The receiver of the action</li>
          <li>The doer of the action</li>
          <li>The time of the action</li>
        </ol>
        <div className="quiz-question">
          8. Identify the conjunction:
          <span className="urdu-text">میں آیا لیکن وہ نہیں آیا۔</span>
          (Main aaya lekin woh nahin aaya. - I came but he did not come.)
        </div>
        <ol className="quiz-options">
          <li>
            <span className="urdu-text">میں</span>
            (Main)
          </li>
          <li>
            <span className="urdu-text">آیا</span>
            (Aaya)
          </li>
          <li>
            <span className="urdu-text">لیکن</span>
            (Lekin)
          </li>
          <li>
            <span className="urdu-text">وہ</span>
            (Woh)
          </li>
        </ol>
        <div className="quiz-question">
          9. True or False: The postposition
          <span className="urdu-text">کا</span>
          (ka) must agree in gender and number with the
          <em>possessor</em> noun.
        </div>
        <div className="quiz-question">
          10. The word
          <span className="urdu-text">اف!</span>
          (Uff!) is an example of:
        </div>
        <ol className="quiz-options">
          <li>Adjective</li>
          <li>Conjunction</li>
          <li>Interjection</li>
          <li>Adverb</li>
        </ol>
        <div className="quiz-answers">
          (Answers: 1b, 2c, 3c, 4d, 5c, 6b, 7a, 8c, 9 False (It agrees with the{" "}
          <em>possessed</em> noun), 10c)
        </div>
      </div>
    </div>
  );
};