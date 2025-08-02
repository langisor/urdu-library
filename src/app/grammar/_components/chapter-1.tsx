"use client";
import React from "react";
import "./custom.css";

const Chapter1 = () => {
  return (
    <div className="container">
      <h1>Chapter 1: The Building Blocks</h1>
      <p>
        Assalam-o-Alaikum and Welcome!
        <span className="nastaliq-bold">
          (السلام علیکم اور خوش آمدید -{" "}
          <span className="roman">Assalam-o-Alaikum aur Khush Aamdid!</span>)
        </span>
       
      </p>

      <h2>1.1 Introduction to the Urdu Language: A Tapestry of History</h2>
      <p>
        Urdu, our
    
          <span className="roman">qaumi zaban</span> (<span className="urdu-text">قومی زبان</span> - National Language)
        
        , is more than just words. It's a vibrant tapestry woven over centuries!
        Born in the Indian subcontinent around the 12th-13th centuries, it
        developed in military camps
        <span className="urdu-text">(_urdu_ itself means "army" or "camp" in Turkish)</span>
        . It absorbed vocabulary and structure from Persian, Arabic, Turkish,
        and Sanskrit, creating a unique and expressive language known for its
        <span className="urdu-text"><span className="roman">muhabbat</span> (محبت - love)</span>,
        <span className="urdu-text"><span className="roman">adaab</span> (آداب - respect)</span>, and poetic
        richness. Understanding its grammar helps us appreciate its depth and
        use it correctly and beautifully.
      </p>

      <h2>1.2 The Script: Naskh vs. Nastaliq - Beauty in Flow</h2>
      <p>Urdu is written right-to-left. You might encounter two main styles:</p>
      <ul>
        <li>
          <strong>
            Naskh
            <span className="urdu-text">(نسخ)</span>:
          </strong>
          A clearer, more angular script often used in printing Arabic and
          sometimes for Urdu headings or in digital contexts for readability.
          <span className="urdu-text"><span className="roman">کتاب</span> (<span className="roman">Kitaab</span> - Book)</span>
        </li>
        <li>
          <strong>
            Nastaliq
            <span className="urdu-text">(نستعلیق)</span>:
          </strong>
          This is the
          <strong>heart and soul</strong>
          of Urdu calligraphy and standard writing. It's cursive, flowing, and
          elegant, with letters often positioned diagonally. Words seem to dance
          on the page!
          <span className="urdu-text">
            کتاب (<span className="roman">Kitaab</span> - Book - Notice the flowing connection)
          </span>
          .<em>We will use Nastaliq throughout this guide.</em>
        </li>
      </ul>

      <h2>
        1.3 The Urdu Alphabet: <span className="urdu-text">Huroof-e-Tahajji</span> (<span className="roman">Huroof-e-Tahajji</span>) - Meet the Letters!
      </h2>
      <p>
        The Urdu alphabet has 39 basic letters (plus variations). Each has an
        initial, medial, final, and isolated form. Here they are with their
        <em>isolated</em>
        forms, names, and primary sounds (Romanized):
      </p>
      <table>
        <thead>
          <tr>
            <th>Nastaliq</th>
            <th>Name (Roman)</th>
            <th>Sound (Roman)</th>
            <th>Example Word (Nastaliq)</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="urdu-text">ا</span>
            </td>
            <td><span className="roman">Alif</span></td>
            <td>a (long) / silent</td>
            <td>
              <span className="urdu-text">آدمی (Aadmi)</span>
            </td>
            <td>Man</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ب</span>
            </td>
            <td><span className="roman">Be</span></td>
            <td>b</td>
            <td>
              <span className="urdu-text">کتاب (Kitaab)</span>
            </td>
            <td>Book</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">پ</span>
            </td>
            <td><span className="roman">Pe</span></td>
            <td>p</td>
            <td>
              <span className="urdu-text">پانی (Paani)</span>
            </td>
            <td>Water</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ت</span>
            </td>
            <td><span className="roman">Te</span></td>
            <td>t</td>
            <td>
              <span className="urdu-text">تارا (Taara)</span>
            </td>
            <td>Star</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ٹ</span>
            </td>
            <td><span className="roman">Ṭe</span> (Big Te)</td>
            <td>ṭ (retroflex 't')</td>
            <td>
              <span className="urdu-text">ٹماٹر (Ṭamaaṭar)</span>
            </td>
            <td>Tomato</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ث</span>
            </td>
            <td><span className="roman">Se</span></td>
            <td>s (like 'th' in 'think')</td>
            <td>
              <span className="urdu-text">
                مثال (<span className="roman">Misaal</span> - <span className="urdu-text">ث</span> used in Arabic loans)
              </span>
            </td>
            <td>Example</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ج</span>
            </td>
            <td><span className="roman">Jeem</span></td>
            <td>j</td>
            <td>
              <span className="urdu-text">جگنو (Jugnoo)</span>
            </td>
            <td>Firefly</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">چ</span>
            </td>
            <td><span className="roman">Che</span></td>
            <td>ch</td>
            <td>
              <span className="urdu-text">چاند (Chaand)</span>
            </td>
            <td>Moon</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ح</span>
            </td>
            <td><span className="roman">Baṛi He</span></td>
            <td>h (guttural)</td>
            <td>
              <span className="urdu-text">حلال (Halaal)</span>
            </td>
            <td>Permitted</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">خ</span>
            </td>
            <td>Khe</td>
            <td>kh (like 'ch' in 'loch')</td>
            <td>
              <span className="urdu-text">خواب (Khwaab)</span>
            </td>
            <td>Dream</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">د</span>
            </td>
            <td>Daal</td>
            <td>d</td>
            <td>
              <span className="urdu-text">دروازہ (Darwaaza)</span>
            </td>
            <td>Door</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ڈ</span>
            </td>
            <td>Ḍaal (Big Daal)</td>
            <td>ḍ (retroflex 'd')</td>
            <td>
              <span className="urdu-text">ڈنڈا (Ḍanḍa)</span>
            </td>
            <td>Stick</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ذ</span>
            </td>
            <td>Zaal</td>
            <td>z (like 'th' in 'that')</td>
            <td>
              <span className="urdu-text">
                ذکر (Zikr - ذ used in Arabic loans)
              </span>
            </td>
            <td>Remembrance</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ر</span>
            </td>
            <td>Re</td>
            <td>r</td>
            <td>
              <span className="urdu-text">رات (Raat)</span>
            </td>
            <td>Night</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ڑ</span>
            </td>
            <td>Ṛe (Big Re)</td>
            <td>ṛ (retroflex 'r', flapped)</td>
            <td>
              <span className="urdu-text">گاڑی (Gaṛi)</span>
            </td>
            <td>Vehicle</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ز</span>
            </td>
            <td>Ze</td>
            <td>z</td>
            <td>
              <span className="urdu-text">زبانی (Zubaanii)</span>
            </td>
            <td>Oral</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ژ</span>
            </td>
            <td>Zhe</td>
            <td>zh (like 's' in 'measure')</td>
            <td>
              <span className="urdu-text">ژالہ (Zhaala)</span>
            </td>
            <td>Hail</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">س</span>
            </td>
            <td>Seen</td>
            <td>s</td>
            <td>
              <span className="urdu-text">سورج (Suraj)</span>
            </td>
            <td>Sun</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ش</span>
            </td>
            <td>Sheen</td>
            <td>sh</td>
            <td>
              <span className="urdu-text">شمع (Shama)</span>
            </td>
            <td>Candle</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ص</span>
            </td>
            <td>Suaad</td>
            <td>s (emphatic)</td>
            <td>
              <span className="urdu-text">صبح (Subh)</span>
            </td>
            <td>Morning</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ض</span>
            </td>
            <td>Zuaad</td>
            <td>z (emphatic)</td>
            <td>
              <span className="urdu-text">
                ضبط (Zabt - ض used in Arabic loans)
              </span>
            </td>
            <td>Control</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ط</span>
            </td>
            <td>Toe</td>
            <td>t (emphatic)</td>
            <td>
              <span className="urdu-text">طاقت (Taaqat)</span>
            </td>
            <td>Strength</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ظ</span>
            </td>
            <td>Zoe</td>
            <td>z (emphatic)</td>
            <td>
              <span className="urdu-text">ظلم (Zulm)</span>
            </td>
            <td>Oppression</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ع</span>
            </td>
            <td>Ain</td>
            <td>' (glottal stop, or vowel carrier)</td>
            <td>
              <span className="urdu-text">علم (Ilm)</span>
            </td>
            <td>Knowledge</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">غ</span>
            </td>
            <td>Ghain</td>
            <td>gh (like French 'r')</td>
            <td>
              <span className="urdu-text">غبارہ (Ghubaara)</span>
            </td>
            <td>Balloon</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ف</span>
            </td>
            <td>Fe</td>
            <td>f</td>
            <td>
              <span className="urdu-text">فرشتہ (Farishta)</span>
            </td>
            <td>Angel</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ق</span>
            </td>
            <td>Qaaf</td>
            <td>q (uvular 'k')</td>
            <td>
              <span className="urdu-text">قلم (Qalam)</span>
            </td>
            <td>Pen</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ک</span>
            </td>
            <td>Kaaf</td>
            <td>k</td>
            <td>
              <span className="urdu-text">کھیت (Kheet)</span>
            </td>
            <td>Field</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">گ</span>
            </td>
            <td>Gaaf</td>
            <td>g</td>
            <td>
              <span className="urdu-text">گلاب (Gulaab)</span>
            </td>
            <td>Rose</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ل</span>
            </td>
            <td>Laam</td>
            <td>l</td>
            <td>
              <span className="urdu-text">لڑکی (Larki)</span>
            </td>
            <td>Girl</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">م</span>
            </td>
            <td>Meem</td>
            <td>m</td>
            <td>
              <span className="urdu-text">مکان (Makaan)</span>
            </td>
            <td>House</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ن</span>
            </td>
            <td>Noon</td>
            <td>n</td>
            <td>
              <span className="urdu-text">ندی (Nadi)</span>
            </td>
            <td>River</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ں</span>
            </td>
            <td>Noon Ghunna</td>
            <td>n (nasalized)</td>
            <td>
              <span className="urdu-text">
                یہاں (Yahaa _̃_ - represented by ٹوپی 'topi' or context)
              </span>
            </td>
            <td>Here</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">و</span>
            </td>
            <td>Vao</td>
            <td>v / oo / au / ow</td>
            <td>
              <span className="urdu-text">وقت (Waqt) / دو (Do)</span>
            </td>
            <td>Time / Two</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ہ, ﮧ</span>
            </td>
            <td>Chhoṭi He</td>
            <td>h (at end) / vowel marker</td>
            <td>
              <span className="urdu-text">گھر (Ghar) / کتابﮧ (Kitaab-e)</span>
            </td>
            <td>Home / Of the book</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ھ</span>
            </td>
            <td>Do Chashmi He</td>
            <td>h (aspiration marker)</td>
            <td>
              <span className="urdu-text">
                کھانا (Khaana) / مٹھائی (Miṭhai)
              </span>
            </td>
            <td>Food / Sweet</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ء</span>
            </td>
            <td>Hamza</td>
            <td>' (glottal stop)</td>
            <td>
              <span className="urdu-text">مسءلہ (Mas'ala)</span>
            </td>
            <td>Problem</td>
          </tr>
          <tr>
            <td>
              <span className="urdu-text">ی</span>
            </td>
            <td>Ye</td>
            <td>y / ee / ai / e</td>
            <td>
              <span className="urdu-text">یار (Yaar) / چائے (Chai)</span>
            </td>
            <td>Friend / Tea</td>
          </tr>
        </tbody>
      </table>

      <h2>1.4 Short and Long Vowels: Giving Sound to Letters</h2>
      <p>
        Letters represent consonants. Vowels are indicated by marks or specific
        letters:
      </p>
      <ul>
        <li>
          <strong>
            Harakaat
            <span className="urdu-text">(حرکات - Short Vowels)</span>:
          </strong>
          Tiny marks
          <em>above</em>
          or
          <em>below</em>a consonant.
        </li>
        <ul>
          <li>
            <strong>
              Zabar
              <span className="urdu-text">(زبر) - َ</span>
            </strong>
            : Short "a" like in "cut".
            <span className="urdu-text">کَٹ (Kaṭ - Cut)</span>
          </li>
          <li>
            <strong>
              Zer
              <span className="urdu-text">(زیر) - ِ</span>
            </strong>
            : Short "i" like in "it".
            <span className="urdu-text">کِٹ (Kiṭ - Deceit)</span>
          </li>
          <li>
            <strong>
              Pesh
              <span className="urdu-text">(پیش) - ُ</span>
            </strong>
            : Short "u" like in "put".
            <span className="urdu-text">کُٹ (Kuṭ - Piece)</span>
          </li>
          <li>
            <em>
              Note: Harakaat are often omitted in everyday writing, learned
              through practice.
            </em>
          </li>
        </ul>
        <li>
          <strong>Long Vowels:</strong>
          Represented by specific letters (Alif, Wao, Ye) acting as vowel
          carriers.
        </li>
        <ul>
          <li>
            <strong>
              Alif
              <span className="urdu-text">(ا)</span>:
            </strong>
            Long "aa" sound.
            <span className="urdu-text">کھانا (Khaanaa - Food)</span>
          </li>
          <li>
            <strong>
              Wao
              <span className="urdu-text">(و)</span>:
            </strong>
            Long "oo" (as in "moon") or "au/ow" (as in "cow").
            <span className="urdu-text">
              سونا (Sonaa - Gold / Sleep), دو (Do - Two)
            </span>
          </li>
          <li>
            <strong>
              Ye
              <span className="urdu-text">(ی)</span>:
            </strong>
            Long "ee" (as in "see") or "ai" (as in "aisle").
            <span className="urdu-text">
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
      </ul>

      <h2>1.5 Consonants and Pronunciation: The Unique Sounds</h2>
      <p>Urdu has some distinctive consonant sounds:</p>
      <ul>
        <li>
          <strong>Aspirated Consonants:</strong>
          Pronounced with a strong puff of air. Marked by
          <strong>
            <span className="urdu-text">ھ (Do Chashmi He)</span>
          </strong>
          <em>after</em>
          the main consonant.
        </li>
        <ul>
          <li>
            <span className="urdu-text">کھ (kh) - کھانا (Khaana - Food)</span>
            vs.
            <span className="urdu-text">کانا (Kaana - One-eyed)</span>
          </li>
          <li>
            <span className="urdu-text">گھ (gh) - گھر (Ghar - Home)</span>
            vs.
            <span className="urdu-text">گر (Gir - Fall!)</span>
          </li>
          <li>
            <span className="urdu-text">چھ (chh) - چھت (Chhat - Roof)</span>
            vs.
            <span className="urdu-text">چت (Chat - Awareness)</span>
          </li>
          <li>
            <span className="urdu-text">
              جھ (jh) - جھگڑا (Jhagaṛa - Quarrel)
            </span>
            vs.
            <span className="urdu-text">جگر (Jigar - Liver)</span>
          </li>
          <li>
            <span className="urdu-text">پھ (ph) - پھول (Phool - Flower)</span>
            vs.
            <span className="urdu-text">پول (Pol - Layer)</span>
          </li>
          <li>
            <span className="urdu-text">تھ (th) - تھوک (Thook - Spit)</span>
            vs.
            <span className="urdu-text">توک (Tok - ?)</span>
          </li>
          <li>
            <span className="urdu-text">بھ (bh) - بھائی (Bhaai - Brother)</span>
            vs.
            <span className="urdu-text">بائی (Baai - ?)</span>
          </li>
          <li>
            <span className="urdu-text">ڈھ (ḍh) - ڈھول (Ḍhol - Drum)</span>
            vs.
            <span className="urdu-text">ڈول (Ḍol - ?)</span>
          </li>
          <li>
            <span className="urdu-text">
              ڑھ (ṛh) - پڑھنا (Paṛhna - To read)
            </span>
            vs.
            <span className="urdu-text">پڑنا (Paṛna - To fall)</span>
          </li>
        </ul>
        <li>
          <strong>Retroflex Consonants:</strong>
          Tongue curled back against the roof of the mouth
          <span className="urdu-text">(ٹ ṭ, ڈ ḍ, ڑ ṛ)</span>.
          <span className="urdu-text">ٹماٹر (Ṭamaaṭar - Tomato)</span>,
          <span className="urdu-text">ڈنڈا (Ḍanḍa - Stick)</span>,
          <span className="urdu-text">گاڑی (Gaṛi - Vehicle)</span>.
        </li>
        <li>
          <strong>Nasalization:</strong>
          Marked by
          <strong>
            <span className="urdu-text">ں (Noon Ghunna)</span>
          </strong>
          or implied, giving a nasal sound.
          <span className="urdu-text">یہاں (Yahaã - Here)</span>,
          <span className="urdu-text">
            انار (Anaar - Pomegranate - nasalized 'a')
          </span>
          .
        </li>
      </ul>

      <h2>1.6 Connecting Letters: Ittisaal (اتصال) - The Flow</h2>
      <p>
        Unlike English, Urdu letters
        <em>usually</em>
        connect to form words. Each letter changes shape depending on its
        position:
      </p>
      <ul>
        <li>
          <strong>Initial:</strong>
          Start of a word.
          <span className="urdu-text">بـ (Be in "بچہ" - Bachcha - Child)</span>
        </li>
        <li>
          <strong>Medial:</strong>
          Middle of a word.
          <span className="urdu-text">ـبـ (Be in "کتاب" - Kitaab - Book)</span>
        </li>
        <li>
          <strong>Final:</strong>
          End of a word.
          <span className="urdu-text">ـب (Be in "لب" - Lab - Lip)</span>
        </li>
        <li>
          <strong>Isolated:</strong>
          Standalone form.
          <span className="urdu-text">ب</span>
        </li>
      </ul>
      <p>
        Some letters (like
        <span className="urdu-text">ا, د, ڈ, ذ, ر, ڑ, ز, ژ, و</span>) don't
        connect to the
        <em>next</em>
        letter.
        <span className="urdu-text">
          کتاب (Kitaab - Book: ک connects to ت, ت connects to ا, but ا doesn't
          connect to ب, so ب is in isolated form)
        </span>
        .
      </p>

      <h2>1.7 Special Characters and Diacritics: The Finishing Touches</h2>
      <ul>
        <li>
          <strong>
            Hamza
            <span className="urdu-text">(ء)</span>:
          </strong>
          Represents a glottal stop (like the catch in "uh-oh"). It sits
          <em>on</em>
          Alif, Wao, Ye, or alone
          <em>above</em>
          the line.
          <span className="urdu-text">مسءلہ (Mas'ala - Problem)</span>,
          <span className="urdu-text">شء (Shai - Thing)</span>,
          <span className="urdu-text">ساءنس (Science)</span>.
        </li>
        <li>
          <strong>
            Madd
            <span className="urdu-text">(ـٓ)</span>:
          </strong>
          A small tilde-like mark over Alif indicating extra elongation (often
          in Arabic words).
          <span className="urdu-text">قرآن (Qur'aan)</span>.
        </li>
        <li>
          <strong>
            Tashdeed
            <span className="urdu-text">( ّ - Shadda)</span>:
          </strong>
          Doubling a consonant. Place it
          <em>above</em>
          the letter.
          <span className="urdu-text">
            دُکّان (Dukkaan - Shop - pronounced duk-kaan)
          </span>
          . See 1.9.
        </li>
        <li>
          <strong>
            Jazam
            <span className="urdu-text">( ْ - Sukoon)</span>:
          </strong>
          Indicates
          <em>no vowel</em>
          after the consonant. Place it
          <em>above</em>
          the letter.
          <span className="urdu-text">
            اِنْسان (Insaan - Human - 'n' has no vowel)
          </span>
          . See 1.9.
        </li>
      </ul>

      <h2>1.8 Syllabification and Stress: The Rhythm of Words</h2>
      <ul>
        <li>
          <strong>Syllables:</strong>A unit of pronunciation with one vowel
          sound. Break words between consonants: Ki-taa-b
          <span className="urdu-text">(کتاب - Book: 3 syllables)</span>,
          Pa-ṛh-na
          <span className="urdu-text">(پڑھنا - To read: 3 syllables)</span>,
          Aa-dmi
          <span className="urdu-text">(آدمی - Man: 3 syllables)</span>.
        </li>
        <li>
          <strong>Stress:</strong>
          Urdu stress is generally
          <strong>light</strong>
          and often falls on the
          <strong>penultimate</strong>
          (second-last) syllable, but it can shift meaning. Practice listening
          is key.
        </li>
      </ul>
      <ul>
        <li>
          <span className="urdu-text">سامان (Saa-MAAN - Luggage)</span>
        </li>
        <li>
          <span className="urdu-text">مقابلہ (Mu-QAA-bi-la - Competition)</span>
          - Stress on "qaa".
        </li>
        <li>
          Sometimes:
          <span className="urdu-text">کہنا (Keh-NAA - To say)</span>
          vs.
          <span className="urdu-text">کہا (KA-haa - Said - Past tense)</span>.
        </li>
      </ul>

      <h2>1.9 Tashdeed (تشدید) and Jazam (جزم): Doubling and Stopping</h2>
      <ul>
        <li>
          <strong>
            Tashdeed
            <span className="urdu-text">(ّ)</span>:
          </strong>
          This small "w" shaped mark
          <strong>doubles</strong>
          the consonant it's placed over. You pronounce the consonant twice,
          held a bit longer.
          <span className="urdu-text">دُکّان (Duk-kaan - Shop)</span>,
          <span className="urdu-text">مَدَّت (Mad-dat - Period)</span>,
          <span className="urdu-text">قِطّہ (Qiṭ-ṭa - Drop)</span>.
        </li>
        <li>
          <strong>
            Jazam / Sukoon
            <span className="urdu-text">(ْ)</span>:
          </strong>
          This small circle-like mark placed
          <em>above</em>a consonant indicates there is
          <strong>NO vowel sound</strong>
          after that consonant. It "stops" the vowel.
          <span className="urdu-text">
            اِنْسان (In-saan - Human - the 'n' has no vowel, it's just 'n')
          </span>
          ,<span className="urdu-text">اِسْتاد (Us-taad - Teacher)</span>,
          <span className="urdu-text">مَکْتَب (Mak-tab - Office/Desk)</span>.
        </li>
      </ul>

      <div className="review-section">
        <h2>Chapter 1 Review: Building Blocks Recap</h2>
        <ul>
          <li>Urdu has a rich history blending multiple languages.</li>
          <li>Nastaliq is the standard, flowing script.</li>
          <li>
            The Urdu alphabet (Huroof-e-Tahajji) has 39 basic letters, each with
            4 forms (initial, medial, final, isolated).
          </li>
          <li>
            Vowels are short (Harakaat: Zabar, Zer, Pesh) or long (using Alif,
            Wao, Ye).
          </li>
          <li>
            Unique sounds include aspirated consonants (kha, gha, cha, jha, pha,
            tha, bha, ḍha, ṛha) and retroflex consonants (ṭ, ḍ, ṛ).
          </li>
          <li>
            Letters connect within words (Ittisaal), changing shape based on
            position. Some letters don't connect forward.
          </li>
          <li>
            Special characters include Hamza (ء) for glottal stop, Madd (ـٓ) for
            extra elongation.
          </li>
          <li>
            Tashdeed (ّ) doubles a consonant; Jazam/Sukoon (ْ) indicates no
            vowel after a consonant.
          </li>
          <li>
            Words are divided into syllables. Stress is usually light and often
            on the penultimate syllable.
          </li>
        </ul>
      </div>

      <div className="quiz-section">
        <h2>Chapter 1 Quiz: Test Your Foundations!</h2>
        <div className="quiz-question">
          1. Which script is the standard for writing Urdu?
        </div>
        <ol className="quiz-options">
          <li>Naskh</li>
          <li>Nastaliq</li>
          <li>Devanagari</li>
          <li>Roman</li>
        </ol>

        <div className="quiz-question">
          2. What does "Do Chashmi He" (ھ) indicate when placed after a
          consonant?
        </div>
        <ol className="quiz-options">
          <li>Nasalization</li>
          <li>Doubling of the consonant</li>
          <li>Aspiration (a strong puff of air)</li>
          <li>No vowel sound</li>
        </ol>

        <div className="quiz-question">
          3. Identify the letter combination for the aspirated 'bh' sound:
        </div>
        <ol className="quiz-options">
          <li>
            <span className="urdu-text">به</span>
          </li>
          <li>
            <span className="urdu-text">بھ</span>
          </li>
          <li>
            <span className="urdu-text">بح</span>
          </li>
          <li>
            <span className="urdu-text">بہ</span>
          </li>
        </ol>

        <div className="quiz-question">
          4. What sound does "Zer" ( ِ ) represent?
        </div>
        <ol className="quiz-options">
          <li>Short "a" (as in "cut")</li>
          <li>Short "i" (as in "it")</li>
          <li>Short "u" (as in "put")</li>
          <li>Long "aa"</li>
        </ol>

        <div className="quiz-question">
          5. What is the primary function of Alif (ا) in a word?
        </div>
        <ol className="quiz-options">
          <li>Always represents the consonant 'a'</li>
          <li>Acts as a placeholder or carrier for long "aa" sound</li>
          <li>Indicates a glottal stop</li>
          <li>Marks the end of a word</li>
        </ol>

        <div className="quiz-question">
          6. True or False: All Urdu letters connect to the following letter
          within a word.
        </div>

        <div className="quiz-question">
          7. What does Tashdeed ( ّ ) do to a consonant?
        </div>
        <ol className="quiz-options">
          <li>Makes it silent</li>
          <li>Adds a vowel sound after it</li>
          <li>Doubles it (pronounce it longer)</li>
          <li>Changes its sound completely</li>
        </ol>

        <div className="quiz-question">
          8. What does Jazam/Sukoon ( ْ ) indicate?
        </div>
        <ol className="quiz-options">
          <li>A long vowel</li>
          <li>A short vowel</li>
          <li>No vowel sound after the consonant</li>
          <li>A glottal stop</li>
        </ol>

        <div className="quiz-question">
          9. How many syllables are in the word "استاد" (Ustaad - Teacher)?
        </div>
        <ol className="quiz-options">
          <li>1 (Us-taad)</li>
          <li>2 (Us-tad)</li>
          <li>3 (U-s-taad)</li>
          <li>4</li>
        </ol>

        <div className="quiz-question">
          10. Where does stress usually fall in Urdu words?
        </div>
        <ol className="quiz-options">
          <li>On the first syllable</li>
          <li>On the last syllable</li>
          <li>On the second-last (penultimate) syllable</li>
          <li>There is no fixed pattern</li>
        </ol>

        <div className={"quiz-answers"}>
          (Answers: 1b, 2c, 3b, 4b, 5b, 6 False (e.g., ا, د, ڈ, etc. don't
          connect forward), 7c, 8c, 9a [Us-taad - 2 syllables], 10c)
        </div>
      </div>
    </div>
  );
};

export default Chapter1;
