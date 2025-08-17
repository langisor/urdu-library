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
import {ArrowLeft} from "lucide-react";
export const Chapter4 = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  return (
    <div className="container">
      <Button onClick={() => navigateTo("toc")} className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-300">
        &larr; Back to Table of Contents
      </Button>
      <h1>
        Chapter 4 - Verbs and Tenses (
        <span className="urdu-text">فعل اور زمانے</span>
        )
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
        1. Present Tense (<span className="urdu-text">حال</span>-{" "}
        <em>Haal</em>)
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
          truths (Water boils at 100°C), or actions happening in the present.
        </li>
        <li>
          <strong>Formation:</strong> Verb Root + Present Suffix + Present
          Tense of{" "}
          <span className="urdu-text">ہونا</span>
          (<code>hona</code> - to be).
        </li>
      </ul>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Person (English)</th>
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
                <span className="urdu-text">-تا ہوں / -تی ہوں</span>
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
              <td>You (2nd Sg. informal)</td>
              <td>
                <span className="urdu-text">تم</span>
              </td>
              <td>
                <span className="urdu-text">-تے ہو / -تی ہو</span>
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
              <td>He/She/It (3rd Sg.)</td>
              <td>
                <span className="urdu-text">وہ</span>
              </td>
              <td>
                <span className="urdu-text">-تا ہے / -تی ہے</span>
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
              <td>You (2nd Sg./Pl. formal)</td>
              <td>
                <span className="urdu-text">آپ</span>
              </td>
              <td>
                <span className="urdu-text">-تے ہیں / -تی ہیں</span>
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
              <td>We (1st Pl.)</td>
              <td>
                <span className="urdu-text">ہم</span>
              </td>
              <td>
                <span className="urdu-text">-تے ہیں / -تی ہیں</span>
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
              <td>They (3rd Pl.)</td>
              <td>
                <span className="urdu-text">وہ</span>
              </td>
              <td>
                <span className="urdu-text">-تے ہیں / -تی ہیں</span>
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

      <h3>
        2. Past Tense (<span className="urdu-text">ماضی</span>-{" "}
        <em>Maazi</em>)
      </h3>
      <p>
        Used for actions completed in the past. It's important to note the
        ergative case, where the subject pronoun changes form.
      </p>
      <h4>
        a. Simple Past (<span className="urdu-text">ماضی مطلق</span>-{" "}
        <em>Maazi Mutlaq</em>)
      </h4>
      <ul>
        <li>
          <strong>Uses:</strong> Simple completed actions in the past.
        </li>
        <li>
          <strong>Formation:</strong> Verb Root + Suffix (based on gender/number
          of object).
        </li>
        <li>
          <strong>Note:</strong> With transitive verbs (verbs that take an
          object), the subject takes the postposition
          <span className="urdu-text">نے</span>
          (<code>ne</code>) and the verb agrees with the object. With intransitive
          verbs (no object), the verb agrees with the subject.
        </li>
      </ul>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Person (English)</th>
              <th>
                Person (<span className="urdu-text">اردو</span>)
              </th>
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
                <span className="urdu-text">میں نے</span>
              </td>
              <td>
                <span className="urdu-text">میں نے کھانا کھایا</span>
              </td>
              <td>
                <span className="urdu-roman">
                  <code>Main ne khana khaya</code>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>
        b. Past Continuous (<span className="urdu-text">ماضی جاری</span>-{" "}
        <em>Maazi Jaari</em>)
      </h4>
      <ul>
        <li>
          <strong>Uses:</strong> Actions that were happening continuously in the
          past.
        </li>
        <li>
          <strong>Formation:</strong> Verb Root +
          <span className="urdu-text">رہا تھا</span>
          (<code>raha tha</code>),
          <span className="urdu-text">رہی تھی</span>
          (<code>rahi thi</code>), etc.
        </li>
      </ul>

      <h4>
        c. Past Habitual (<span className="urdu-text">ماضی عادی</span>-{" "}
        <em>Maazi Aadi</em>)
      </h4>
      <ul>
        <li>
          <strong>Uses:</strong> Actions that were habitual or regular in the
          past.
        </li>
        <li>
          <strong>Formation:</strong> Verb Root + Past Habitual Suffix + Past
          Tense of{" "}
          <span className="urdu-text">ہونا</span>
          (<code>hona</code> - to be).
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
};


