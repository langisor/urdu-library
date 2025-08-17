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
import { ArrowLeft } from "lucide-react";

export const Chapter1 = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  return (
    <div className="p-8">
      <Button
        onClick={() => navigateTo("toc")}
        className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-300"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Table of Contents
      </Button>

      <h1 className="text-4xl font-bold mb-4 text-teal-700">
        Chapter 1: The Building Blocks
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-600 mb-2">
          1.1 Introduction to the Urdu Language: A Tapestry of History
        </h2>
        <p>
          Assalam-o-Alaikum and Welcome!{" "}
          <span className="nastaliq-bold">
            (السلام علیکم اور خوش آمدید -{" "}
            <span className="roman">Assalam-o-Alaikum aur Khush Aamdid!</span>)
          </span>
        </p>
        <p>
          Urdu, our <span className="roman">qaumi zaban</span> (
          <span className="urdu-text">قومی زبان</span> - National Language), is
          more than just words. It's a vibrant tapestry woven over centuries!
          Born in the Indian subcontinent around the 12th-13th centuries, it
          developed in military camps{" "}
          <span className="urdu-text">
            (_urdu_ itself means "army" or "camp" in Turkish)
          </span>
          . It absorbed vocabulary and structure from Persian, Arabic, Turkish,
          and Sanskrit, creating a unique and expressive language known for its{" "}
          <span className="urdu-text">
            <span className="roman">muhabbat</span> (محبت - love)
          </span>
          ,{" "}
          <span className="urdu-text">
            <span className="roman">adaab</span> (آداب - respect)
          </span>
          , and poetic richness. Understanding its grammar helps us appreciate
          its depth and use it correctly and beautifully.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-600 mb-2">
          1.2 The Script: Naskh vs. Nastaliq - Beauty in Flow
        </h2>
        <p>
          Urdu is written right-to-left. You might encounter two main styles:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>
              Naskh <span className="urdu-text">(نسخ)</span>:
            </strong>{" "}
            A clearer, more angular script often used in printing Arabic and
            sometimes for Urdu headings or in digital contexts for readability.{" "}
            <span className="urdu-text">
              <span className="roman">کتاب</span> (
              <span className="roman">Kitaab</span> - Book)
            </span>
          </li>
          <li>
            <strong>
              Nastaliq <span className="urdu-text">(نستعلیق)</span>:
            </strong>{" "}
            This is the <strong>heart and soul</strong> of Urdu calligraphy and
            standard writing. It's cursive, flowing, and elegant, with letters
            often positioned diagonally. Words seem to dance on the page!{" "}
            <span className="urdu-text">
              کتاب (<span className="roman">Kitaab</span> - Book - Notice the
              flowing connection)
            </span>
            .<em>We will use Nastaliq throughout this guide.</em>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-600 mb-2">
          1.3 The Urdu Alphabet:{" "}
          <span className="urdu-text">Huroof-e-Tahajji</span> (
          <span className="roman">Huroof-e-Tahajji</span>) - Meet the Letters!
        </h2>
        <p>
          The Urdu alphabet has 39 basic letters (plus variations). Each has an
          initial, medial, final, and isolated form. Here they are with their{" "}
          <em>isolated</em> forms, names, and primary sounds (Romanized):
        </p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nastaliq</TableHead>
                <TableHead>Name (Roman)</TableHead>
                <TableHead>Sound (Roman)</TableHead>
                <TableHead>Example Word (Nastaliq)</TableHead>
                <TableHead>Meaning</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ا</span>
                </TableCell>
                <TableCell>
                  <span className="roman">Alif</span>
                </TableCell>
                <TableCell>a (long) / silent</TableCell>
                <TableCell>
                  <span className="urdu-text">آدمی (Aadmi)</span>
                </TableCell>
                <TableCell>Man</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ب</span>
                </TableCell>
                <TableCell>
                  <span className="roman">Be</span>
                </TableCell>
                <TableCell>b</TableCell>
                <TableCell>
                  <span className="urdu-text">کتاب (Kitaab)</span>
                </TableCell>
                <TableCell>Book</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">پ</span>
                </TableCell>
                <TableCell>
                  <span className="roman">Pe</span>
                </TableCell>
                <TableCell>p</TableCell>
                <TableCell>
                  <span className="urdu-text">پانی (Paani)</span>
                </TableCell>
                <TableCell>Water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ت</span>
                </TableCell>
                <TableCell>
                  <span className="roman">Te</span>
                </TableCell>
                <TableCell>t</TableCell>
                <TableCell>
                  <span className="urdu-text">تارا (Taara)</span>
                </TableCell>
                <TableCell>Star</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ٹ</span>
                </TableCell>
                <TableCell>
                  <span className="roman">Ṭe</span> (Big Te)
                </TableCell>
                <TableCell>ṭ (retroflex 't')</TableCell>
                <TableCell>
                  <span className="urdu-text">ٹماٹر (Ṭamaaṭar)</span>
                </TableCell>
                <TableCell>Tomato</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ث</span>
                </TableCell>
                <TableCell>
                  <span className="roman">Se</span>
                </TableCell>
                <TableCell>s (like 'th' in 'think')</TableCell>
                <TableCell>
                  <span className="urdu-text">
                    مثال (<span className="roman">Misaal</span> -{" "}
                    <span className="urdu-text">ث</span> used in Arabic loans)
                  </span>
                </TableCell>
                <TableCell>Example</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ج</span>
                </TableCell>
                <TableCell>
                  <span className="roman">Jeem</span>
                </TableCell>
                <TableCell>j</TableCell>
                <TableCell>
                  <span className="urdu-text">جگنو (Jugnoo)</span>
                </TableCell>
                <TableCell>Firefly</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">چ</span>
                </TableCell>
                <TableCell>
                  <span className="roman">Che</span>
                </TableCell>
                <TableCell>ch</TableCell>
                <TableCell>
                  <span className="urdu-text">چاند (Chaand)</span>
                </TableCell>
                <TableCell>Moon</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ح</span>
                </TableCell>
                <TableCell>
                  <span className="roman">Baṛi He</span>
                </TableCell>
                <TableCell>h (guttural)</TableCell>
                <TableCell>
                  <span className="urdu-text">حلال (Halaal)</span>
                </TableCell>
                <TableCell>Permitted</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">خ</span>
                </TableCell>
                <TableCell>Khe</TableCell>
                <TableCell>kh (like 'ch' in 'loch')</TableCell>
                <TableCell>
                  <span className="urdu-text">خواب (Khwaab)</span>
                </TableCell>
                <TableCell>Dream</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">د</span>
                </TableCell>
                <TableCell>Daal</TableCell>
                <TableCell>d</TableCell>
                <TableCell>
                  <span className="urdu-text">دروازہ (Darwaaza)</span>
                </TableCell>
                <TableCell>Door</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ڈ</span>
                </TableCell>
                <TableCell>Ḍaal (Big Daal)</TableCell>
                <TableCell>ḍ (retroflex 'd')</TableCell>
                <TableCell>
                  <span className="urdu-text">ڈنڈا (Ḍanḍa)</span>
                </TableCell>
                <TableCell>Stick</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ذ</span>
                </TableCell>
                <TableCell>Zaal</TableCell>
                <TableCell>z (like 'th' in 'that')</TableCell>
                <TableCell>
                  <span className="urdu-text">
                    ذکر (Zikr - ذ used in Arabic loans)
                  </span>
                </TableCell>
                <TableCell>Remembrance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ر</span>
                </TableCell>
                <TableCell>Re</TableCell>
                <TableCell>r</TableCell>
                <TableCell>
                  <span className="urdu-text">رات (Raat)</span>
                </TableCell>
                <TableCell>Night</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ڑ</span>
                </TableCell>
                <TableCell>Ṛe (Big Re)</TableCell>
                <TableCell>ṛ (retroflex 'r', flapped)</TableCell>
                <TableCell>
                  <span className="urdu-text">گاڑی (Gaṛi)</span>
                </TableCell>
                <TableCell>Vehicle</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ز</span>
                </TableCell>
                <TableCell>Ze</TableCell>
                <TableCell>z</TableCell>
                <TableCell>
                  <span className="urdu-text">زبانی (Zubaanii)</span>
                </TableCell>
                <TableCell>Oral</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ژ</span>
                </TableCell>
                <TableCell>Zhe</TableCell>
                <TableCell>zh (like 's' in 'measure')</TableCell>
                <TableCell>
                  <span className="urdu-text">ژالہ (Zhaala)</span>
                </TableCell>
                <TableCell>Hail</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">س</span>
                </TableCell>
                <TableCell>Seen</TableCell>
                <TableCell>s</TableCell>
                <TableCell>
                  <span className="urdu-text">سورج (Suraj)</span>
                </TableCell>
                <TableCell>Sun</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ش</span>
                </TableCell>
                <TableCell>Sheen</TableCell>
                <TableCell>sh</TableCell>
                <TableCell>
                  <span className="urdu-text">شمع (Shama)</span>
                </TableCell>
                <TableCell>Candle</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ص</span>
                </TableCell>
                <TableCell>Suaad</TableCell>
                <TableCell>s (emphatic)</TableCell>
                <TableCell>
                  <span className="urdu-text">صبح (Subh)</span>
                </TableCell>
                <TableCell>Morning</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ض</span>
                </TableCell>
                <TableCell>Zuaad</TableCell>
                <TableCell>z (emphatic)</TableCell>
                <TableCell>
                  <span className="urdu-text">
                    ضبط (Zabt - ض used in Arabic loans)
                  </span>
                </TableCell>
                <TableCell>Control</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ط</span>
                </TableCell>
                <TableCell>Toe</TableCell>
                <TableCell>t (emphatic)</TableCell>
                <TableCell>
                  <span className="urdu-text">طاقت (Taaqat)</span>
                </TableCell>
                <TableCell>Strength</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ظ</span>
                </TableCell>
                <TableCell>Zoe</TableCell>
                <TableCell>z (emphatic)</TableCell>
                <TableCell>
                  <span className="urdu-text">ظلم (Zulm)</span>
                </TableCell>
                <TableCell>Oppression</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ع</span>
                </TableCell>
                <TableCell>Ain</TableCell>
                <TableCell>' (glottal stop, or vowel carrier)</TableCell>
                <TableCell>
                  <span className="urdu-text">علم (Ilm)</span>
                </TableCell>
                <TableCell>Knowledge</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">غ</span>
                </TableCell>
                <TableCell>Ghain</TableCell>
                <TableCell>gh (like French 'r')</TableCell>
                <TableCell>
                  <span className="urdu-text">غبارہ (Ghubaara)</span>
                </TableCell>
                <TableCell>Balloon</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ف</span>
                </TableCell>
                <TableCell>Fe</TableCell>
                <TableCell>f</TableCell>
                <TableCell>
                  <span className="urdu-text">فرشتہ (Farishta)</span>
                </TableCell>
                <TableCell>Angel</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ق</span>
                </TableCell>
                <TableCell>Qaaf</TableCell>
                <TableCell>q (uvular 'k')</TableCell>
                <TableCell>
                  <span className="urdu-text">قلم (Qalam)</span>
                </TableCell>
                <TableCell>Pen</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ک</span>
                </TableCell>
                <TableCell>Kaaf</TableCell>
                <TableCell>k</TableCell>
                <TableCell>
                  <span className="urdu-text">کھیت (Kheet)</span>
                </TableCell>
                <TableCell>Field</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">گ</span>
                </TableCell>
                <TableCell>Gaaf</TableCell>
                <TableCell>g</TableCell>
                <TableCell>
                  <span className="urdu-text">گلاب (Gulaab)</span>
                </TableCell>
                <TableCell>Rose</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ل</span>
                </TableCell>
                <TableCell>Laam</TableCell>
                <TableCell>l</TableCell>
                <TableCell>
                  <span className="urdu-text">لڑکی (Larki)</span>
                </TableCell>
                <TableCell>Girl</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">م</span>
                </TableCell>
                <TableCell>Meem</TableCell>
                <TableCell>m</TableCell>
                <TableCell>
                  <span className="urdu-text">مکان (Makaan)</span>
                </TableCell>
                <TableCell>House</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ن</span>
                </TableCell>
                <TableCell>Noon</TableCell>
                <TableCell>n</TableCell>
                <TableCell>
                  <span className="urdu-text">ندی (Nadi)</span>
                </TableCell>
                <TableCell>River</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ں</span>
                </TableCell>
                <TableCell>Noon Ghunna</TableCell>
                <TableCell>n (nasalized)</TableCell>
                <TableCell>
                  <span className="urdu-text">
                    یہاں (Yahaa _̃_ - represented by ٹوپی 'topi' or context)
                  </span>
                </TableCell>
                <TableCell>Here</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">و</span>
                </TableCell>
                <TableCell>Vao</TableCell>
                <TableCell>v / oo / au / ow</TableCell>
                <TableCell>
                  <span className="urdu-text">وقت (Waqt) / دو (Do)</span>
                </TableCell>
                <TableCell>Time / Two</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ہ, ﮧ</span>
                </TableCell>
                <TableCell>Chhoṭi He</TableCell>
                <TableCell>h (at end) / vowel marker</TableCell>
                <TableCell>
                  <span className="urdu-text">
                    گھر (Ghar) / کتابﮧ (Kitaab-e)
                  </span>
                </TableCell>
                <TableCell>Home / Of the book</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ھ</span>
                </TableCell>
                <TableCell>Do Chashmi He</TableCell>
                <TableCell>h (aspiration marker)</TableCell>
                <TableCell>
                  <span className="urdu-text">
                    کھانا (Khaana) / مٹھائی (Miṭhai)
                  </span>
                </TableCell>
                <TableCell>Food / Sweet</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ء</span>
                </TableCell>
                <TableCell>Hamza</TableCell>
                <TableCell>' (glottal stop)</TableCell>
                <TableCell>
                  <span className="urdu-text">مسءلہ (Mas'ala)</span>
                </TableCell>
                <TableCell>Problem</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="urdu-text">ی</span>
                </TableCell>
                <TableCell>Ye</TableCell>
                <TableCell>y / ee / ai / e</TableCell>
                <TableCell>
                  <span className="urdu-text">یار (Yaar) / چائے (Chai)</span>
                </TableCell>
                <TableCell>Friend / Tea</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-600 mb-2">
          1.4 Short and Long Vowels: Giving Sound to Letters
        </h2>
        <p>
          Letters represent consonants. Vowels are indicated by marks or
          specific letters:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>
              Harakaat <span className="urdu-text">(حرکات - Short Vowels)</span>
              :
            </strong>{" "}
            Tiny marks <em>above</em> or <em>below</em> a consonant.
            <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
              <li>
                <strong>
                  Zabar <span className="urdu-text">(زبر) - َ</span>
                </strong>{" "}
                : Short "a" like in "cut".{" "}
                <span className="urdu-text">کَٹ (Kaṭ - Cut)</span>
              </li>
              <li>
                <strong>
                  Zer <span className="urdu-text">(زیر) - ِ</span>
                </strong>{" "}
                : Short "i" like in "it".{" "}
                <span className="urdu-text">کِٹ (Kiṭ - Deceit)</span>
              </li>
              <li>
                <strong>
                  Pesh <span className="urdu-text">(پیش) - ُ</span>
                </strong>{" "}
                : Short "u" like in "put".{" "}
                <span className="urdu-text">کُٹ (Kuṭ - Piece)</span>
              </li>
              <li>
                <em>
                  Note: Harakaat are often omitted in everyday writing, learned
                  through practice.
                </em>
              </li>
            </ul>
          </li>
          <li>
            <strong>Long Vowels:</strong> Represented by specific letters (Alif,
            Wao, Ye) acting as vowel carriers.
            <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
              <li>
                <strong>
                  Alif <span className="urdu-text">(ا)</span>:
                </strong>{" "}
                Long "aa" sound.{" "}
                <span className="urdu-text">کھانا (Khaanaa - Food)</span>
              </li>
              <li>
                <strong>
                  Wao <span className="urdu-text">(و)</span>:
                </strong>{" "}
                Long "oo" (as in "moon") or "au/ow" (as in "cow").{" "}
                <span className="urdu-text">
                  {" "}
                  سونا (Sonaa - Gold / Sleep), دو (Do - Two)
                </span>
              </li>
              <li>
                <strong>
                  Ye <span className="urdu-text">(ی)</span>:
                </strong>{" "}
                Long "ee" (as in "see") or "ai" (as in "aisle").{" "}
                <span className="urdu-text">
                  {" "}
                  چائے (Chai - Tea), کیوں (Kyoṉ - Why)
                </span>
              </li>
              <li>
                <em>
                  These letters can also function as consonants (Wao = 'v', Ye =
                  'y').
                </em>
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-600 mb-2">
          1.5 Consonants and Pronunciation: The Unique Sounds
        </h2>
        <p>Urdu has some distinctive consonant sounds:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Aspirated Consonants:</strong> Pronounced with a strong puff
            of air. Marked by{" "}
            <strong>
              <span className="urdu-text">ھ (Do Chashmi He)</span>
            </strong>{" "}
            <em>after</em> the main consonant.
            <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
              <li>
                <span className="urdu-text">
                  کھ (kh) - کھانا (Khaana - Food)
                </span>{" "}
                vs. <span className="urdu-text">کانا (Kaana - One-eyed)</span>
              </li>
              <li>
                <span className="urdu-text">گھ (gh) - گھر (Ghar - Home)</span>{" "}
                vs. <span className="urdu-text">گر (Gir - Fall!)</span>
              </li>
              <li>
                <span className="urdu-text">
                  چھی (ch) - چھیڑنا (Chheṛna - To tease)
                </span>{" "}
                vs. <span className="urdu-text">چیڑ (Chiṛ - Pine)</span>
              </li>
            </ul>
          </li>
          <li>
            <strong>Retroflex Consonants:</strong> The tongue curls back towards
            the roof of the mouth. <span className="urdu-text">ٹ, ڈ, ڑ</span>.
            <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
              <li>
                <span className="urdu-text">ٹماٹر (Ṭamaaṭar - Tomato)</span> -
                notice the hard 't'
              </li>
              <li>
                <span className="urdu-text">ڈنڈا (Ḍanḍa - Stick)</span> - notice
                the hard 'd'
              </li>
              <li>
                <span className="urdu-text">گاڑی (Gaṛi - Vehicle)</span> -
                notice the flapped 'r'
              </li>
            </ul>
          </li>
          <li>
            <strong>Arabic Loan Sounds:</strong> Many letters from Arabic are
            pronounced identically in Urdu.
          </li>
        </ul>
      </section>
    </div>
  );
};
