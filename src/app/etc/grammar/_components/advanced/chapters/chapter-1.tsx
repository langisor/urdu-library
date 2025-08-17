"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BackButton } from "./back-button";
import { Card, CardContent } from "@/components/ui/card";
import { chapter1QuizData } from "./quizzes";
import { QuizComponent } from "./quiz-components";

export const Chapter1 = ({
  navigateTo,
}: {
  navigateTo: (page: string) => void;
}) => {
  return (
    <div className="inter-text">
      <BackButton navigateTo={navigateTo} />
      <h1>Chapter 1: The Building Blocks</h1>
      <Card>
        <CardContent>
          Assalam-o-Alaikum and Welcome!
          <span className="nastaliq-bold">
            (السلام علیکم اور خوش آمدید -{" "}
            <span className="roman">Assalam-o-Alaikum aur Khush Aamdid!</span>)
          </span>
        </CardContent>
      </Card>

      <h2 className="inter-text p-2 my-4">
        1.1 Introduction to the Urdu Language: A Tapestry of History
      </h2>
      <Card>
        <CardContent>
          Urdu, our
          <span className="roman">qaumi zaban</span> (
          <span className="urdu-text">قومی زبان</span> - National Language), is
          more than just words. It's a vibrant tapestry woven over centuries!
          Born in the Indian subcontinent around the 12th-13th centuries, it
          developed in military camps
          <span className="urdu-text">
            (_urdu_ itself means "army" or "camp" in Turkish)
          </span>
          . It absorbed vocabulary and structure from Persian, Arabic, Turkish,
          and Sanskrit, creating a unique and expressive language known for its
          <span className="urdu-text">
            <span className="roman">muhabbat</span> (محبت - love)
          </span>
          ,
          <span className="urdu-text">
            <span className="roman">adaab</span> (آداب - respect)
          </span>
          , and poetic richness. Understanding its grammar helps us appreciate
          its depth and use it correctly and beautifully.
        </CardContent>
      </Card>

      <h2 className="inter-text p-2 my-4">
        1.2 The Script: Naskh vs. Nastaliq - Beauty in Calligraphy
      </h2>
      <Card>
        <CardContent>
          Urdu is written from right to left using a modified Perso-Arabic
          script. The two main calligraphic styles are:
          <ul>
            <li>
              <span className="inter-text">Naskh (نسخ):</span> A clearer, more
              upright style, often used for print and digital media due to its
              legibility.
            </li>
            <li>
              <span className="nastaliq-bold">Nastaliq (نستعلیق):</span> The
              fluid, cursive, and elegant style that is the traditional standard
              for Urdu. It's beautiful to read but can be challenging to
              typeset. This guide primarily uses Nastaliq for Urdu script
              examples.
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <h2 className="inter-text p-2 my-4">
          1.3 The Urdu Alphabet: <span className="roman">Huroof-e-Tahajji</span>{" "}
          (<span className="urdu-text">حروفِ تہجی</span>)
        </h2>
        <CardContent>
          <p>
            Urdu has 38 letters. We will introduce a selection of common ones
            here along with their sounds.
          </p>
        </CardContent>
      </Card>
      <Card>
        <h2>1.4 Vowels and Diacritics: The Soul of Pronunciation</h2>
        <p>
          Urdu vowels are divided into short and long. Diacritics are symbols
          placed above or below letters to indicate short vowel sounds.
        </p>
        <CardContent>
          <ul>
            <li>
              <strong>Short Vowels (Harakat):</strong>
              <ul>
                <li>
                  <strong>Fatha (َ):</strong> Pronounced like the "a" in "cat"
                  or "about". Ex: <span className="urdu-text">بَ</span> (ba).
                </li>
                <li>
                  <strong>Kasra (ِ):</strong> Pronounced like the "i" in "sit".
                  Ex:
                  <span className="urdu-text">بِ</span> (bi).
                </li>
                <li>
                  <strong>Damma (ُ):</strong> Pronounced like the "u" in "put".
                  Ex:
                  <span className="urdu-text">بُ</span> (bu).
                </li>
              </ul>
            </li>
            <li>
              <strong>Long Vowels:</strong>
              <ul>
                <li>
                  <strong>Alif (ا):</strong> The sound of "a" in "father". Ex:
                  <span className="urdu-text">آ</span> (aa),
                  <span className="urdu-text">بات</span> (baat).
                </li>
                <li>
                  <strong>Wao (و):</strong> Can be "oo" as in "soon" or "o" as
                  in "go". Ex: <span className="urdu-text">لوگ</span> (log -
                  people), <span className="urdu-text">دور</span> (door - far).
                </li>
                <li>
                  <strong>Yay (ی/ے):</strong> The sound of "ee" as in "feet" or
                  "ay" as in "say". Ex: <span className="urdu-text">تیز</span>{" "}
                  (tez - fast), <span className="urdu-text">آئی</span> (aayi -
                  came).
                </li>
              </ul>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <h2>1.5 Connecting Letters: _Ittisaal_ (اتصال)</h2>
        <CardContent>
          <p>
            The majority of Urdu letters change shape depending on their
            position in a word (beginning, middle, end). This is the core of
            Nastaliq calligraphy. Some letters, however, never connect to the
            letter immediately following them (e.g., ا, د, ڈ, ذ, ر, ڑ, ز, ژ, و).
          </p>
        </CardContent>
      </Card>

      <Card>
        <h2>1.6 Syllabification and Stress</h2>
        <CardContent>
          <p>
            Syllables in Urdu are formed by combinations of consonants and
            vowels. Stress is generally placed on the penultimate
            (second-to-last) syllable, especially in words of three or more
            syllables.
          </p>
        </CardContent>
      </Card>
      <Card>
        <h2>Chapter Review & Quiz</h2>
        <CardContent>
          <div className="quiz-container">
            <h3>Chapter 1 Quiz</h3>
            <p>
              Test your knowledge on the foundational elements of the Urdu
              language.
            </p>
            <Card>
              <div className="quiz-question">
                1. Which calligraphic style is considered the standard for Urdu
                and is known for its fluid, cursive nature?
              </div>
              <CardContent>
                <ol className="quiz-options">
                  <li>Naskh</li>
                  <li>Nastaliq</li>
                  <li>Kufic</li>
                  <li>Thuluth</li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <div className="quiz-question">
                2. The letter
                <span className="urdu-text"> پ</span>
                is pronounced as:
              </div>
              <CardContent>
                <ol className="quiz-options">
                  <li>'b' as in 'ball'</li>
                  <li>'t' as in 'tea'</li>
                  <li>'p' as in 'pen'</li>
                  <li>'k' as in 'kite'</li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <div className="quiz-question">
                3. How many letters does the Urdu alphabet contain?
              </div>
              <CardContent>
                <ol className="quiz-options">
                  <li>28</li>
                  <li>32</li>
                  <li>38</li>
                  <li>44</li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <div className="quiz-question">
                4. The long vowel sound 'aa' as in 'father' is represented by
                which Urdu letter?
              </div>
              <CardContent>
                <ol className="quiz-options">
                  <li>
                    <span className="urdu-text">ب</span>
                  </li>
                  <li>
                    <span className="urdu-text">آ</span>
                  </li>
                  <li>
                    <span className="urdu-text">ی</span>
                  </li>
                  <li>
                    <span className="urdu-text">و</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <div className="quiz-question">
                5. A symbol placed above or below a letter to indicate a short
                vowel sound is called a:
              </div>
              <CardContent>
                <ol className="quiz-options">
                  <li>Consonant</li>
                  <li>Diacritic (or Harakat)</li>
                  <li>Long vowel</li>
                  <li>Aspirated letter</li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <div className="quiz-question">
                6. True or False: All Urdu letters must connect to the letter
                immediately following them in a word.
              </div>
              <CardContent>
                <ol className="quiz-options">
                  <li>True</li>
                  <li>False</li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <div className="quiz-question">
                7. What does
                <span className="urdu-text"> تشدید</span>
                (Shadda / Tashdeed) do to a consonant?
              </div>
              <CardContent>
                <ol className="quiz-options">
                  <li>Makes it silent</li>
                  <li>Adds a vowel sound after it</li>
                  <li>Doubles it (pronounce it longer)</li>
                  <li>Changes its sound completely</li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <div className="quiz-question">
                8. What does Jazam/Sukoon ( ْ ) indicate?
              </div>
              <CardContent>
                <ol className="quiz-options">
                  <li>A long vowel</li>
                  <li>A short vowel</li>
                  <li>No vowel sound after the consonant</li>
                  <li>A glottal stop</li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <div className="quiz-question">
                9. How many syllables are in the word "استاد" (Ustaad -
                Teacher)?
              </div>
              <CardContent>
                <ol className="quiz-options">
                  <li>1 (Us-taad)</li>
                  <li>2 (Us-tad)</li>
                  <li>3 (U-s-taad)</li>
                  <li>4</li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <div className="quiz-question">
                10. Where does stress usually fall in Urdu words?
              </div>
              <CardContent>
                <ol className="quiz-options">
                  <li>On the first syllable</li>
                  <li>On the last syllable</li>
                  <li>On the second-last (penultimate) syllable</li>
                  <li>There is no fixed pattern</li>
                </ol>
              </CardContent>
            </Card>
            <div className="quiz-answers">
              (Answers: 1b, 2c, 3c, 4b, 5b, 6 False (e.g., ا, د, ڈ, etc. don't
              connect forward), 7c, 8c, 9b, 10c.)
            </div>
          </div>
        </CardContent>
      </Card>
      <div className=" border-t-6 border-black"></div>
      <QuizComponent questions={chapter1QuizData} title="Chapter 1 Quiz" />
    </div>
  );
};
