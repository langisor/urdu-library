"use client"
import "./custom.css";

const Chapter2 = () => {
 return (
   <div className="container">
     <h1>Chapter 2: Parts of Speech (Ajzaa-e-Kalaam)</h1>
     <p>
       <strong>Introduction:</strong> Words are the workers building sentences! This chapter introduces the different _types_ of workers (parts of speech) in Urdu and their jobs.
     </p>

     <h3>2.1 Nouns (Ism,
       <span className="urdu-text">
         اسم
       </span>
       ): Naming Things
     </h3>
     <ul>
       <li>
         <strong>Definition:</strong> Words that name a person, place, thing, quality, or idea.
         <span className="urdu-text">
           کتاب
         </span>
         (Kitaab - Book),
         <span className="urdu-text">
           لڑکا
         </span>
         (Larka - Boy),
         <span className="urdu-text">
           لاہور
         </span>
         (Lahore - Lahore),
         <span className="urdu-text">
           محبت
         </span>
         (Muhabbat - Love),
         <span className="urdu-text">
           آزادی
         </span>
         (Aazaadi - Freedom).
       </li>
       <li>
         <strong>Types:</strong>
         <ul>
           <li>
             <strong>Common Noun (Ism-e-Aam,
               <span className="urdu-text">
                 اسم عام
               </span>
               ):
             </strong>
             Names general things.
             <span className="urdu-text">
               شہر
             </span>
             (Shehar - City),
             <span className="urdu-text">
               درخت
             </span>
             (Darakht - Tree),
             <span className="urdu-text">
               کتاب
             </span>
             (Kitaab - Book).
           </li>
           <li>
             <strong>Proper Noun (Ism-e-Khaas,
               <span className="urdu-text">
                 اسم خاص
               </span>
               ):
             </strong>
             Names specific, unique things (capitalized).
             <span className="urdu-text">
               علی
             </span>
             (Ali - Ali),
             <span className="urdu-text">
               پاکستان
             </span>
             (Pakistan - Pakistan),
             <span className="urdu-text">
               دریائے سندھ
             </span>
             (Darya-e-Sindh - Indus River).
           </li>
         </ul>
       </li>
       <li>
         <strong>Gender (Jins,
           <span className="urdu-text">
             جنس
           </span>
           ):
         </strong>
         <ul>
           <li>
             <strong>Masculine (Muzakkar,
               <span className="urdu-text">
                 مذکر
               </span>
               ):
             </strong>
             Most nouns not ending in a sound are masculine.
             <span className="urdu-text">
               کمرہ
             </span>
             (Kamrah - Room),
             <span className="urdu-text">
               دروازہ
             </span>
             (Darwaaza - Door),
             <span className="urdu-text">
               لڑکا
             </span>
             (Larka - Boy).
           </li>
           <li>
             <strong>Feminine (Muannas,
               <span className="urdu-text">
                 مونث
               </span>
               ):
             </strong>
             Often (but not always!) nouns ending in:
             <ul>
               <li>"-i" sound (represented by
                 <span className="urdu-text">
                   ی
                 </span>
                 or
                 <span className="urdu-text">
                   ے
                 </span>
                 ):
                 <span className="urdu-text">
                   کتاب
                 </span>
                 (Kitaab - Book),
                 <span className="urdu-text">
                   کرسی
                 </span>
                 (Kursi - Chair),
                 <span className="urdu-text">
                   گاڑی
                 </span>
                 (Gaṛi - Vehicle).
               </li>
               <li>"-at":
                 <span className="urdu-text">
                   دولت
                 </span>
                 (Daulat - Wealth),
                 <span className="urdu-text">
                   حقیقت
                 </span>
                 (Haqeeqat - Reality).
               </li>
               <li>
                 <strong>Common Exceptions:</strong> Some inherently feminine nouns:
                 <span className="urdu-text">
                   ماں
                 </span>
                 (Maan - Mother),
                 <span className="urdu-text">
                   بہن
                 </span>
                 (Behan - Sister),
                 <span className="urdu-text">
                   آنکھ
                 </span>
                 (Aankh - Eye),
                 <span className="urdu-text">
                   زبان
                 </span>
                 (Zubaan - Tongue/Language),
                 <span className="urdu-text">
                   چیز
                 </span>
                 (Cheez - Thing). _Remember KOHA: Zubaan, Oonkh, Hawa, Aag - all feminine._
               </li>
             </ul>
           </li>
           <li>
             <strong>Rules:</strong> Adjectives and verbs must agree with the noun's gender.
           </li>
         </ul>
       </li>
       <li>
         <strong>Number (Adad,
           <span className="urdu-text">
             عدد
           </span>
           ):
         </strong>
         <ul>
           <li>
             <strong>Singular (Waahid,
               <span className="urdu-text">
                 واحد
               </span>
               ):
             </strong>
             One thing.
             <span className="urdu-text">
               کتاب
             </span>
             (Kitaab - Book),
             <span className="urdu-text">
               لڑکا
             </span>
             (Larka - Boy).
           </li>
           <li>
             <strong>Plural (Jama',
               <span className="urdu-text">
                 جمع
               </span>
               ):
             </strong>
             More than one thing. Plurals are often irregular, but common formations:
             <ul>
               <li>
                 <strong>Adding "-ain" (
                   <span className="urdu-text">
                     یں
                   </span>
                   ):
                 </strong>
                 <span className="urdu-text">
                   لڑکا
                 </span>
                 -&gt;
                 <span className="urdu-text">
                   لڑکے
                 </span>
                 (Larkay - Boys),
                 <span className="urdu-text">
                   کتاب
                 </span>
                 -&gt;
                 <span className="urdu-text">
                   کتابیں
                 </span>
                 (Kitaabein - Books). _(Masculine nouns ending in -a)_
               </li>
               <li>
                 <strong>Adding "-ein" (
                   <span className="urdu-text">
                     یں
                   </span>
                   ):
                 </strong>
                 <span className="urdu-text">
                   کرسی
                 </span>
                 -&gt;
                 <span className="urdu-text">
                   کرسیاں
                 </span>
                 (Kursiyaan - Chairs). _(Feminine nouns ending in -i)_
               </li>
               <li>
                 <strong>Adding "-oon" (
                   <span className="urdu-text">
                     وں
                   </span>
                   ):
                 </strong>
                 <span className="urdu-text">
                   استاد
                 </span>
                 -&gt;
                 <span className="urdu-text">
                   استادوں
                 </span>
                 (Ustaadoon - Teachers). _(Nouns ending in consonants or long vowels)_
               </li>
               <li>
                 <strong>Adding "-aat" (
                   <span className="urdu-text">
                     ات
                   </span>
                   ):
                 </strong>
                 <span className="urdu-text">
                   دولت
                 </span>
                 -&gt;
                 <span className="urdu-text">
                   دولتین
                 </span>
                 (Daulatein - Two wealths - rare),
                 <span className="urdu-text">
                   لفظ
                 </span>
                 -&gt;
                 <span className="urdu-text">
                   الفاظ
                 </span>
                 (Alfaaz - Words - Arabic pattern).
               </li>
               <li>
                 <strong>Broken Plural (Jama' ul Kasra,
                   <span className="urdu-text">
                     جمع الکسرہ
                   </span>
                   ):
                 </strong>
                 Completely changes the word structure (often Arabic loans).
                 <span className="urdu-text">
                   کتاب
                 </span>
                 -&gt;
                 <span className="urdu-text">
                   کتب
                 </span>
                 (Kutub - Books),
                 <span className="urdu-text">
                   سوال
                 </span>
                 -&gt;
                 <span className="urdu-text">
                   سوالات
                 </span>
                 (Sawaalaat - Questions),
                 <span className="urdu-text">
                   استاد
                 </span>
                 -&gt;
                 <span className="urdu-text">
                   اساتذہ
                 </span>
                 (Asaatizah - Teachers).
               </li>
               <li>
                 <em>
                   Many nouns have multiple possible plural forms.
                 </em>
               </li>
             </ul>
           </li>
         </ul>
       </li>
     </ul>

     <h3>2.2 Pronouns (Zameer,
       <span className="urdu-text">
         ضمیر
       </span>
       ): Standing In
     </h3>
     <ul>
       <li>
         <strong>Definition:</strong> Words that replace nouns to avoid repetition.
         <span className="urdu-text">
           میں
         </span>
         (Main - I),
         <span className="urdu-text">
           تم
         </span>
         (Tum - You - informal),
         <span className="urdu-text">
           وہ
         </span>
         (Woh - He/She/It/That/They),
         <span className="urdu-text">
           یہ
         </span>
         (Yeh - This/He/She/It/These).
       </li>
       <li>
         <strong>Types with Examples (Isolated Form):</strong>
         <ul>
           <li>
             <strong>Personal Pronouns:</strong>
             <ul>
               <li>1st Person Sing:
                 <span className="urdu-text">
                   میں
                 </span>
                 (Main - I), Plur:
                 <span className="urdu-text">
                   ہم
                 </span>
                 (Hum - We)
               </li>
               <li>2nd Person Sing (Intimate):
                 <span className="urdu-text">
                   تو
                 </span>
                 (Tu - You - very informal/familiar), Sing/Plur (Informal):
                 <span className="urdu-text">
                   تم
                 </span>
                 (Tum - You), Sing/Plur (Formal):
                 <span className="urdu-text">
                   آپ
                 </span>
                 (Aap - You)
               </li>
               <li>3rd Person Sing Proximal (Near):
                 <span className="urdu-text">
                   یہ
                 </span>
                 (Yeh - This/He/She/It), Sing Distal (Far):
                 <span className="urdu-text">
                   وہ
                 </span>
                 (Woh - That/He/She/It), Plur Proximal:
                 <span className="urdu-text">
                   یہ
                 </span>
                 (Yeh - These/They - near), Plur Distal:
                 <span className="urdu-text">
                   وہ
                 </span>
                 (Woh - Those/They - far)
               </li>
             </ul>
           </li>
           <li>
             <strong>Possessive Pronouns:</strong>
             <span className="urdu-text">
               میرا
             </span>
             (Mera - My),
             <span className="urdu-text">
               تمہارا
             </span>
             (Tumhaara - Your - inf.),
             <span className="urdu-text">
               آپ کا
             </span>
             (Aap ka - Your - form.),
             <span className="urdu-text">
               اس کا
             </span>
             (Us ka - His/Her/Its),
             <span className="urdu-text">
               ان کا
             </span>
             (Un ka - Their).
           </li>
           <li>
             <strong>Demonstrative Pronouns:</strong>
             <span className="urdu-text">
               یہ
             </span>
             (Yeh - This/These),
             <span className="urdu-text">
               وہ
             </span>
             (Woh - That/Those).
           </li>
           <li>
             <strong>Interrogative Pronouns:</strong>
             <span className="urdu-text">
               کون
             </span>
             (Koun - Who?),
             <span className="urdu-text">
               کیا
             </span>
             (Kya - What?).
           </li>
           <li>
             <strong>Relative Pronouns:</strong>
             <span className="urdu-text">
               جو
             </span>
             (Jo - Who/Which/That),
             <span className="urdu-text">
               جس
             </span>
             (Jis - Whom/Which - oblique sing.),
             <span className="urdu-text">
               جن
             </span>
             (Jin - Whom/Which - oblique plur.).
           </li>
         </ul>
       </li>
     </ul>

     <h3>2.3 Verbs (Fe'l,
       <span className="urdu-text">
         فعل
       </span>
       ): Action Words!
     </h3>
     <ul>
       <li>
         <strong>Definition:</strong> Words that express an action (
         <span className="urdu-text">
           کھانا
         </span>
         - Khaana - To eat), state (
         <span className="urdu-text">
           ہونا
         </span>
         - Hona - To be), or occurrence (
         <span className="urdu-text">
           ہوجانا
         </span>
         - Ho jaana - To happen).
       </li>
       <li>
         <strong>Transitive (Mutaddi,
           <span className="urdu-text">
             متعدی
           </span>
           ):
         </strong>
         Require a direct object (
         <span className="urdu-text">
           مفعول
         </span>
         - Maf'ool). Object receives the action.
         <ul>
           <li>
             <span className="urdu-text">
               علی نے
               <strong>کتاب</strong>
               پڑھی۔
             </span>
             (Ali ne
             <strong>kitaab</strong>
             paṛhi. - Ali read
             <strong>the book</strong>
             .)
           </li>
         </ul>
       </li>
       <li>
         <strong>Intransitive (Lazim,
           <span className="urdu-text">
             لازم
           </span>
           ):
         </strong>
         Do not require a direct object.
         <ul>
           <li>
             <span className="urdu-text">
               علی
               <strong>سو</strong>
               گیا۔
             </span>
             (Ali
             <strong>so</strong>
             gaya. - Ali
             <strong>slept</strong>
             .)
           </li>
         </ul>
       </li>
       <li>
         <strong>Forms:</strong> Verbs change based on tense, gender, number, and person (conjugation covered in Ch4). The basic dictionary form is the Infinitive:
         <span className="urdu-text">
           پڑھنا
         </span>
         (Paṛhna - To read),
         <span className="urdu-text">
           لکھنا
         </span>
         (Likna - To write),
         <span className="urdu-text">
           جانا
         </span>
         (Jaana - To go).
       </li>
     </ul>

     <h3>2.4 Adjectives (Sifat,
       <span className="urdu-text">
         صفت
       </span>
       ): Describing Words
     </h3>
     <ul>
       <li>
         <strong>Definition:</strong> Words that describe or modify nouns.
         <span className="urdu-text">
           اچھا لڑکا
         </span>
         (Acha Larka - Good boy),
         <span className="urdu-text">
           بڑا گھر
         </span>
         (Baṛa Ghar - Big house),
         <span className="urdu-text">
           سرخ گلاب
         </span>
         (Surkh Gulaab - Red rose).
       </li>
       <li>
         <strong>Degrees of Comparison:</strong>
         <ul>
           <li>
             <strong>Positive (Sifat-e-Musabbaha,
               <span className="urdu-text">
                 صفت مثبتہ
               </span>
               ):
             </strong>
             Basic description.
             <span className="urdu-text">
               اچھا
             </span>
             (Acha - Good),
             <span className="urdu-text">
               بڑا
             </span>
             (Baṛa - Big).
           </li>
           <li>
             <strong>Comparative (Tafdeeli Darja,
               <span className="urdu-text">
                 تفدیلی درجہ
               </span>
               ):
             </strong>
             Comparison between two. Formed by adding "
             <span className="urdu-text">
               سے
             </span>
             " (se) _after_ the adjective.
             <span className="urdu-text">
               علی احمد
               <strong>سے اچھا</strong>
               ہے۔
             </span>
             (Ali Ahmad
             <strong>se acha</strong>
             hai. - Ali is
             <strong>better than</strong>
             Ahmad.)
             <span className="urdu-text">
               احمد
               <strong>سے بڑا</strong>
               گھر۔
             </span>
             (Ahmad
             <strong>se baṛa</strong>
             ghar. - A house
             <strong>bigger than</strong>
             Ahmad's.)
           </li>
           <li>
             <strong>Superlative (Sifat-e-Tafdeel,
               <span className="urdu-text">
                 صفت تفضیل
               </span>
               ):
             </strong>
             Highest degree. Often uses "
             <span className="urdu-text">
               سب سے
             </span>
             " (sab se - than all) _before_ the adjective.
             <span className="urdu-text">
               علی
               <strong>سب سے اچھا</strong>
               لڑکا ہے۔
             </span>
             (Ali
             <strong>sab se acha</strong>
             larka hai. - Ali is
             <strong>the best</strong>
             boy.)
             <span className="urdu-text">
               سب سے بڑا
             </span>
             شہر۔ (
             <strong>Sab se baṛa</strong>
             shehar. -
             <strong>The biggest</strong>
             city.)
           </li>
         </ul>
       </li>
     </ul>

     <h3>2.5 Adverbs (Mutaliq-e-Fe'l,
       <span className="urdu-text">
         متعلق فعل
       </span>
       ): Describing Actions
     </h3>
     <ul>
       <li>
         <strong>Definition:</strong> Words that modify verbs, adjectives, or other adverbs, telling _how_, _when_, _where_, or _to what extent_.
         <ul>
           <li>
             <strong>Manner (
               <span className="urdu-text">
                 کیفیت
               </span>
               ):
             </strong>
             <span className="urdu-text">
               تیزی سے
             </span>
             (Tezi se - Quickly),
             <span className="urdu-text">
               آہستہ
             </span>
             (Aahista - Slowly),
             <span className="urdu-text">
               اچھی طرح
             </span>
             (Achi tarah - Well).
             <span className="urdu-text">
               وہ
               <strong>تیزی سے</strong>
               دوڑا۔
             </span>
             (Woh
             <strong>tezi se</strong>
             daurra. - He ran
             <strong>quickly</strong>
             .)
           </li>
           <li>
             <strong>Time (
               <span className="urdu-text">
                 وقت
               </span>
               ):
             </strong>
             <span className="urdu-text">
               آج
             </span>
             (Aaj - Today),
             <span className="urdu-text">
               کل
             </span>
             (Kal - Yesterday/Tomorrow),
             <span className="urdu-text">
               اب
             </span>
             (Ab - Now),
             <span className="urdu-text">
               پہلے
             </span>
             (Pehle - Before).
             <span className="urdu-text">
               وہ
               <strong>کل</strong>
               آئے گا۔
             </span>
             (Woh
             <strong>kal</strong>
             aaye ga. - He will come
             <strong>tomorrow</strong>
             .)
           </li>
           <li>
             <strong>Place (
               <span className="urdu-text">
                 مقام
               </span>
               ):
             </strong>
             <span className="urdu-text">
               یہاں
             </span>
             (Yahaan - Here),
             <span className="urdu-text">
               وہاں
             </span>
             (Wahaan - There),
             <span className="urdu-text">
               اندر
             </span>
             (Andar - Inside),
             <span className="urdu-text">
               باہر
             </span>
             (Bahar - Outside).
             <span className="urdu-text">
               کتاب
               <strong>یہاں</strong>
               رکھو۔
             </span>
             (Kitaab
             <strong>yahaan</strong>
             rakho. - Put the book
             <strong>here</strong>
             .)
           </li>
           <li>
             <strong>Degree (
               <span className="urdu-text">
                 مقدار
               </span>
               ):
             </strong>
             <span className="urdu-text">
               بہت
             </span>
             (Bohat - Very),
             <span className="urdu-text">
               زیادہ
             </span>
             (Zyada - More),
             <span className="urdu-text">
               تھوڑا
             </span>
             (Thora - A little).
             <span className="urdu-text">
               یہ
               <strong>بہت</strong>
               اچھا ہے۔
             </span>
             (Yeh
             <strong>bohat</strong>
             acha hai. - This is
             <strong>very</strong>
             good.)
           </li>
         </ul>
       </li>
     </ul>

     <h3>2.6 Prepositions, Conjunctions &amp; Interjections: The Connectors and Reactors</h3>
     <ul>
       <li>
         <strong>Prepositions (Huroof-e-Jarr,
           <span className="urdu-text">
             حروف جر
           </span>
           ):
         </strong>
         Show relationships (location, direction, time, possession) between nouns/pronouns and other words. Urdu primarily uses
         <strong>Postpositions</strong>
         - they come _after_ the noun. _See also 2.7._
         <ul>
           <li>
             <span className="urdu-text">
               میں
               <strong>کے لیے</strong>
             </span>
             (Mere
             <strong>liye</strong>
             - For me)
           </li>
           <li>
             <span className="urdu-text">
               میز
               <strong>پر</strong>
             </span>
             (Mez
             <strong>par</strong>
             - On the table)
           </li>
           <li>
             <span className="urdu-text">
               گھر
               <strong>سے</strong>
             </span>
             (Ghar
             <strong>se</strong>
             - From home)
           </li>
           <li>
             <span className="urdu-text">
               دو
               <strong>کے درمیان</strong>
             </span>
             (Do
             <strong>ke darmiyaan</strong>
             - Between two)
           </li>
         </ul>
       </li>
       <li>
         <strong>Conjunctions (Huroof-e-Atf,
           <span className="urdu-text">
             حروف عطف
           </span>
           ):
         </strong>
         Connect words, phrases, or clauses.
         <ul>
           <li>
             <span className="urdu-text">
               و
             </span>
             (Aur - And):
             <span className="urdu-text">
               علی
               <strong>اور</strong>
               احمد
             </span>
             (Ali
             <strong>aur</strong>
             Ahmad)
           </li>
           <li>
             <span className="urdu-text">
               لیکن
             </span>
             (Lekin - But):
             <span className="urdu-text">
               امیر
               <strong>لیکن</strong>
               بخیل
             </span>
             (Ameer
             <strong>lekin</strong>
             bakheel - Rich but stingy)
           </li>
           <li>
             <span className="urdu-text">
               کیونکہ
             </span>
             (Kyunke - Because):
             <span className="urdu-text">
               میں آیا
               <strong>کیونکہ</strong>
               تم نے بلایا۔
             </span>
             (Main aaya
             <strong>kyunke</strong>
             tum ne bulaya. - I came
             <strong>because</strong>
             you called.)
           </li>
           <li>
             <span className="urdu-text">
               اگر
             </span>
             (Agar - If):
             <span className="urdu-text">
               <strong>اگر</strong>
               بارش ہوئی تو...
             </span>
             (
             <strong>Agar</strong>
             barish hui to... -
             <strong>If</strong>
             it rains then...)
           </li>
         </ul>
       </li>
       <li>
         <strong>Interjections (Huroof-e-Nida,
           <span className="urdu-text">
             حروف ندا
           </span>
           ):
         </strong>
         Express sudden emotion or reaction. Stand alone.
         <ul>
           <li>
             <span className="urdu-text">
               اوہ!
             </span>
             (Oh! - Oh!),
             <span className="urdu-text">
               واہ!
             </span>
             (Wah! - Wow!),
             <span className="urdu-text">
               اف!
             </span>
             (Uff! - Ugh!),
             <span className="urdu-text">
               ارے!
             </span>
             (Arrey! - Hey!),
             <span className="urdu-text">
               خدا حافظ!
             </span>
             (Khuda Hafiz! - Goodbye!).
           </li>
         </ul>
       </li>
     </ul>

     <h3>2.7 Participles (Verbal Adjectives/Nouns)</h3>
     <ul>
       <li>
         <strong>Active Participle (Ism-e-Faa'il,
           <span className="urdu-text">
             اسم فاعل
           </span>
           ):
         </strong>
         Describes the _doer_ of the action. Ends with "-
         <span className="urdu-text">
           نے والا
         </span>
         " (-ne waala) for masc. sing.
         <span className="urdu-text">
           پڑھنے والا لڑکا
         </span>
         (Paṛhne waala larka - The boy who reads / The reading boy),
         <span className="urdu-text">
           کھانے والی لڑکی
         </span>
         (Khaane waali larki - The girl who eats / The eating girl).
       </li>
       <li>
         <strong>Passive Participle (Ism-e-Maf'ool,
           <span className="urdu-text">
             اسم مفعول
           </span>
           ):
         </strong>
         Describes the _receiver_ of the action. Often the past participle form of the verb.
         <span className="urdu-text">
           پڑھی ہوئی کتاب
         </span>
         (Paṛhi hui kitaab - The book that was read / The read book),
         <span className="urdu-text">
           لکھا ہوا خط
         </span>
         (Likha hua khat - The letter that was written / The written letter).
       </li>
     </ul>

     <h3>2.8 Postpositions: Urdu's Key Relators</h3>
     <p>
       Urdu relies heavily on
       <strong>postpositions</strong>
       (similar to prepositions but _following_ the noun/pronoun) to mark grammatical relationships (like cases). Key ones:
     </p>
     <ul>
       <li>
         <strong>
           <span className="urdu-text">
             نے
           </span>
           (ne):
         </strong>
         Ergative case marker for the subject of transitive verbs in the past tense.
         <span className="urdu-text">
           علی
           <strong>نے</strong>
           کتاب پڑھی۔
         </span>
         (Ali
         <strong>ne</strong>
         kitaab paṛhi.)
       </li>
       <li>
         <strong>
           <span className="urdu-text">
             کو
           </span>
           (ko):
         </strong>
         Marks the direct object (specific/definite animate) or indirect object (dative case).
         <span className="urdu-text">
           احمد
           <strong>کو</strong>
           بلاؤ۔
         </span>
         (Ahmad
         <strong>ko</strong>
         bulao. - Call Ahmad.)
         <span className="urdu-text">
           استاد نے طالب علم
           <strong>کو</strong>
           کتاب دی۔
         </span>
         (Ustaad ne taalib ilm
         <strong>ko</strong>
         kitaab di. - The teacher gave the book
         <strong>to the student</strong>
         .)
       </li>
       <li>
         <strong>
           <span className="urdu-text">
             سے
           </span>
           (se):
         </strong>
         Instrumental/Ablative case (with, by, from).
         <span className="urdu-text">
           قلم
           <strong>سے</strong>
           لکھو۔
         </span>
         (Qalam
         <strong>se</strong>
         likho. - Write
         <strong>with</strong>
         a pen.)
         <span className="urdu-text">
           لاہور
           <strong>سے</strong>
           آیا۔
         </span>
         (Lahore
         <strong>se</strong>
         aaya. - Came
         <strong>from</strong>
         Lahore.)
         <span className="urdu-text">
           احمد
           <strong>سے</strong>
           اونچا
         </span>
         (Ahmad
         <strong>se</strong>
         ooncha - Taller
         <strong>than</strong>
         Ahmad).
       </li>
       <li>
         <strong>
           <span className="urdu-text">
             پر
           </span>
           (par):
         </strong>
         Locative case (on, upon, at).
         <span className="urdu-text">
           میز
           <strong>پر</strong>
         </span>
         (Mez
         <strong>par</strong>
         - On the table),
         <span className="urdu-text">
           کل
           <strong>پر</strong>
         </span>
         (Kal
         <strong>par</strong>
         - By tomorrow).
       </li>
       <li>
         <strong>
           <span className="urdu-text">
             میں
           </span>
           (mein):
         </strong>
         Locative case (in, inside).
         <span className="urdu-text">
           کمرے
           <strong>میں</strong>
         </span>
         (Kamre
         <strong>mein</strong>
         - In the room),
         <span className="urdu-text">
           پاکستان
           <strong>میں</strong>
         </span>
         (Pakistan
         <strong>mein</strong>
         - In Pakistan).
       </li>
       <li>
         <strong>
           <span className="urdu-text">
             کا / کے / کی
           </span>
           (ka / ke / ki):
         </strong>
         Genitive case (of, belonging to - agrees with possessed noun's gender/number).
         <span className="urdu-text">
           علی
           <strong>کی</strong>
           کتاب
         </span>
         (Ali
         <strong>ki</strong>
         kitaab - Ali's book),
         <span className="urdu-text">
           لڑکوں
           <strong>کے</strong>
           کپڑے
         </span>
         (Larkon
         <strong>ke</strong>
         kapre - The boys' clothes),
         <span className="urdu-text">
           بڑے شہر
           <strong>کا</strong>
           نقشہ
         </span>
         (Baṛe shehar
         <strong>ka</strong>
         naqsha - Map of the big city).
       </li>
     </ul>

     <div className="review-section">
       <h3>Chapter 2 Review: Parts of Speech Recap</h3>
       <ul>
         <li>
           <strong>Nouns (Ism):</strong>
           Name things. Have types (Common/Proper), Gender (Masc/Fem - remember KOHA!), and Number (Sing/Plur - often irregular).
         </li>
         <li>
           <strong>Pronouns (Zameer):</strong>
           Replace nouns (Personal, Possessive, Demonstrative, Interrogative, Relative).
         </li>
         <li>
           <strong>Verbs (Fe'l):</strong>
           Show action/state. Can be Transitive (needs object) or Intransitive (no object).
         </li>
         <li>
           <strong>Adjectives (Sifat):</strong>
           Describe nouns. Have degrees (Positive, Comparative using "se", Superlative using "sab se").
         </li>
         <li>
           <strong>Adverbs (Mutaliq-e-Fe'l):</strong>
           Modify verbs/adjectives/adverbs (Manner, Time, Place, Degree).
         </li>
         <li>
           <strong>Prepositions/Postpositions (Huroof-e-Jarr):</strong>
           Show relationships (mainly _post_positions in Urdu: ne, ko, se, par, mein, ka/ke/ki).
         </li>
         <li>
           <strong>Conjunctions (Huroof-e-Atf):</strong>
           Connect words/clauses (aur, lekin, kyunke, agar).
         </li>
         <li>
           <strong>Interjections (Huroof-e-Nida):</strong>
           Express emotion (Oh!, Wah!).
         </li>
         <li>
           <strong>Participles:</strong>
           Verbal adjectives/nouns (Ism-e-Faa'il - doer, Ism-e-Maf'ool - receiver).
         </li>
       </ul>
     </div>

     <div className="quiz-section">
       <h3>Chapter 2 Quiz: Identify the Workers!</h3>
       <div className="quiz-question">1. What gender is the noun "زبان" (Zubaan - Tongue/Language)?</div>
       <ol className="quiz-options">
         <li>Masculine</li>
         <li>Feminine</li>
         <li>Both</li>
         <li>Neuter</li>
       </ol>
       <div className="quiz-question">2. Identify the pronoun in: "وہ بازار گیا۔" (Woh bazaar gaya. - He went to the market.)</div>
       <ol className="quiz-options">
         <li>
           <span className="urdu-text">
             بازار
           </span>
           (Bazaar)
         </li>
         <li>
           <span className="urdu-text">
             گیا
           </span>
           (Gaya)
         </li>
         <li>
           <span className="urdu-text">
             وہ
           </span>
           (Woh)
         </li>
         <li>۔ (Full stop)</li>
       </ol>
       <div className="quiz-question">3. "استاد نے طالب علم کو کتاب دی۔" (Ustaad ne taalib ilm ko kitaab di. - The teacher gave the student the book.) Which word is the verb?</div>
       <ol className="quiz-options">
         <li>
           <span className="urdu-text">
             استاد
           </span>
           (Ustaad)
         </li>
         <li>
           <span className="urdu-text">
             نے
           </span>
           (ne)
         </li>
         <li>
           <span className="urdu-text">
             دی
           </span>
           (Di)
         </li>
         <li>
           <span className="urdu-text">
             کتاب
           </span>
           (Kitaab)
         </li>
       </ol>
       <div className="quiz-question">4. Choose the comparative degree of "اونچا" (Ooncha - Tall):</div>
       <ol className="quiz-options">
         <li>
           <span className="urdu-text">
             بہت اونچا
           </span>
           (Bohat ooncha)
         </li>
         <li>
           <span className="urdu-text">
             اونچے
           </span>
           (Oonche)
         </li>
         <li>
           <span className="urdu-text">
             احمد سے اونچا
           </span>
           (Ahmad se ooncha)
         </li>
         <li>
           <span className="urdu-text">
             سب سے اونچا
           </span>
           (Sab se ooncha)
         </li>
       </ol>
       <div className="quiz-question">5. What type of adverb is "تیزی سے" (Tezi se - Quickly)?</div>
       <ol className="quiz-options">
         <li>Time</li>
         <li>Place</li>
         <li>Manner</li>
         <li>Degree</li>
       </ol>
       <div className="quiz-question">6. Which postposition marks the indirect object (recipient)?</div>
       <ol className="quiz-options">
         <li>
           <span className="urdu-text">
             نے
           </span>
           (ne)
         </li>
         <li>
           <span className="urdu-text">
             کو
           </span>
           (ko)
         </li>
         <li>
           <span className="urdu-text">
             سے
           </span>
           (se)
         </li>
         <li>
           <span className="urdu-text">
             پر
           </span>
           (par)
         </li>
       </ol>
       <div className="quiz-question">7. What does "اسم فاعل" (Ism-e-Faa'il) describe?</div>
       <ol className="quiz-options">
         <li>The action itself</li>
         <li>The receiver of the action</li>
         <li>The doer of the action</li>
         <li>The time of the action</li>
       </ol>
       <div className="quiz-question">8. Identify the conjunction: "میں آیا لیکن وہ نہیں آیا۔" (Main aaya lekin woh nahin aaya. - I came but he did not come.)</div>
       <ol className="quiz-options">
         <li>
           <span className="urdu-text">
             میں
           </span>
           (Main)
         </li>
         <li>
           <span className="urdu-text">
             آیا
           </span>
           (Aaya)
         </li>
         <li>
           <span className="urdu-text">
             لیکن
           </span>
           (Lekin)
         </li>
         <li>
           <span className="urdu-text">
             وہ
           </span>
           (Woh)
         </li>
       </ol>
       <div className="quiz-question">9. True or False: The postposition "کا" (ka) must agree in gender and number with the _possessor_ noun.</div>
       <div className="quiz-question">10. The word "اف!" (Uff!) is an example of:</div>
       <ol className="quiz-options">
         <li>Adjective</li>
         <li>Conjunction</li>
         <li>Interjection</li>
         <li>Adverb</li>
       </ol>
       <div className="quiz-answers">
         (Answers: 1b, 2c, 3c, 4c, 5c, 6b, 7c, 8c, 9 False (It agrees with the _possessed_ noun), 10c)
       </div>
     </div>
   </div>
 );
};

export default Chapter2;
