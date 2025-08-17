"use client";

import { BackButton } from "./back-button";
export const Chapter6 = ({
  navigateTo,
}: {
  navigateTo: (page: string) => void;
}) => {
  return (
    <div className="container">
      <BackButton navigateTo={navigateTo} />
      <h1>Chapter 6: Practical Application - Applying Your Knowledge</h1>
      <p>
        This chapter is all about putting your grammar knowledge to practical
        use. We'll cover tips for writing, common mistakes to avoid, and a
        glimpse into the world of Urdu stylistics.
      </p>

      <h3>1. Tips for Writing Correct Urdu</h3>
      <ul>
        <li>
          <strong>Think in Urdu:</strong> Try to form sentences in the Urdu
          Subject-Object-Verb (SOV) order instead of translating directly from
          English.
        </li>
        <li>
          <strong>Gender Agreement:</strong> Pay close attention to gender.
          Nouns, adjectives, and verbs must agree in gender. A common mistake is
          to use a masculine verb for a feminine subject or vice versa.
        </li>
        <li>
          <strong>Use Postpositions Correctly:</strong> Remember that
          postpositions like
          <span className="urdu-text">نے</span>
          (ne) and
          <span className="urdu-text">کو</span>
          (ko) are crucial for showing the relationship between words.
        </li>
        <li>
          <strong>Vowel Clarity:</strong> Use short vowels and diacritics when
          writing to ensure correct pronunciation, especially for new words or
          when ambiguity exists.
        </li>
      </ul>

      <h3>2. Common Mistakes to Avoid</h3>
      <ul>
        <li>
          <strong>Incorrect word order:</strong> Putting the verb in the middle
          of the sentence like in English.
        </li>
        <li>
          <strong>Using the wrong pronoun:</strong> Mixing up
          <span className="urdu-text">آپ</span>
          (Aap) with
          <span className="urdu-text">تم</span>
          (Tum).
        </li>
        <li>
          <strong>Gender errors:</strong> Forgetting to change the verb or
          adjective to match a feminine subject.
        </li>
        <li>
          <strong>Over-formal language:</strong> Using archaic or overly complex
          words when simpler ones will do, unless the context is highly formal.
        </li>
      </ul>

      <h3>
        3. Punctuation (<span className="urdu-text">علاماتِ وقف</span>-{" "}
        <em>Alaamaat-e-Waqf</em>)
      </h3>
      <p>Punctuation marks guide the reader and convey tone.</p>
      <ul>
        <li>
          <strong>Full Stop:</strong> (۔)
          <span className="urdu-text">۔</span>
          is used to end a sentence.
        </li>
        <li>
          <strong>Question Mark:</strong> (؟)
          <span className="urdu-text">؟</span>
          is used for questions.
        </li>
        <li>
          <strong>Comma:</strong> (،)
          <span className="urdu-text">،</span>
          is used to separate clauses or items in a list.
        </li>
        <li>
          <strong>Exclamation Mark:</strong> (!)
          <span className="urdu-text">!</span>
          is used for exclamations.
        </li>
      </ul>
      <p>
        <strong>Note:</strong> While Urdu uses these marks, their use can be
        less rigid than in English, often relying more on context and syntax.
      </p>

      <h3>4. Glossary of Grammatical Terms</h3>
      <p>
        A list of key terms from this guide to help you remember and reference
        them.
      </p>
      <ul>
        <li>
          <strong>Noun</strong>
          <span className="urdu-text">اسم</span>(<em>Ism</em>)
        </li>
        <li>
          <strong>Verb</strong>
          <span className="urdu-text">فعل</span>(<em>Fe'l</em>)
        </li>
        <li>
          <strong>Adjective</strong>
          <span className="urdu-text">صفت</span>(<em>Sifat</em>)
        </li>
        <li>
          <strong>Sentence Structure</strong>
          <span className="urdu-text">جملوں کی ساخت</span>(
          <em>Jumlon ki Saakht</em>)
        </li>
      </ul>

      <h3>5. An Introduction to Urdu Poetry Structure</h3>
      <p>Urdu is famous for its rich poetic tradition, with two main forms:</p>
      <ul>
        <li>
          <strong>Ghazal (غزل):</strong> A collection of rhyming couplets (
          <em>sher</em>) that share a meter. The central theme is often love or
          pain, and each couplet can be a self-contained idea.
        </li>
        <li>
          <strong>Nazm (نظم):</strong> A free-form poem that doesn't follow the
          strict rules of a ghazal. It can be on any topic and is more narrative
          or descriptive.
        </li>
      </ul>
    </div>
  );
};
