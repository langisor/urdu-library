"use client"

export default function Chapter4() {
  return (
    <div className="container">
      <h1>
        Chapter 4 - Verbs and Tenses (
        <span className="urdu-text">فعل اور زمانے</span>)
      </h1>
      <p>
        This chapter delves into the heart of Urdu sentence construction: verbs
        and their expression of time through tenses. Mastering tenses is crucial
        for conveying when an action happens.
      </p>
      <p>
        <strong>Core Verb Concept:</strong> The Urdu verb root (
        <span className="urdu-text">مصدر</span>- <em>Masdar</em>) is the base
        form (e.g.,
        <span className="urdu-text">کھانا</span>/ <code>khana</code> - to eat,
        <span className="urdu-text">پڑھنا</span>/ <code>parhna</code> - to read,
        <span className="urdu-text">جانا</span>/ <code>jana</code> - to go).
        Tenses are formed by modifying this root with suffixes and sometimes
        prefixes.
      </p>

      <h3>
        1. Present Tense (<span className="urdu-text">حال</span>- <em>Haal</em>)
      </h3>
      <p>
        Describes actions happening now, habitual actions, general truths, or
        future intentions (context-dependent).
      </p>
      <h4>
        a. Simple Present (<span className="urdu-text">سادہ حال</span>-{" "}
        <em>Sada Haal</em>)
      </h4>
      <ul>
        <li>
          <strong>Uses:</strong> Habitual actions (I eat breakfast), general
          truths (Water boils at 100°C), present states (I live in Karachi),
          scheduled future events (The train leaves at 5 PM).
        </li>
        <li>
          <strong>Formation:</strong> Verb Root + Present Tense Suffix.
        </li>
      </ul>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                Person (<span className="urdu-text">انگریزی</span>)
              </th>
              <th>
                Person (<span className="urdu-text">اردو</span>)
              </th>
              <th>Suffix</th>
              <th>
                Conjugation (<span className="urdu-text">کھانا</span>)
              </th>
              <th>Romanization</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>I (1st Sg.)</td>
              <td>
                <span className="urdu-text">میں</span>
              </td>
              <td>
                -<span className="urdu-text">تا ہوں</span>/ -
                <span className="urdu-text">تی ہوں</span>
              </td>
              <td>
                <span className="urdu-text">میں کھاتا ہوں</span>
                <br />
                <span className="urdu-text">میں کھاتی ہوں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Main khata hoon</code> (M)
                  <br />
                  <code>Main khati hoon</code> (F)
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Inf. Sg.)</td>
              <td>
                <span className="urdu-text">تو</span>
              </td>
              <td>
                -<span className="urdu-text">تا ہے</span>/ -
                <span className="urdu-text">تی ہے</span>
              </td>
              <td>
                <span className="urdu-text">تو کھاتا ہے</span>
                <br />
                <span className="urdu-text">تو کھاتی ہے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Tu khata hai</code> (M)
                  <br />
                  <code>Tu khati hai</code> (F)
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Form. Sg/Pl)</td>
              <td>
                <span className="urdu-text">آپ</span>
              </td>
              <td>
                -<span className="urdu-text">تے ہیں</span>/ -
                <span className="urdu-text">تی ہیں</span>
              </td>
              <td>
                <span className="urdu-text">آپ کھاتے ہیں</span>
                <br />
                <span className="urdu-text">آپ کھاتی ہیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Aap khate hain</code> (M)
                  <br />
                  <code>Aap khati hain</code> (F)
                </span>
              </td>
            </tr>
            <tr>
              <td>He/That (Sg.)</td>
              <td>
                <span className="urdu-text">وہ</span>
              </td>
              <td>
                -<span className="urdu-text">تا ہے</span>/ -
                <span className="urdu-text">تی ہے</span>
              </td>
              <td>
                <span className="urdu-text">وہ کھاتا ہے</span>
                <br />
                <span className="urdu-text">وہ کھاتی ہے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Woh khata hai</code> (M)
                  <br />
                  <code>Woh khati hai</code> (F)
                </span>
              </td>
            </tr>
            <tr>
              <td>We (1st Pl.)</td>
              <td>
                <span className="urdu-text">ہم</span>
              </td>
              <td>
                -<span className="urdu-text">تے ہیں</span>/ -
                <span className="urdu-text">تی ہیں</span>
              </td>
              <td>
                <span className="urdu-text">ہم کھاتے ہیں</span>
                <br />
                <span className="urdu-text">ہم کھاتی ہیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Hum khate hain</code> (M)
                  <br />
                  <code>Hum khati hain</code> (F)
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Inf. Pl.)</td>
              <td>
                <span className="urdu-text">تم</span>
              </td>
              <td>
                -<span className="urdu-text">تے ہو</span>/ -
                <span className="urdu-text">تی ہو</span>
              </td>
              <td>
                <span className="urdu-text">تم کھاتے ہو</span>
                <br />
                <span className="urdu-text">تم کھاتی ہو</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Tum khate ho</code> (M)
                  <br />
                  <code>Tum khati ho</code> (F)
                </span>
              </td>
            </tr>
            <tr>
              <td>They/Those (Pl.)</td>
              <td>
                <span className="urdu-text">وہ</span>
              </td>
              <td>
                -<span className="urdu-text">تے ہیں</span>/ -
                <span className="urdu-text">تی ہیں</span>
              </td>
              <td>
                <span className="urdu-text">وہ کھاتے ہیں</span>
                <br />
                <span className="urdu-text">وہ کھاتی ہیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Woh khate hain</code> (M)
                  <br />
                  <code>Woh khati hain</code> (F)
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li>
          <strong>Gender Agreement:</strong> The suffix (<code>-ta</code>/
          <code>-ti</code>) and auxiliary (<code>hoon</code>/<code>hai</code>/
          <code>hain</code>/<code>ho</code>) agree with the gender of the{" "}
          <em>subject</em>.
        </li>
        <li>
          <strong>Example:</strong>
          <span className="urdu-text">
            وہ روزانہ اخبار
            <strong>پڑھتی</strong>
            ہے۔
          </span>
          (
          <code>
            Woh rozana akhbaar <strong>parhti</strong> hai.
          </code>{" "}
          - She reads the newspaper daily.)
        </li>
      </ul>

      <h4>
        b. Present Continuous (<span className="urdu-text">استمراری حال</span>-{" "}
        <em>Istimrari Haal</em>)
      </h4>
      <ul>
        <li>
          <strong>Uses:</strong> Actions happening <em>right now</em> (I am
          eating), temporary actions (He is staying with us this week).
        </li>
        <li>
          <strong>Formation:</strong> **
          <span className="urdu-text">رہا / رہی / رہے</span>
          ** (<code>raha</code>/<code>rahi</code>/<code>rahe</code>) + Present
          Tense of **
          <span className="urdu-text">ہونا</span>
          ** (<code>hona</code> - to be).
        </li>
      </ul>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                Person (<span className="urdu-text">انگریزی</span>)
              </th>
              <th>
                Person (<span className="urdu-text">اردو</span>)
              </th>
              <th>Form (Masc.)</th>
              <th>Romanization (M)</th>
              <th>Form (Fem.)</th>
              <th>Romanization (F)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>I (1st Sg.)</td>
              <td>
                <span className="urdu-text">میں</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہا ہوں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha raha hoon</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی ہوں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi hoon</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Inf. Sg.)</td>
              <td>
                <span className="urdu-text">تو</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہا ہے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha raha hai</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی ہے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi hai</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Form. Sg/Pl)</td>
              <td>
                <span className="urdu-text">آپ</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہے ہیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahe hain</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی ہیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi hain</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>He/That (Sg.)</td>
              <td>
                <span className="urdu-text">وہ</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہا ہے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha raha hai</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی ہے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi hai</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>We (1st Pl.)</td>
              <td>
                <span className="urdu-text">ہم</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہے ہیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahe hain</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی ہیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi hain</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Inf. Pl.)</td>
              <td>
                <span className="urdu-text">تم</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہے ہو</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahe ho</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی ہو</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi ho</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>They/Those (Pl.)</td>
              <td>
                <span className="urdu-text">وہ</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہے ہیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahe hain</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی ہیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi hain</code>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li>
          <strong>Agreement:</strong>
          <code>رہا</code>/<code>رہی</code>/<code>رہے</code>
          agrees with the <em>subject's</em> gender and number. The auxiliary (
          <code>ہوں</code>/<code>ہے</code>/<code>ہیں</code>/<code>ہو</code>)
          agrees with the <em>person and number</em> of the subject.
        </li>
        <li>
          <strong>Example:</strong>
          <span className="urdu-text">
            بچے پارک میں
            <strong>کھیل رہے ہیں</strong>۔
          </span>
          (
          <code>
            Bachay park mein <strong>khel rahe hain</strong>.
          </code>{" "}
          - The children are playing in the park.)
        </li>
      </ul>

      <h3>
        2. Past Tense (<span className="urdu-text">ماضی</span>- <em>Maazi</em>)
      </h3>
      <p>Describes actions completed before the present moment.</p>
      <h4>
        a. Simple Past (<span className="urdu-text">سادہ ماضی</span>-{" "}
        <em>Sada Maazi</em>)
      </h4>
      <ul>
        <li>
          <strong>Uses:</strong> Completed actions at a specific or unspecified
          time in the past (I ate, She went home yesterday).
        </li>
        <li>
          <strong>Formation:</strong> Verb Root + Past Tense Suffix.
        </li>
      </ul>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                Person (<span className="urdu-text">انگریزی</span>)
              </th>
              <th>
                Person (<span className="urdu-text">اردو</span>)
              </th>
              <th>Suffix</th>
              <th>
                Conjugation (<span className="urdu-text">کھانا</span>)
              </th>
              <th>Romanization</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>I (1st Sg.)</td>
              <td>
                <span className="urdu-text">میں</span>
              </td>
              <td>
                <span className="urdu-text">-ا</span>
              </td>
              <td>
                <span className="urdu-text">میں کھایا</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Main khaya</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Inf. Sg.)</td>
              <td>
                <span className="urdu-text">تو</span>
              </td>
              <td>
                <span className="urdu-text">-ا</span>
              </td>
              <td>
                <span className="urdu-text">تو کھایا</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Tu khaya</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Form. Sg/Pl)</td>
              <td>
                <span className="urdu-text">آپ</span>
              </td>
              <td>
                <span className="urdu-text">-ے</span>
              </td>
              <td>
                <span className="urdu-text">آپ کھائے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Aap khaye</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>He/That (Sg.)</td>
              <td>
                <span className="urdu-text">وہ</span>
              </td>
              <td>
                <span className="urdu-text">-ا</span>
              </td>
              <td>
                <span className="urdu-text">وہ کھایا</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Woh khaya</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>We (1st Pl.)</td>
              <td>
                <span className="urdu-text">ہم</span>
              </td>
              <td>
                <span className="urdu-text">-ے</span>
              </td>
              <td>
                <span className="urdu-text">ہم کھائے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Hum khaye</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Inf. Pl.)</td>
              <td>
                <span className="urdu-text">تم</span>
              </td>
              <td>
                <span className="urdu-text">-ے</span>
              </td>
              <td>
                <span className="urdu-text">تم کھائے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Tum khaye</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>They/Those (Pl.)</td>
              <td>
                <span className="urdu-text">وہ</span>
              </td>
              <td>
                <span className="urdu-text">-ے</span>
              </td>
              <td>
                <span className="urdu-text">وہ کھائے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Woh khaye</code>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li>
          <strong>Note:</strong> The suffix (<code>-a</code>/<code>-e</code>)
          changes based on person. Unlike present,{" "}
          <strong>
            gender agreement is absent in the simple past verb form itself
          </strong>{" "}
          for most persons. However, the <em>subject</em> or <em>object</em>{" "}
          might imply gender contextually.
        </li>
        <li>
          <strong>Example:</strong>
          <span className="urdu-text">
            کل میں سینما
            <strong>گیا</strong>۔
          </span>
          (
          <code>
            Kal main cinema <strong>gaya</strong>.
          </code>{" "}
          - Yesterday I went to the cinema. - Masc speaker)
        </li>
        <li>
          <strong>
            'Ne' (<span className="urdu-text">نے</span>) with Transitive Verbs:
          </strong>{" "}
          This is CRUCIAL.
          <ul>
            <li>
              <strong>Rule:</strong> In the simple past tense,{" "}
              <strong>transitive verbs</strong> (verbs that take a direct object
              - e.g., eat <em>something</em>, read <em>a book</em>, see{" "}
              <em>him</em>) require the ergative particle{" "}
              <strong>
                <code>ne</code> (<span className="urdu-text">نے</span>)
              </strong>{" "}
              <em>after the subject</em>.
            </li>
            <li>
              The verb **agrees in gender and number with the <em>object</em>**,
              not the subject.
            </li>
            <li>
              <strong>Intransitive verbs</strong> (verbs without a direct object
              - e.g., go, sleep, laugh) do <em>not</em> take <code>ne</code>,
              and the verb agrees with the subject.
            </li>
            <li>
              <strong>Examples:</strong>
              <ul>
                <li>
                  <span className="urdu-text">لڑکے نے کتاب پڑھی۔</span>(
                  <code>
                    Larkay <strong>ne</strong> kitaab <strong>parhi</strong>.
                  </code>{" "}
                  - The boy read the book.) [Transitive: <code>ne</code> used,
                  verb <code>parhi</code> (f sg) agrees with object{" "}
                  <code>kitaab</code> (f sg)]
                </li>
                <li>
                  <span className="urdu-text">لڑکا گیا</span>۔ (
                  <code>
                    Larka <strong>gaya</strong>.
                  </code>{" "}
                  - The boy went.) [Intransitive: No <code>ne</code>, verb{" "}
                  <code>gaya</code> (m sg) agrees with subject{" "}
                  <code>larka</code> (m sg)]
                </li>
                <li>
                  <span className="urdu-text">
                    استاد نے طالب علموں کو دیکھا۔
                  </span>
                  (
                  <code>
                    Ustaad <strong>ne</strong> talib ilmon{" "}
                    <strong>ko dekha</strong>.
                  </code>{" "}
                  - The teacher saw the students.) [Transitive: <code>ne</code>{" "}
                  used, verb <code>dekha</code> (m sg) agrees with object{" "}
                  <em>phrase</em> <code>talib ilmon ko</code> treated as
                  singular collective]
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <h4>
        b. Past Continuous (<span className="urdu-text">استمراری ماضی</span>-{" "}
        <em>Istimrari Maazi</em>)
      </h4>
      <ul>
        <li>
          <strong>Uses:</strong> An ongoing action in the past (I was eating
          when he called), setting a scene (It was raining).
        </li>
        <li>
          <strong>Formation:</strong> **
          <span className="urdu-text">رہا / رہی / رہے</span>
          ** (<code>raha</code>/<code>rahi</code>/<code>rahe</code>) + Past
          Tense of **
          <span className="urdu-text">ہونا</span>
          ** (<code>hona</code> - to be).
        </li>
      </ul>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                Person (<span className="urdu-text">انگریزی</span>)
              </th>
              <th>
                Person (<span className="urdu-text">اردو</span>)
              </th>
              <th>Form (Masc.)</th>
              <th>Romanization (M)</th>
              <th>Form (Fem.)</th>
              <th>Romanization (F)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>I (1st Sg.)</td>
              <td>
                <span className="urdu-text">میں</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہا تھا</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha raha tha</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی تھی</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi thi</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Inf. Sg.)</td>
              <td>
                <span className="urdu-text">تو</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہا تھا</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha raha tha</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی تھی</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi thi</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Form. Sg/Pl)</td>
              <td>
                <span className="urdu-text">آپ</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہے تھے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahe the</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی تھیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi thin</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>He/That (Sg.)</td>
              <td>
                <span className="urdu-text">وہ</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہا تھا</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha raha tha</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی تھی</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi thi</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>We (1st Pl.)</td>
              <td>
                <span className="urdu-text">ہم</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہے تھے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahe the</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی تھیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi thin</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Inf. Pl.)</td>
              <td>
                <span className="urdu-text">تم</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہے تھے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahe the</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی تھیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi thin</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>They/Those (Pl.)</td>
              <td>
                <span className="urdu-text">وہ</span>
              </td>
              <td>
                <span className="urdu-text">کھا رہے تھے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahe the</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا رہی تھیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha rahi thin</code>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li>
          <strong>Agreement:</strong>
          <code>رہا</code>/<code>رہی</code>/<code>رہے</code>
          agrees with the <em>subject's</em> gender and number. The past tense
          auxiliary (<code>تھا</code>/<code>تھی</code>/<code>تھے</code>/
          <code>تھیں</code>) agrees with the <em>subject's</em> gender and
          number.
        </li>
        <li>
          <strong>Example:</strong>
          <span className="urdu-text">
            جب فون بجا، میں
            <strong>سو رہا تھا</strong>۔
          </span>
          (
          <code>
            Jab phone baja, main <strong>so raha tha</strong>.
          </code>{" "}
          - When the phone rang, I was sleeping. - Masc speaker)
        </li>
      </ul>

      <h4>
        c. Past Perfect (<span className="urdu-text">ماضی بعید</span>-{" "}
        <em>Maazi Baeed</em>)
      </h4>
      <ul>
        <li>
          <strong>Uses:</strong> An action completed{" "}
          <em>before another past action</em> (I had eaten before he arrived),
          an action completed before a specific time in the past (She had left
          by 5 PM).
        </li>
        <li>
          <strong>Formation:</strong> **
          <span className="urdu-text">چکا / چکی / چکے</span>
          ** (<code>chuka</code>/<code>chuki</code>/<code>chuke</code>) + Past
          Tense of **
          <span className="urdu-text">ہونا</span>
          ** (<code>hona</code> - to be).
        </li>
      </ul>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                Person (<span className="urdu-text">انگریزی</span>)
              </th>
              <th>
                Person (<span className="urdu-text">اردو</span>)
              </th>
              <th>Form (Masc.)</th>
              <th>Romanization (M)</th>
              <th>Form (Fem.)</th>
              <th>Romanization (F)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>I (1st Sg.)</td>
              <td>
                <span className="urdu-text">میں</span>
              </td>
              <td>
                <span className="urdu-text">کھا چکا تھا</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuka tha</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا چکی تھی</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuki thi</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Inf. Sg.)</td>
              <td>
                <span className="urdu-text">تو</span>
              </td>
              <td>
                <span className="urdu-text">کھا چکا تھا</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuka tha</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا چکی تھی</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuki thi</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Form. Sg/Pl)</td>
              <td>
                <span className="urdu-text">آپ</span>
              </td>
              <td>
                <span className="urdu-text">کھا چکے تھے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuke the</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا چکی تھیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuki thin</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>He/That (Sg.)</td>
              <td>
                <span className="urdu-text">وہ</span>
              </td>
              <td>
                <span className="urdu-text">کھا چکا تھا</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuka tha</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا چکی تھی</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuki thi</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>We (1st Pl.)</td>
              <td>
                <span className="urdu-text">ہم</span>
              </td>
              <td>
                <span className="urdu-text">کھا چکے تھے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuke the</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا چکی تھیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuki thin</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>You (Inf. Pl.)</td>
              <td>
                <span className="urdu-text">تم</span>
              </td>
              <td>
                <span className="urdu-text">کھا چکے تھے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuke the</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا چکی تھیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuki thin</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>They/Those (Pl.)</td>
              <td>
                <span className="urdu-text">وہ</span>
              </td>
              <td>
                <span className="urdu-text">کھا چکے تھے</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuke the</code>
                </span>
              </td>
              <td>
                <span className="urdu-text">کھا چکی تھیں</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Kha chuki thin</code>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li>
          <strong>Agreement:</strong>
          <code>چکا</code>/<code>چکی</code>/<code>چکے</code>
          agrees with the <em>subject's</em> gender and number. The past tense
          auxiliary (<code>تھا</code>/<code>تھی</code>/<code>تھے</code>/
          <code>تھیں</code>) agrees with the <em>subject's</em> gender and
          number.
        </li>
        <li>
          <strong>'Ne' Rule:</strong> Follows the same transitive/intransitive
          rules as Simple Past.
          <ul>
            <li>
              <strong>Example:</strong>
              <span className="urdu-text">
                جب وہ پہنچا، ٹرین
                <strong>جا چکی تھی</strong>۔
              </span>
              (
              <code>
                Jab woh pahunchna, train <strong>ja chuki thi</strong>.
              </code>{" "}
              - When he arrived, the train had already left.) [Intransitive - No{" "}
              <code>ne</code>]
            </li>
            <li>
              <strong>Example:</strong>
              <span className="urdu-text">
                میں نے خط
                <strong>لکھا تھا</strong>
                جب اس نے فون کیا۔
              </span>
              (
              <code>
                Main <strong>ne</strong> khat <strong>likha tha</strong> jab us
                ne phone kiya.
              </code>{" "}
              - I had written the letter when she called.) [Transitive -{" "}
              <code>ne</code> used, verb agrees with object <code>khat</code> (m
              sg)]
            </li>
          </ul>
        </li>
      </ul>

      <h4>
        d. Past Habitual (<span className="urdu-text">عادت ماضی</span>-{" "}
        <em>Aadat-e-Maazi</em>)
      </h4>
      <ul>
        <li>
          <strong>Uses:</strong> Habitual or repeated actions in the past (I
          used to play cricket, She would always help).
        </li>
        <li>
          <strong>Formation:</strong> Verb Root + Past Habitual Suffix + Past
          Tense of **
          <span className="urdu-text">ہونا</span>
          ** (<code>hona</code> - to be).
        </li>
      </ul>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                Person (<span className="urdu-text">انگریزی</span>)
              </th>
              <th>
                Person (<span className="urdu-text">اردو</span>)
              </th>
              <th>Suffix</th>
              <th>
                Conjugation (<span className="urdu-text">کھانا</span>)
              </th>
              <th>Romanization</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>I (1st Sg.)</td>
              <td>
                <span className="urdu-text">میں</span>
              </td>
              <td>
                <span className="urdu-text">-تا تھا / -تی تھی</span>
              </td>
              <td>
                <span className="urdu-text">میں کھاتا تھا</span>
                <br />
                <span className="urdu-text">میں کھاتی تھی</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Main khata tha</code> (M)
                  <br />
                  <code>Main khati thi</code> (F)
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
