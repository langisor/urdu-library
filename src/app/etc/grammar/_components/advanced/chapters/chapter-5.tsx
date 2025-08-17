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
    <div className="container">
      <Button onClick={() => navigateTo("toc")} className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-300">
        &larr; Back to Table of Contents
      </Button>
      <h1>Chapter 5: Advanced Grammar & Stylistics - A Comprehensive Guide</h1>
      <p>
        This chapter delves into the finer points of Urdu grammar, equipping you
        with tools for sophisticated expression, nuanced meaning, and stylistic
        flair.
      </p>

      <h3>
        1. Case and its Role (<span className="urdu-text">حالت</span>-{" "}
        <em>Haalat</em>)
      </h3>
      <ul>
        <li>
          <strong>Concept:</strong> Case refers to the grammatical function of a
          noun or pronoun in a sentence (Subject, Direct Object, Indirect
          Object, Instrument, Location, etc.). Unlike languages with extensive
          declensions (like Russian or Latin), Urdu primarily uses{" "}
          <strong>postpositions</strong> (words <em>following</em> the noun) and
          specific verb agreements to indicate case relationships.
        </li>
      </ul>
      <h4>How Forms Change:</h4>
      <ul>
        <li>
          <strong>Pronouns:</strong> Pronouns change form significantly based on
          case. (See Chapter 4 for Pronoun Tables - Nominative,
          Accusative/Dative, Ergative, Oblique).
          <ul>
            <li>
              Nominative:
              <span className="urdu-text">وہ کتاب پڑھتا ہے۔</span>
              (Who reads? He - <em>Woh kitab parhta hai.</em>)
            </li>
            <li>
              Accusative/Dative:
              <span className="urdu-text">میں نے اس کو دیکھا۔</span>
              (Whom did I see? Him - <em>Main ne us ko dekha.</em>)
            </li>
          </ul>
        </li>
        <li>
          <strong>Nouns:</strong> Nouns can take an oblique form (e.g.,
          <span className="urdu-text">گھر</span>
          - <em>ghar</em> &rarr;
          <span className="urdu-text">گھر میں</span>
          - <em>ghar mein</em>) or a postposition. This is the primary mechanism
          for showing case.
        </li>
      </ul>

      <h3>
        2. Active and Passive Voice (<span className="urdu-text">صوتی حالت</span>-{" "}
        <em>Souti Haalat</em>)
      </h3>
      <ul>
        <li>
          <strong>Active Voice:</strong> The subject performs the action.
          <br />
          <span className="urdu-text">وہ خط لکھتا ہے۔</span>
          (<em>Woh khat likhta hai.</em> - He writes a letter.)
        </li>
        <li>
          <strong>Passive Voice:</strong> The subject receives the action. This
          is formed with the verb
          <span className="urdu-text">جانا</span>
          (<em>jaana</em> - to go) or
          <span className="urdu-text">ہونا</span>
          (<em>hona</em> - to be) used as an auxiliary verb.
          <br />
          <span className="urdu-text">خط لکھا جاتا ہے۔</span>
          (<em>Khat likha jata hai.</em> - The letter is written.)
        </li>
      </ul>

      <h3>
        3. Direct and Indirect Speech (<span className="urdu-text">بلاواسطہ اور بالواسطہ</span>-{" "}
        <em>Bilaa-wastah aur Bil-wastah Kalaam</em>)
      </h3>
      <ul>
        <li>
          <strong>Direct Speech:</strong> Quoting someone's exact words.
          <br />
          <span className="urdu-text">اس نے کہا، "میں آ رہا ہوں۔"</span>
          (<em>Us ne kaha, "Main aa raha hoon."</em> - He said, "I am coming.")
        </li>
        <li>
          <strong>Indirect Speech:</strong> Reporting what someone said without
          using their exact words. The tense and pronouns often change.
          <br />
          <span className="urdu-text">اس نے کہا کہ وہ آ رہا تھا۔</span>
          (<em>Us ne kaha ke woh aa raha tha.</em> - He said that he was coming.)
        </li>
      </ul>

      <h3>
        4. Prefixes and Suffixes (<span className="urdu-text">سابقے اور لاحقے</span>-{" "}
        <em>Saabiqay aur Laahiqay</em>)
      </h3>
      <p>
        These are small word parts added to the beginning or end of a word to
        change its meaning or function.
      </p>
      <h4>Common Prefixes:</h4>
      <ul>
        <li>
          <strong>بد-</strong> (<em>bad-</em>): Means "bad, ill, evil."
          <br />
          <span className="urdu-text">بدقسمتی</span>
          (<em>bad-qismati</em> - bad luck) &larr;
          <span className="urdu-text">قسمت</span>
          (<em>qismat</em> - luck)
        </li>
        <li>
          <strong>بے-</strong> (<em>be-</em>): Means "without."
          <br />
          <span className="urdu-text">بےعزت</span>
          (<em>be-izzat</em> - without respect) &larr;
          <span className="urdu-text">عزت</span>
          (<em>izzat</em> - respect)
        </li>
        <li>
          <strong>نا-</strong> (<em>na-</em>): Means "not."
          <br />
          <span className="urdu-text">نااہل</span>
          (<em>na-a'hil</em> - not capable) &larr;
          <span className="urdu-text">اہل</span>
          (<em>a'hil</em> - capable)
        </li>
      </ul>

      <h4>Common Suffixes:</h4>
      <ul>
        <li>
          <strong>-ی</strong> (<em>-i</em>): Forms adjectives or nouns.
          <br />
          <span className="urdu-text">پاکستانی</span>
          (<em>Pakistani</em>- Pakistani),
          <span className="urdu-text">دوستی</span>
          (<em>dosti</em> - Friendship),
          <span className="urdu-text">آسمانی</span>
          (<em>aasmani</em> - Heavenly)
        </li>
        <li>
          <strong>-گی</strong> (<em>-gi</em>): Forms abstract nouns.
          <br />
          <span className="urdu-text">چھوٹی</span>
          (<em>chhoti</em>- smallness),
          <span className="urdu-text">بڑی</span>
          (<em>bari</em>- bigness/elderness),
          <span className="urdu-text">جوانی</span>
          (<em>jawani</em>- youth)
        </li>
        <li>
          <strong>-انہ</strong> (<em>-ana</em>): Forms adverbs or adjectives
          meaning "in the manner of."
          <br />
          <span className="urdu-text">انسانانہ</span>
          (<em>insaanaana</em>- humanely),
          <span className="urdu-text">دوستانہ</span>
          (<em>dostaana</em>- friendly),
          <span className="urdu-text">شہزادیانہ</span>
          (<em>shehzadiaana</em>- princess-like)
        </li>
        <li>
          <strong>-دار</strong> (<em>-dar</em>): Possessor of, holder of.
          <br />
          <span className="urdu-text">ملک دار</span>
          (<em>mulk-dar</em>- landowner),
          <span className="urdu-text">عزت دار</span>
          (<em>izzat-dar</em>- respectable),
          <span className="urdu-text">عہدہ دار</span>
          (<em>ohda-dar</em>- officeholder)
        </li>
        <li>
          <strong>-ستان</strong> (<em>-stan</em>): Place of, land of.
          <br />
          <span className="urdu-text">پاکستان</span>
          (<em>Pakistan</em>- Land of the Pure),
          <span className="urdu-text">ہندوستان</span>
          (<em>Hindustan</em>- Land of Hindus),
          <span className="urdu-text">باغستان</span>
          (<em>baghistan</em>- orchard)
        </li>
      </ul>
      <h3>
        5. The use of <span className="urdu-text">کو</span> (<em>ko</em>),{" "}
        <span className="urdu-text">پر</span> (<em>par</em>),{" "}
        <span className="urdu-text">سے</span> (<em>se</em>) as case markers.
      </h3>
      <ul>
        <li>
          <span className="urdu-text">کو</span>
          (<em>ko</em>): Used to mark the direct object of a transitive verb (for
          definite nouns) or the indirect object.
          <br />
          <span className="urdu-text">میں نے اس کو دیکھا۔</span>
          (<em>Main ne us ko dekha.</em> - I saw him.)
          <br />
          <span className="urdu-text">اس نے مجھے ایک کتاب دی۔</span>
          (<em>Us ne mujhe ek kitaab di.</em> - He gave a book to me.)
        </li>
        <li>
          <span className="urdu-text">پر</span>
          (<em>par</em>): Means "on" or "at."
          <br />
          <span className="urdu-text">کتاب میز پر ہے۔</span>
          (<em>Kitaab mez par hai.</em> - The book is on the table.)
        </li>
        <li>
          <span className="urdu-text">سے</span>
          (<em>se</em>): A versatile postposition meaning "from," "with," "by,"
          or "than."
          <br />
          <span className="urdu-text">وہ گھر سے آیا۔</span>
          (<em>Woh ghar se aaya.</em> - He came from home.)
        </li>
      </ul>

      <h3>6. The Concept of Emphasis and its various forms in Urdu.</h3>
      <p>
        Emphasis is used to highlight a specific part of a sentence.
      </p>
      <ul>
        <li>
          <strong>Particles:</strong>
          <span className="urdu-text">ہی</span>
          (<em>hi</em>) and
          <span className="urdu-text">بھی</span>
          (<em>bhi</em>).
          <br />
          <span className="urdu-text">میں نے ہی کیا ہے۔</span>
          (<em>Main ne hi kiya hai.</em> - I
          <strong>myself</strong> did it.)
          <br />
          <span className="urdu-text">وہ بھی آیا۔</span>
          (<em>Woh bhi aaya.</em> - He came
          <strong>too</strong>.)
        </li>
        <li>
          <strong>Word Order:</strong> Moving a word to a less common position in
          the sentence.
        </li>
        <li>
          <strong>Repetition:</strong> Repeating a word for emphasis.
        </li>
      </ul>

      <h2>Chapter Review & Quiz</h2>
      <div className="quiz-container">
        <h3>Chapter 5 Quiz</h3>
        <div className="quiz-question">
          1. In the sentence
          <span className="urdu-text">میں نے اس کو دیکھا۔</span>
          (<em>Main ne us ko dekha.</em> - I saw him.), what grammatical function
          does the pronoun
          <span className="urdu-text">اس کو</span>
          (<em>us ko</em>) serve?
        </div>
        <ol className="quiz-options">
          <li>Subject</li>
          <li>Indirect Object</li>
          <li>Direct Object</li>
          <li>Instrument</li>
        </ol>

        <div className="quiz-question">
          2. The passive voice in Urdu is formed using an auxiliary verb like:
        </div>
        <ol className="quiz-options">
          <li>
            <span className="urdu-text">لکھنا</span>
            (<em>likhna</em> - to write)
          </li>
          <li>
            <span className="urdu-text">جانا</span>
            (<em>jaana</em> - to go)
          </li>
          <li>
            <span className="urdu-text">کرنا</span>
            (<em>karna</em> - to do)
          </li>
          <li>
            <span className="urdu-text">آنا</span>
            (<em>aana</em> - to come)
          </li>
        </ol>

        <div className="quiz-question">
          3. Transform this sentence from direct to indirect speech:
          <span className="urdu-text">اس نے کہا، "میں لاہور جا رہا ہوں۔"</span>
          (<em>Us ne kaha, "Main Lahore ja raha hoon."</em> - He said, "I am going
          to Lahore.")
        </div>
        <div className="quiz-question">
          4. Which prefix is used to mean "without"?
        </div>
        <ol className="quiz-options">
          <li>
            <span className="urdu-text">بد-</span>
            (<em>bad-</em>)
          </li>
          <li>
            <span className="urdu-text">نا-</span>
            (<em>na-</em>)
          </li>
          <li>
            <span className="urdu-text">بے-</span>
            (<em>be-</em>)
          </li>
          <li>
            <span className="urdu-text">کم-</span>
            (<em>kam-</em>)
          </li>
        </ol>

        <div className="quiz-question">
          5. What is the meaning of the suffix
          <span className="urdu-text">-ستان</span>
          (<em>-stan</em>)?
        </div>
        <div className="quiz-question">
          6. In Urdu, the postposition
          <span className="urdu-text">سے</span>
          (<em>se</em>) is used to show a relationship. Give a sentence showing
          its use to mean "from."
        </div>
        <div className="quiz-question">
          7. Identify the emphatic particle in the sentence:
          <span className="urdu-text">میں نے یہ کام ہی کیا ہے۔</span>
          (<em>Main ne yeh kaam hi kiya hai.</em> - I did this work myself.)
        </div>
        <ol className="quiz-options">
          <li>
            <span className="urdu-text">میں</span>
          </li>
          <li>
            <span className="urdu-text">یہ</span>
          </li>
          <li>
            <span className="urdu-text">ہی</span>
          </li>
          <li>
            <span className="urdu-text">کام</span>
          </li>
        </ol>
        <div className="quiz-answers">
          (Answers: 1c, 2b, 3.
          <span className="urdu-text">اس نے کہا کہ وہ لاہور جا رہا تھا۔</span>
          (<em>Us ne kaha ke woh Lahore ja raha tha.</em>), 4c, 5. Place of, Land
          of, 6.
          <span className="urdu-text">وہ گھر سے آیا۔</span>
          (<em>Woh ghar se aaya.</em> - He came from home.), 7c)
        </div>
      </div>
    </div>
  );
};