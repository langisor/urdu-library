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
    <div className="p-8">
      <Button
        onClick={() => navigateTo("toc")}
        className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-300"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Table of Contents
      </Button>
      <h1 className="text-4xl font-bold mb-4 text-teal-700">
        Chapter 4 - Verbs and Tenses (<span className="urdu-text">فعل اور زمانے</span>)
      </h1>
      <p>
        This chapter delves into the heart of Urdu sentence construction: verbs
        and their expression of time through tenses. Mastering tenses is crucial
        for conveying when an action happens.
      </p>
      <p>
        <strong>Core Verb Concept:</strong> The Urdu verb root (<span className="urdu-text">مصدر</span>- <em>Masdar</em>) is the base
        form (e.g., <span className="urdu-text">کھانا</span>/ <code>khana</code> - to eat,
        <span className="urdu-text">پڑھنا</span>/ <code>parhna</code> - to read,
        <span className="urdu-text">جانا</span>/ <code>jana</code> - to go).
        Tenses are formed by modifying this root with suffixes and sometimes
        prefixes.
      </p>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">1. Present Tense (<span className="urdu-text">حال</span>- <em>Haal</em>)</h2>
      <p>
        Describes actions happening now, habitual actions, general truths, or
        future intentions (context-dependent).
      </p>
      <h3 className="text-xl font-semibold text-teal-600 mb-2 mt-4">a. Simple Present (<span className="urdu-text">سادہ حال</span>- <em>Sada Haal</em>)</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Uses:</strong> Habitual actions (I eat breakfast), general
          truths (Water boils at 100°C), present states (I live in Karachi),
          scheduled future events (The train leaves at 5 PM).
        </li>
        <li>
          <strong>Formation:</strong> Verb Root + Present Tense Suffix.
        </li>
      </ul>
      <div className="table-container overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Person (<span className="urdu-text">انگریزی</span>)</TableHead>
              <TableHead>Person (<span className="urdu-text">اردو</span>)</TableHead>
              <TableHead>Suffix</TableHead>
              <TableHead>Conjugation (<span className="urdu-text">کھانا</span>)</TableHead>
              <TableHead>Romanization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>I (1st Sg.)</TableCell>
              <TableCell><span className="urdu-text">میں</span></TableCell>
              <TableCell>-<span className="urdu-text">تا ہوں</span>/ -<span className="urdu-text">تی ہوں</span></TableCell>
              <TableCell><span className="urdu-text">میں کھاتا ہوں</span><br /><span className="urdu-text">میں کھاتی ہوں</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Main khata hoon</code> (M)<br /><code>Main khati hoon</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>You (Inf. Sg.)</TableCell>
              <TableCell><span className="urdu-text">تو</span></TableCell>
              <TableCell>-<span className="urdu-text">تا ہے</span>/ -<span className="urdu-text">تی ہے</span></TableCell>
              <TableCell><span className="urdu-text">تو کھاتا ہے</span><br /><span className="urdu-text">تو کھاتی ہے</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Tu khata hai</code> (M)<br /><code>Tu khati hai</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>You (Form. Sg/Pl)</TableCell>
              <TableCell><span className="urdu-text">آپ</span></TableCell>
              <TableCell>-<span className="urdu-text">تے ہیں</span>/ -<span className="urdu-text">تی ہیں</span></TableCell>
              <TableCell><span className="urdu-text">آپ کھاتے ہیں</span><br /><span className="urdu-text">آپ کھاتی ہیں</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Aap khate hain</code> (M)<br /><code>Aap khati hain</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>He/That (Sg.)</TableCell>
              <TableCell><span className="urdu-text">وہ</span></TableCell>
              <TableCell>-<span className="urdu-text">تا ہے</span>/ -<span className="urdu-text">تی ہے</span></TableCell>
              <TableCell><span className="urdu-text">وہ کھاتا ہے</span><br /><span className="urdu-text">وہ کھاتی ہے</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Woh khata hai</code> (M)<br /><code>Woh khati hai</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>We (1st Pl.)</TableCell>
              <TableCell><span className="urdu-text">ہم</span></TableCell>
              <TableCell>-<span className="urdu-text">تے ہیں</span>/ -<span className="urdu-text">تی ہیں</span></TableCell>
              <TableCell><span className="urdu-text">ہم کھاتے ہیں</span><br /><span className="urdu-text">ہم کھاتی ہیں</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Hum khate hain</code> (M)<br /><code>Hum khati hain</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>They/Those (Pl.)</TableCell>
              <TableCell><span className="urdu-text">وہ</span></TableCell>
              <TableCell>-<span className="urdu-text">تے ہیں</span>/ -<span className="urdu-text">تی ہیں</span></TableCell>
              <TableCell><span className="urdu-text">وہ کھاتے ہیں</span><br /><span className="urdu-text">وہ کھاتی ہیں</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Woh khate hain</code> (M)<br /><code>Woh khati hain</code> (F)</span></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="mt-4">
        <em>
          Note: Verb ending depends on the gender of the subject:
          <span className="urdu-text">تا</span>
          (ta) for masculine, and
          <span className="urdu-text">تی</span>
          (ti) for feminine.
        </em>
      </p>

      <h3 className="text-xl font-semibold text-teal-600 mb-2 mt-4">b. Present Continuous (<span className="urdu-text">فعل حال جاری</span>- <em>Fe'l Haal Jaari</em>)</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Uses:</strong> Actions happening right now, in progress.
        </li>
        <li>
          <strong>Formation:</strong> Verb Root + Present Participle Suffix (-<span className="urdu-text">رہا</span>, -<span className="urdu-text">رہی</span>, -<span className="urdu-text">رہے</span>) + Present Tense of <span className="urdu-text">ہونا</span> (hona).
        </li>
      </ul>
      <div className="table-container overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Person (<span className="urdu-text">انگریزی</span>)</TableHead>
              <TableHead>Person (<span className="urdu-text">اردو</span>)</TableHead>
              <TableHead>Conjugation (<span className="urdu-text">کھانا</span>)</TableHead>
              <TableHead>Romanization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>I (1st Sg.)</TableCell>
              <TableCell><span className="urdu-text">میں</span></TableCell>
              <TableCell><span className="urdu-text">میں کھا رہا ہوں</span><br /><span className="urdu-text">میں کھا رہی ہوں</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Main kha raha hoon</code> (M)<br /><code>Main kha rahi hoon</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>He/She (Sg.)</TableCell>
              <TableCell><span className="urdu-text">وہ</span></TableCell>
              <TableCell><span className="urdu-text">وہ کھا رہا ہے</span><br /><span className="urdu-text">وہ کھا رہی ہے</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Woh kha raha hai</code> (M)<br /><code>Woh kha rahi hai</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>They (Pl.)</TableCell>
              <TableCell><span className="urdu-text">وہ</span></TableCell>
              <TableCell><span className="urdu-text">وہ کھا رہے ہیں</span><br /><span className="urdu-text">وہ کھا رہی ہیں</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Woh kha rahe hain</code> (M)<br /><code>Woh kha rahi hain</code> (F)</span></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">2. Past Tense (<span className="urdu-text">ماضی</span>- <em>Maazi</em>)</h2>
      <p>
        Used for actions completed in the past.
      </p>

      <h3 className="text-xl font-semibold text-teal-600 mb-2 mt-4">a. Simple Past (<span className="urdu-text">سادہ ماضی</span>- <em>Maazi Sada</em>)</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Uses:</strong> A finished action in the past, no indication of whether it was recent or long ago.
        </li>
        <li>
          <strong>Formation:</strong> Verb Root + Past Participle Suffix (-<span className="urdu-text">ا</span>, -<span className="urdu-text">ی</span>, -<span className="urdu-text">ے</span>).
        </li>
      </ul>
      <div className="table-container overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Person (<span className="urdu-text">انگریزی</span>)</TableHead>
              <TableHead>Person (<span className="urdu-text">اردو</span>)</TableHead>
              <TableHead>Conjugation (<span className="urdu-text">پڑھنا</span>)</TableHead>
              <TableHead>Romanization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>I (1st Sg.)</TableCell>
              <TableCell><span className="urdu-text">میں نے</span></TableCell>
              <TableCell><span className="urdu-text">میں نے پڑھا</span><br /><span className="urdu-text">میں نے پڑھی</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Main ne paṛha</code> (M)<br /><code>Main ne paṛhi</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>You (Inf. Sg.)</TableCell>
              <TableCell><span className="urdu-text">تو نے</span></TableCell>
              <TableCell><span className="urdu-text">تو نے پڑھا</span><br /><span className="urdu-text">تو نے پڑھی</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Tu ne paṛha</code> (M)<br /><code>Tu ne paṛhi</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>He/She (Sg.)</TableCell>
              <TableCell><span className="urdu-text">اس نے</span></TableCell>
              <TableCell><span className="urdu-text">اس نے پڑھا</span><br /><span className="urdu-text">اس نے پڑھی</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Us ne paṛha</code> (M)<br /><code>Us ne paṛhi</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>We (1st Pl.)</TableCell>
              <TableCell><span className="urdu-text">ہم نے</span></TableCell>
              <TableCell><span className="urdu-text">ہم نے پڑھا</span><br /><span className="urdu-text">ہم نے پڑھی</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Hum ne paṛha</code> (M)<br /><code>Hum ne paṛhi</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>They (Pl.)</TableCell>
              <TableCell><span className="urdu-text">انھوں نے</span></TableCell>
              <TableCell><span className="urdu-text">انھوں نے پڑھا</span><br /><span className="urdu-text">انھوں نے پڑھی</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Unhoṉ ne paṛha</code> (M)<br /><code>Unhoṉ ne paṛhi</code> (F)</span></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="mt-4">
        <em>
          <strong>Important:</strong> For transitive verbs (verbs with an object), the verb ending agrees with the gender and number of the <strong>object</strong>, not the subject. The marker "<span className="urdu-text">نے</span>" (ne) is used.
        </em>
      </p>

      <h2 className="text-2xl font-semibold text-teal-600 mb-2 mt-4">3. Future Tense (<span className="urdu-text">مستقبل</span>- <em>Mustaqbil</em>)</h2>
      <p>
        Used for actions that will happen in the future.
      </p>
      <h3 className="text-xl font-semibold text-teal-600 mb-2 mt-4">a. Simple Future (<span className="urdu-text">سادہ مستقبل</span>- <em>Mustaqbil Sada</em>)</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Formation:</strong> Verb Root + Future Tense Suffix (-<span className="urdu-text">گا</span>, -<span className="urdu-text">گی</span>, -<span className="urdu-text">گے</span>).
        </li>
      </ul>
      <div className="table-container overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Person (<span className="urdu-text">انگریزی</span>)</TableHead>
              <TableHead>Person (<span className="urdu-text">اردو</span>)</TableHead>
              <TableHead>Suffix</TableHead>
              <TableHead>Conjugation (<span className="urdu-text">جانا</span>)</TableHead>
              <TableHead>Romanization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>I (1st Sg.)</TableCell>
              <TableCell><span className="urdu-text">میں</span></TableCell>
              <TableCell>-<span className="urdu-text">ؤں گا</span>/ -<span className="urdu-text">ؤں گی</span></TableCell>
              <TableCell><span className="urdu-text">میں جاؤں گا</span><br /><span className="urdu-text">میں جاؤں گی</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Main jaaunga</code> (M)<br /><code>Main jaaungi</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>You (Inf. Sg.)</TableCell>
              <TableCell><span className="urdu-text">تو</span></TableCell>
              <TableCell>-<span className="urdu-text">ئے گا</span>/ -<span className="urdu-text">ئے گی</span></TableCell>
              <TableCell><span className="urdu-text">تو جائے گا</span><br /><span className="urdu-text">تو جائے گی</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Tu jaayega</code> (M)<br /><code>Tu jaayegi</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>You (Form. Sg/Pl)</TableCell>
              <TableCell><span className="urdu-text">آپ</span></TableCell>
              <TableCell>-<span className="urdu-text">یں گے</span>/ -<span className="urdu-text">یں گی</span></TableCell>
              <TableCell><span className="urdu-text">آپ جائیں گے</span><br /><span className="urdu-text">آپ جائیں گی</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Aap jaayenge</code> (M)<br /><code>Aap jaayengi</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>He/She (Sg.)</TableCell>
              <TableCell><span className="urdu-text">وہ</span></TableCell>
              <TableCell>-<span className="urdu-text">ئے گا</span>/ -<span className="urdu-text">ئے گی</span></TableCell>
              <TableCell><span className="urdu-text">وہ جائے گا</span><br /><span className="urdu-text">وہ جائے گی</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Woh jaayega</code> (M)<br /><code>Woh jaayegi</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>We (1st Pl.)</TableCell>
              <TableCell><span className="urdu-text">ہم</span></TableCell>
              <TableCell>-<span className="urdu-text">ئیں گے</span>/ -<span className="urdu-text">ئیں گی</span></TableCell>
              <TableCell><span className="urdu-text">ہم جائیں گے</span><br /><span className="urdu-text">ہم جائیں گی</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Hum jaayenge</code> (M)<br /><code>Hum jaayengi</code> (F)</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>They (Pl.)</TableCell>
              <TableCell><span className="urdu-text">وہ</span></TableCell>
              <TableCell>-<span className="urdu-text">یں گے</span>/ -<span className="urdu-text">یں گی</span></TableCell>
              <TableCell><span className="urdu-text">وہ جائیں گے</span><br /><span className="urdu-text">وہ جائیں گی</span></TableCell>
              <TableCell><span className="urdu-roman"><code>Woh jaayenge</code> (M)<br /><code>Woh jaayengi</code> (F)</span></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </div>
  );
};


