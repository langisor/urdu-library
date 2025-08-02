"use client"
import "./custom.css";

export default function Chapter5() {
  return (
    <div className="container">
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
              <span className="urdu-text">
                میں نے <strong>اسے</strong> کتاب دی۔
              </span>
              (To whom? Him - <em>Usay kitab di.</em>)
            </li>
            <li>
              Ergative:
              <span className="urdu-text">
                <strong>اس نے</strong> کتاب پڑھی۔
              </span>
              (Who performed the action? He - <em>Us ne kitab parhi.</em> - Note
              verb agreement with feminine object 'kitab')
            </li>
          </ul>
        </li>
        <li>
          <strong>Nouns:</strong> Nouns themselves generally do <em>not</em>{" "}
          change form for case. Their case is marked almost exclusively by the
          postpositions attached to them (<code>ne</code>, <code>ko</code>,{" "}
          <code>se</code>, <code>par</code>, <code>mein</code>,{" "}
          <code>ka/ke/ki</code>).
          <ul>
            <li>
              Nominative:
              <span className="urdu-text">
                <strong>لڑکا</strong> کھیل رہا ہے۔
              </span>
              (The boy is playing.)
            </li>
            <li>
              Ergative:
              <span className="urdu-text">
                <strong>لڑکے نے</strong> گیند پھینکی۔
              </span>
              (The boy threw the ball. - Requires transitive perfective verb)
            </li>
            <li>
              Accusative:
              <span className="urdu-text">
                میں نے <strong>لڑکے کو</strong> دیکھا۔
              </span>
              (I saw the boy.)
            </li>
            <li>
              Dative:
              <span className="urdu-text">
                میں نے <strong>لڑکے کو</strong> کتاب دی۔
              </span>
              (I gave the book <em>to the boy</em>.)
            </li>
          </ul>
        </li>
      </ul>

      <h3>
        2. Active and Passive Voice (
        <span className="urdu-text">فعل معروف / فعل مجہول</span>-{" "}
        <em>Fail Ma'roof / Fail Majhool</em>)
      </h3>
      <ul>
        <li>
          <strong>Concept:</strong> Voice indicates whether the subject performs
          the action (Active) or receives the action (Passive).
        </li>
        <li>
          <strong>Active Voice:</strong> Subject is the doer. Structure: Subject
          (+ <code>ne</code> if ergative) + Object + Verb (agreed with object if
          ergative).
          <ul>
            <li>
              <span className="urdu-text">
                لڑکا <strong>کتاب پڑھتا</strong> ہے۔
              </span>
              (The boy <em>reads</em> the book. - Present)
            </li>
            <li>
              <span className="urdu-text">
                لڑکے <strong>نے کتاب پڑھی</strong>۔
              </span>
              (The boy <em>read</em> the book. - Past Perfective)
            </li>
          </ul>
        </li>
        <li>
          <strong>Passive Voice:</strong> Subject is the receiver of the action.
          The doer (agent) is often omitted or introduced by <code>se</code> (
          <span className="urdu-text">سے</span>
          ). Structure: Subject (Receiver) + <code>se</code> (Agent - Optional)
          + Verb (Past Participle) + <code>jata hai</code>/<code>gaya</code>
          /etc. (Auxiliary matching tense)).
          <ul>
            <li>
              <span className="urdu-text">
                <strong>کتاب پڑھی جاتی</strong> ہے۔
              </span>
              (The book <em>is read</em>.)
            </li>
            <li>
              <span className="urdu-text">
                <strong>کتاب پڑھی گئی</strong>۔
              </span>
              (The book <em>was read</em>.)
            </li>
          </ul>
        </li>
        <li>
          <strong>Transformation Rules:</strong>
          <ol>
            <li>
              The Object of the Active sentence becomes the Subject of the
              Passive sentence.
            </li>
            <li>The Verb is changed to its Past Participle form.</li>
            <li>
              The auxiliary verb
              <code>jana</code> (to go) is added in the appropriate tense (
              <code>jata hai</code>,<code>jati hai</code>,<code>gaya</code>,
              <code>gayi</code>,<code>jaye ga</code>,<code>ja raha hai</code>,
              etc.).
            </li>
            <li>
              The Subject (Doer) of the Active sentence becomes optional and, if
              included, is preceded by
              <code>se</code> (<span className="urdu-text">سے</span>
              ).
            </li>
            <li>
              Verb agreement in Passive is always with the <em>new</em> Subject
              (the receiver).
            </li>
          </ol>
        </li>
      </ul>

      <h3>
        3. Direct and Indirect Speech (
        <span className="urdu-text">قولِ مستقیم / قولِ معاصر</span>-{" "}
        <em>Qaul-e-Mustaqeem / Qaul-e-Mua'sir</em>)
      </h3>
      <ul>
        <li>
          <strong>Concept:</strong> Reporting someone's words directly (exact
          quote) or indirectly (paraphrased report).
        </li>
        <li>
          <strong>Direct Speech:</strong> The exact words spoken are enclosed in
          quotation marks ("..."). The reporting verb (
          <span className="urdu-text">کہنا</span>,
          <span className="urdu-text">بتانا</span>,
          <span className="urdu-text">پوچھنا</span>, etc.) is followed by
          <code>ki</code> (<span className="urdu-text">کہ</span>) or a comma.
          <ul>
            <li>
              <span className="urdu-text">
                احمد نے <strong>کہا، "میں کل لاہور جاؤں گا۔"</strong>
              </span>
              (Ahmad said, <strong>"I will go to Lahore tomorrow."</strong>)
            </li>
          </ul>
        </li>
        <li>
          <strong>Indirect Speech:</strong> The reported words are integrated
          into the sentence structure of the reporter. Quotation marks are not
          used. Changes occur in pronouns, tenses, time/place words, and the
          structure after
          <code>ki</code> (<span className="urdu-text">کہ</span>
          ).
        </li>
        <li>
          <strong>Transformation Rules:</strong>
          <ol>
            <li>
              Remove Quotation Marks: Integrate the speech into the main
              sentence.
            </li>
            <li>
              Conjunction: Use
              <code>ki</code> (<span className="urdu-text">کہ</span>) after the
              reporting verb.
            </li>
            <li>
              Pronoun Shift: Pronouns within the quoted speech change to reflect
              the reporter's perspective.
            </li>
            <li>
              Tense Shift (Backshift): Tenses in the reported clause usually
              shift back in time relative to the reporting verb.
            </li>
            <li>
              Time/Place Word Shift:
              <ul>
                <li>
                  <span className="urdu-text">کل</span>
                  (tomorrow) -<span className="urdu-text">اگلے دن</span>
                  (the next day)
                </li>
                <li>
                  <span className="urdu-text">آج</span>
                  (today) -<span className="urdu-text">اُس دن</span>
                  (that day)
                </li>
                <li>
                  <span className="urdu-text">یہاں</span>
                  (here) -<span className="urdu-text">وہاں</span>
                  (there)
                </li>
                <li>
                  <span className="urdu-text">اب</span>
                  (now) -<span className="urdu-text">تب</span>
                  (then)
                </li>
              </ul>
            </li>
          </ol>
        </li>
      </ul>

      <h3>
        4. Prefixes and Suffixes (
        <span className="urdu-text">سابقے / لاحقے</span>-{" "}
        <em>Sabqay / Lahiqay</em>)
      </h3>
      <p>
        These affixes modify the meaning or grammatical function of root words.
      </p>

      <h4>
        Common Prefixes (<span className="urdu-text">سابقے</span>-{" "}
        <em>Sabqay</em>):
      </h4>
      <ul>
        <li>
          <strong>نا-</strong> (<em>Na-</em>): Negation, lack (
          <span className="urdu-text">نااہل</span>- Incompetent,
          <span className="urdu-text">ناقابل</span>- Unworthy,
          <span className="urdu-text">نادان</span>- Ignorant)
        </li>
        <li>
          <strong>بے-</strong> (<em>Be-</em>): Without, lacking (
          <span className="urdu-text">بےخوف</span>- Fearless,
          <span className="urdu-text">بےوقوف</span>- Foolish,
          <span className="urdu-text">بےچین</span>- Restless)
        </li>
        <li>
          <strong>بد-</strong> (<em>Bad-</em>): Bad, ill (
          <span className="urdu-text">بدکردار</span>- Ill-mannered,
          <span className="urdu-text">بدنام</span>- Infamous,
          <span className="urdu-text">بدگمان</span>- Suspicious)
        </li>
        <li>
          <strong>خود-</strong> (<em>Khud-</em>): Self (
          <span className="urdu-text">خودکار</span>- Automatic,
          <span className="urdu-text">خودکش</span>- Suicidal,
          <span className="urdu-text">خودغرض</span>- Selfish)
        </li>
      </ul>

      <h4>
        Common Suffixes (<span className="urdu-text">لاحقے</span>-{" "}
        <em>Lahiqay</em>):
      </h4>
      <ul>
        <li>
          <strong>-ی</strong> (<em>-i</em>): Forms abstract nouns, adjectives,
          relational adjectives (<span className="urdu-text">خوشی</span>-
          Happiness,
          <span className="urdu-text">پاکستانی</span>- Pakistani,
          <span className="urdu-text">دوستی</span>- Friendship,
          <span className="urdu-text">آسمانی</span>- Heavenly)
        </li>
        <li>
          <strong>-گی</strong> (<em>-gi</em>): Forms abstract nouns (
          <span className="urdu-text">چھوٹی</span>- Smallness,
          <span className="urdu-text">بڑی</span>- Bigness/Elderness,
          <span className="urdu-text">جوانی</span>- Youth) - Often feminine
          tendency.
        </li>
        <li>
          <strong>-انہ</strong> (<em>-ana</em>): Forms adverbs or adjectives
          meaning "in the manner of" (
          <span className="urdu-text">انسانانہ</span>- Humanely,
          <span className="urdu-text">دوستانہ</span>- Friendly,
          <span className="urdu-text">شہزادیانہ</span>- Princess-like)
        </li>
        <li>
          <strong>-دار</strong> (<em>-dar</em>): Possessor of, holder of (
          <span className="urdu-text">ملک دار</span>- Landowner,
          <span className="urdu-text">عزت دار</span>- Respectable,
          <span className="urdu-text">عہدہ دار</span>- Officeholder)
        </li>
        <li>
          <strong>-ستان</strong> (<em>-stan</em>): Place of, land of (
          <span className="urdu-text">پاکستان</span>- Land of the Pure,
          <span className="urdu-text">ہندوستان</span>- Land of Hindus,
          <span className="urdu-text">باغستان</span>- Orchard)
        </li>
      </ul>
    </div>
  );
}
