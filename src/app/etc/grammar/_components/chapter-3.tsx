"use client"
import "./custom.css";

import React from "react";

const Chapter3 = () => {
  return (
    <div className="container">
      <h1>
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

      <h3>1. Components of a Sentence (جملے کے اجزاء - _Jumlay ke Ajza_)</h3>
      <p>
        Every complete Urdu sentence fundamentally consists of two core parts:
      </p>
      <ul>
        <li>
          <strong>Subject (فاعل - _Faa'il_):</strong> This is the person, place,
          thing, or concept that performs the action or about which something is
          stated. It usually comes first.
          <ul>
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
          <ul>
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
          <ul>
            <li>
              Example:
              <span className="urdu-text">
                لڑکا
                <strong>کتاب</strong>
                پڑھتا ہے۔
              </span>
              (_Larka
              <strong>kitaab</strong>
              parhta hai._ - The boy reads
              <strong>a book</strong>
              .)
            </li>
          </ul>
        </li>
      </ul>
      <p>
        <strong>Key Point:</strong> Identifying the <em>Faa'il</em> (Subject)
        and <em>Khabar</em> (Predicate) is the first step to understanding or
        constructing any Urdu sentence.
      </p>

      <h3>2. Basic Sentence Patterns: SOV Order</h3>
      <p>
        Urdu follows a <strong>Subject-Object-Verb (SOV)</strong> structure.
        This is a significant difference from English (SVO).
      </p>
      <ul>
        <li>
          <strong>Standard SOV Pattern:</strong>{" "}
          <code>Subject + (Object) + Verb</code>
          <ul>
            <li>
              <span className="urdu-text">میں چائے پیتا ہوں۔</span>
              (_Main chai peeta hoon._) - I tea drink. (I drink tea.)
            </li>
            <li>
              <span className="urdu-text">وہ گاڑی دیکھ رہا ہے۔</span>
              (_Woh gaari dekh raha hai._) - He car watching is. (He is watching
              the car.)
            </li>
            <li>
              <span className="urdu-text">استاد نے طالب علم کو سمجھایا۔</span>
              (_Ustaad ne taalib ilm ko samjhaya._) - Teacher (erg.) student
              (obj.) explained. (The teacher explained to the student.)
              <em>(Note the use of postpositions like 'ne' and 'ko')</em>
            </li>
          </ul>
        </li>
      </ul>
      <p>
        <strong>Pro Tip:</strong> The verb is almost always at the <em>end</em>{" "}
        of the main clause. Remembering SOV is crucial!
      </p>

      <h3>3. Types of Sentences (جملوں کی اقسام - _Jumlon ki Iqsaam_)</h3>
      <p>Based on complexity and clauses:</p>
      <ul>
        <li>
          <strong>Simple Sentence (سادہ جملہ - _Saada Jumla_):</strong> Contains
          one subject and one predicate (one main clause). Expresses a single
          complete thought.
          <ul>
            <li>
              <span className="urdu-text">بارش ہو رہی ہے۔</span>
              (_Barish ho rahi hai._) - Rain is happening. (It is raining.)
            </li>
            <li>
              <span className="urdu-text">بچہ سو گیا۔</span>
              (_Bacha so gaya._) - The child slept.
            </li>
          </ul>
        </li>
        <li>
          <strong>Compound Sentence (مرکب جملہ - _Murakkab Jumla_):</strong>{" "}
          Joins two or more <em>independent</em> (simple) sentences of equal
          importance using conjunctions like
          <span className="urdu-text">اور</span>
          (_aur_ - and),
          <span className="urdu-text">لیکن</span>
          (_lekin_ - but),
          <span className="urdu-text">یا</span>
          (_ya_ - or),
          <span className="urdu-text">پس</span>
          (_pas_ - so/therefore).
          <ul>
            <li>
              <span className="urdu-text">
                میں نے کھانا کھایا
                <strong>اور</strong>
                وہ سونے چلا گیا۔
              </span>
              (_Main ne khana khaya
              <strong>aur</strong>
              woh sone chala gaya._) - I ate food
              <strong>and</strong>
              he went to sleep.
            </li>
            <li>
              <span className="urdu-text">
                وہ امیر ہے
                <strong>لیکن</strong>
                خوش نہیں ہے۔
              </span>
              (_Woh ameer hai
              <strong>lekin</strong>
              khush nahi hai._) - He is rich
              <strong>but</strong>
              not happy.
            </li>
          </ul>
        </li>
        <li>
          <strong>Complex Sentence (مُشکل جملہ - _Mushkil Jumla_):</strong>{" "}
          Contains one independent (main) clause and one or more{" "}
          <em>dependent</em> (subordinate) clauses. These clauses are joined by
          subordinating conjunctions like
          <span className="urdu-text">کہ</span>
          (_keh_ - that),
          <span className="urdu-text">اگر</span>
          (_agar_ - if),
          <span className="urdu-text">جب</span>
          (_jab_ - when),
          <span className="urdu-text">کیونکہ</span>
          (_kyunki_ - because).
          <ul>
            <li>
              <span className="urdu-text">
                <strong>جب</strong>
                بارش ہوتی ہے،
                <strong>تو</strong>
                موسم ٹھنڈا ہو جاتا ہے۔
              </span>
              (<strong>Jab</strong>
              barish hoti hai,
              <strong>to</strong>
              mausam thanda ho jata hai.) -<strong>When</strong>
              rain happens,
              <strong>then</strong>
              weather cold becomes. (When it rains, the weather becomes cold.)
              [Dependent clause starting with 'jab', Main clause starting with
              'to']
            </li>
            <li>
              <span className="urdu-text">
                میں جانتا ہوں
                <strong>کہ</strong>
                تم سچ بول رہے ہو۔
              </span>
              (_Main jaanta hoon
              <strong>keh</strong>
              tum sach bol rahe ho._) - I know
              <strong>that</strong>
              you truth speaking are. (I know that you are telling the truth.)
            </li>
          </ul>
        </li>
      </ul>

      <h3>
        4. Interrogative and Negative Sentences (سوالیہ اور منفی جملے - _Sawalia
        aur Manfi Jumlay_)
      </h3>
      <ul>
        <li>
          <strong>Interrogative (Questions):</strong>
          <ul>
            <li>
              <strong>Yes/No Questions:</strong> Add
              <span className="urdu-text">کیا</span>
              (_kya_) at the <em>beginning</em> of the sentence. The sentence
              structure otherwise remains SOV.
              <ul>
                <li>
                  <span className="urdu-text">کیا تم پڑھ رہے ہو؟</span>
                  (_Kya tum parh rahe ho?_) - Are you reading?
                </li>
                <li>
                  <span className="urdu-text">کیا یہ تمہاری کتاب ہے؟</span>
                  (_Kya yeh tumhari kitaab hai?_) - Is this your book?
                </li>
              </ul>
            </li>
            <li>
              <strong>Wh- Questions:</strong> Use question words like
              <span className="urdu-text">کون</span>
              (_kaun_ - who),
              <span className="urdu-text">کیا</span>
              (_kya_ - what),
              <span className="urdu-text">کب</span>
              (_kab_ - when),
              <span className="urdu-text">کہاں</span>
              (_kahan_ - where),
              <span className="urdu-text">کیوں</span>
              (_kyun_ - why),
              <span className="urdu-text">کیسے</span>
              (_kaise_ - how). The question word usually comes <em>first</em>,
              followed by the subject and the rest of the sentence (SOV).
              <ul>
                <li>
                  <span className="urdu-text">تم کہاں جارہے ہو؟</span>
                  (_Tum kahan ja rahe ho?_) - Where are you going?
                </li>
                <li>
                  <span className="urdu-text">اس نے کیوں کہا؟</span>
                  (_Us ne kyun kaha?_) - Why did he say?
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <strong>Negative Sentences:</strong> Use
          <span className="urdu-text">نہیں</span>
          (_nahi_) or
          <span className="urdu-text">مت</span>
          (_mat_) <strong>immediately before the main verb</strong>.
          <ul>
            <li>
              <span className="urdu-text">
                میں
                <strong>نہیں</strong>
                جانتا۔
              </span>
              (_Main
              <strong>nahi</strong>
              jaanta._) - I do not know.
            </li>
            <li>
              <span className="urdu-text">
                وہ
                <strong>نہیں</strong>
                آئیں گے۔
              </span>
              (_Woh
              <strong>nahi</strong>
              aayenge._) - They will not come.
            </li>
            <li>
              <strong>Imperative Negative (Prohibition):</strong> Use
              <span className="urdu-text">مت</span>
              (_mat_) directly before the verb.
              <ul>
                <li>
                  <span className="urdu-text">
                    <strong>مت</strong>
                    جاؤ!
                  </span>
                  (_<strong>Mat</strong> jao!_) - Don't go!
                </li>
                <li>
                  <span className="urdu-text">
                    <strong>مت</strong>
                    کرو!
                  </span>
                  (_<strong>Mat</strong> karo!_) - Don't do it!
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <h3>5. Imperative Sentences (حکمیہ جملے - _Hukmiya Jumlay_)</h3>
      <p>
        Used for commands, requests, instructions, or advice. The subject
        (usually 'you') is often omitted.
      </p>
      <ul>
        <li>
          <strong>Formation:</strong> Use the verb stem or its polite/formal
          form. Negation uses
          <span className="urdu-text">مت</span>
          (_mat_).
        </li>
        <li>
          <strong>Levels of Politeness:</strong>
          <ul>
            <li>
              <strong>Direct Command (Informal):</strong> Verb Stem (+ sometimes
              'o' sound)
              <ul>
                <li>
                  <span className="urdu-text">جاؤ!</span>
                  (_Jao!_) - Go!
                </li>
                <li>
                  <span className="urdu-text">کھاؤ!</span>
                  (_Khao!_) - Eat!
                </li>
                <li>
                  <span className="urdu-text">پڑھو!</span>
                  (_Parho!_) - Read!
                </li>
              </ul>
            </li>
            <li>
              <strong>Polite Request:</strong> Add 'یے' (_\-iye_) or 'ئیے'
              (_\-iye_) to the verb stem.
              <ul>
                <li>
                  <span className="urdu-text">بیٹھیے۔</span>
                  (_Baitheeye._) - Please sit. (Singular/Formal)
                </li>
                <li>
                  <span className="urdu-text">کھائیے۔</span>
                  (_Khaiye._) - Please eat.
                </li>
                <li>
                  <span className="urdu-text">بتائیے۔</span>
                  (_Bataiye._) - Please tell (me).
                </li>
              </ul>
            </li>
            <li>
              <strong>Very Polite/Formal/Plural:</strong> Use 'یں' (*-en*)
              suffix.
              <ul>
                <li>
                  <span className="urdu-text">تشریف رکھیں۔</span>
                  (_Tashreef rakhen._) - Please have a seat. (Very formal)
                </li>
                <li>
                  <span className="urdu-text">فرمائیں۔</span>
                  (_Farmayen._) - Please say/do. (Honorific)
                </li>
              </ul>
            </li>
            <li>
              <strong>Negative (Prohibition):</strong>
              <span className="urdu-text">مت</span>
              (_mat_) + Verb Stem.
              <ul>
                <li>
                  <span className="urdu-text">مت کرو!</span>
                  (_Mat karo!_) - Don't do it! (Informal)
                </li>
                <li>
                  <span className="urdu-text">مت کیجئے!</span>
                  (_Mat keejiye!_) - Please don't do it. (Polite)
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <h3>6. Conditional Sentences (شرطیہ جملے - _Shartia Jumlay_)</h3>
      <p>Express "if-then" situations. They have two parts:</p>
      <ul>
        <li>
          <strong>Condition Clause (شرط - _Shart_):</strong> Starts with
          <span className="urdu-text">اگر</span>
          (_agar_ - if).
        </li>
        <li>
          <strong>Result Clause (جزا - _Jazaa_):</strong> Often starts with
          <span className="urdu-text">تو</span>
          (_to_ - then), though it can be omitted.
        </li>
        <li>
          <strong>Key Rule:</strong> The tense/mood in the condition clause
          determines the tense/mood in the result clause.
        </li>
        <li>
          <strong>Common Patterns:</strong>
          <ul>
            <li>
              <strong>Possible Condition (Present/Future):</strong>{" "}
              <code>
                اگر + Present/Future , (تو) + Future/Present Habitual/Imperative
              </code>
              <ul>
                <li>
                  <span className="urdu-text">
                    اگر بارش ہوگی،
                    <strong>تو</strong>
                    ہم نہیں جائیں گے۔
                  </span>
                  (_Agar barish hogi,
                  <strong>to</strong>
                  hum nahi jayenge._) - If it rains, then we will not go.
                </li>
                <li>
                  <span className="urdu-text">
                    اگر وقت ملے،
                    <strong>تو</strong>
                    فون کرنا۔
                  </span>
                  (_Agar waqt mile,
                  <strong>to</strong>
                  phone karna._) - If (you) get time, then call (me).
                </li>
              </ul>
            </li>
            <li>
              <strong>Unreal/Hypothetical Condition (Past Subjunctive):</strong>{" "}
              <code>
                اگر + Past Subjunctive , (تو) + Past Subjunctive (often with
                'ہوتا'/'ہوتی' etc.)
              </code>
              <ul>
                <li>
                  <span className="urdu-text">
                    اگر میں امیر ہوتا،
                    <strong>تو</strong>
                    گھر خریدتا۔
                  </span>
                  (_Agar main ameer
                  <strong>hota</strong>,<strong>to</strong>
                  ghar khareedta._) - If I were rich, (then) I would buy a
                  house.
                </li>
                <li>
                  <span className="urdu-text">
                    اگر تم آتے،
                    <strong>تو</strong>
                    پارٹی مزیدار ہوتی۔
                  </span>
                  (_Agar tum aate,
                  <strong>to</strong>
                  party mazedar hoti._) - If you had come, the party would have
                  been fun.
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <h3>
        7. Relative Clauses (توصیفی فقرے - _Tauseefi Fiqray_ / مضافی جملے -
        _Izafi Jumlay_)
      </h3>
      <p>
        These are dependent clauses that describe a noun (the antecedent) in the
        main clause. They function like adjectives. Urdu uses
        <span className="urdu-text">
          <strong>جو</strong>
        </span>
        (_jo_ - who, which, that) to introduce relative clauses.
      </p>
      <ul>
        <li>
          <strong>Structure:</strong>{" "}
          <code>Antecedent (Noun) + جو (*jo*) + Relative Clause</code> (The verb
          of the relative clause comes at its end).
        </li>
        <li>
          <strong>Jo agrees with the antecedent in number and gender.</strong>{" "}
          Its form changes:
          <ul>
            <li>
              Masculine Singular:
              <span className="urdu-text">جو</span>
              (_jo_)
            </li>
            <li>
              Masculine Plural:
              <span className="urdu-text">جو</span>
              (_jo_) (Same as singular)
            </li>
            <li>
              Feminine Singular/Feminine Plural:
              <span className="urdu-text">جو</span>
              (_jo_) (Usually same form for feminine)
            </li>
          </ul>
        </li>
        <li>
          Examples:
          <ul>
            <li>
              <span className="urdu-text">
                وہ لڑکا
                <strong>جو</strong>
                کھیل رہا ہے۔
              </span>
              (_Woh larka
              <strong>jo</strong>
              khel raha hai._) - That boy
              <strong>who</strong>
              is playing.
            </li>
            <li>
              <span className="urdu-text">
                میں نے وہ کتاب پڑھی
                <strong>جو</strong>
                تم نے دی تھی۔
              </span>
              (_Main ne woh kitaab parhi
              <strong>jo</strong>
              tum ne di thi._) - I read that book
              <strong>which</strong>
              you had given.
            </li>
            <li>
              <span className="urdu-text">
                کیا تم ان عورتوں کو جانتی ہو
                <strong>جو</strong>
                کل آئی تھیں؟
              </span>
              (_Kya tum un aurton ko jaanti ho
              <strong>jo</strong>
              kal aai thin?_) - Do you know those women
              <strong>who</strong>
              came yesterday?
              <em>(Note 'jo' used for plural feminine antecedent)</em>
            </li>
          </ul>
        </li>
      </ul>

      <div className="review-section">
        <h3>Chapter Review (جملوں کی ساخت کا جائزہ)</h3>
        <ul>
          <li>
            Every sentence has a <strong>Subject (فاعل - _Faa'il_)</strong> and
            a <strong>Predicate (خبر - _Khabar_)</strong>.
          </li>
          <li>
            Urdu follows <strong>Subject-Object-Verb (SOV)</strong> word order.
          </li>
          <li>
            Sentences can be <strong>Simple</strong> (one clause),{" "}
            <strong>Compound</strong> (multiple independent clauses), or{" "}
            <strong>Complex</strong> (main clause + dependent clause(s)).
          </li>
          <li>
            <strong>Questions</strong> use _kya_ (for yes/no) or question words
            (who, what, etc.) usually at the start.
          </li>
          <li>
            <strong>Negatives</strong> use _nahi_ or _mat_ placed immediately
            before the main verb.
          </li>
          <li>
            <strong>Imperatives</strong> (commands/requests) use the verb stem
            directly, with suffixes (_-iye_, \*-en\*) for politeness. _Mat_ is
            used for prohibitions.
          </li>
          <li>
            <strong>Conditional Sentences</strong> use _agar_ (if) + condition
            clause, followed by _to_ (then) + result clause, with tense
            agreement between clauses.
          </li>
          <li>
            <strong>Relative Clauses</strong> describe nouns using _jo_ (who,
            which, that), which agrees in gender/number with the noun it
            describes.
          </li>
        </ul>
      </div>

      <div className="quiz-section">
        <h3>Quiz (سوالات - _Sawalaat_)</h3>
        <div className="quiz-question">
          1. Identify Subject (_Faa'il_) and Predicate (_Khabar_) in: "پرندہ اُڑ
          رہا ہے۔" (_Parinda urh raha hai._ - The bird is flying.)
        </div>
        <div className="quiz-question">
          2. Rearrange into correct SOV order: کھاتا ہے۔ سیب لڑکا (_Khata hai.
          Seb larka_ - eats. apple boy)
        </div>
        <div className="quiz-question">
          3. What type of sentence is: "اگر میں جلدی اٹھا، تو بس پکڑ لوں گا۔"
          (_Agar main jaldi utha, to bus pakar loonga._ - If I get up early, I
          will catch the bus.)? (Simple, Compound, Complex)
        </div>
        <div className="quiz-question">
          4. Turn this into a Yes/No question: "وہ پڑھ رہا ہے۔" (_Woh parh raha
          hai._ - He is reading.)
        </div>
        <div className="quiz-question">
          5. Make this sentence negative: "میں سکول جاتا ہوں۔" (_Main school
          jata hoon._ - I go to school.)
        </div>
        <div className="quiz-question">
          6. Give the polite imperative form for "کھانا" (_khana_ - to eat).
        </div>
        <div className="quiz-question">
          7. Complete the conditional: "اگر وقت ہوتا، ... " (_Agar waqt hota,
          ..._ - If there was time, ...) (Give a suitable result clause)
        </div>
        <div className="quiz-question">
          8. Add a relative clause to describe "کتاب" (_kitaab_ - book): "میں نے
          کتاب خریدی۔" (_Main ne kitaab khareedi._ - I bought the book.) Use
          "وہ" (_woh_ - that) and "پرانی" (_purani_ - old).
        </div>
        <div className="quiz-answers">
          (Answers: 1. S: پرندہ (_Parinda_), P: اُڑ رہا ہے۔ (_Urh raha hai._);
          2. لڑکا سیب کھاتا ہے۔ (_Larka seb khata hai._); 3. Complex Sentence;
          4. کیا وہ پڑھ رہا ہے؟ (_Kya woh parh raha hai?_); 5. میں سکول نہیں
          جاتا ہوں۔ (_Main school nahi jata hoon._); 6. کھائیے۔ (_Khaiye._); 7.
          ... تو میں آتا۔ (... _to main aata._ - ... then I would come.) OR ...
          تو ہم چلتے۔ (... _to hum chalte._ - ... then we would go.) (Any
          suitable unreal result); 8. میں نے **وہ** کتاب خریدی **جو پرانی تھی۔**
          (_Main ne **woh** kitaab khareedi **jo purani thi.**_) )
        </div>
      </div>
    </div>
  );
};

export default Chapter3;
