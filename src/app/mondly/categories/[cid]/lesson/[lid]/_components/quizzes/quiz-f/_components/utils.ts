export interface QuizOption {
  key: string;
  text: string;
  phonetic?: string;
  image?: string;
  image_updated_at?: number;
  audio_updated_at?: number;
}

export interface QuizItem {
  id: number;
  lesson: number;
  type: string;
  modifiers: number;
  wordID: number;
  alternates: number[];
  sols: QuizOption[];
  alts: QuizOption[];
}

export interface QuizData {
  quizzes: QuizItem[];
}

export function getImageUrl(imageKey: string, timestamp?: number) {
  // return `https://d37sy4vufic209.cloudfront.net/phrase-images/${imageKey}?t=${timestamp}`;
  return `/course-images/${imageKey}`;
}

export function getAudioUrl(audioKey: string, timestamp: number) {
  return `https://d13tz37rv54ob.cloudfront.net/ur/${audioKey}?t=${timestamp}`;
}

export function playAudio(url: string) {
  const audio = new Audio(url);
  return audio.play();
}
// 2 samples of quiz D quizzes

export const quizData: QuizData = {
  quizzes: [
    {
      id: 640361,
      lesson: 101,
      type: "D",
      modifiers: 327,
      wordID: 18218,
      alternates: [18205, 18231, 18193],
      sols: [
        {
          key: "MvBJbVfJec8if_rV-Jh-JqiR8USEzz2p",
          audio_updated_at: 1580691746,
          text: "أخت",
        },
        {
          key: "5yJIklmE-tT6L44G-d2no9epgjQXY1kV",
          audio_updated_at: 1580691716,
          text: "أخ",
        },
        {
          key: "ECesPxudUVyz1ZGU32dd7_FM9tLkUfZl",
          audio_updated_at: 1580691727,
          text: "أب",
        },
        {
          key: "q4K4ygsldjKYXyl4-_1MooYSy9QTMmUw",
          audio_updated_at: 1580691735,
          text: "أم",
        },
      ],
      alts: [
        {
          key: "MvBJbVfJec8if_rV-Jh-JqiR8USEzz2p",
          audio_updated_at: 1580691746,
          image: "ZBF1FFH_qaeP0iMstKZAJSmjYuGUmlHD",
          image_updated_at: 1689159130,
          text: "بہن",
          phonetic: "behan",
        },
        {
          key: "5yJIklmE-tT6L44G-d2no9epgjQXY1kV",
          audio_updated_at: 1580691716,
          image: "vl6fESikntX8AhrQYU0sjpNS-e8bN2vm",
          image_updated_at: 1689159122,
          text: "بھائی",
          phonetic: "bhai",
        },
        {
          key: "ECesPxudUVyz1ZGU32dd7_FM9tLkUfZl",
          audio_updated_at: 1580691727,
          image: "qw5T9p-5MQ2FeRgMVwcIKhTj9sIzVNZJ",
          image_updated_at: 1689159125,
          text: "باپ",
          phonetic: "baap",
        },
        {
          key: "q4K4ygsldjKYXyl4-_1MooYSy9QTMmUw",
          audio_updated_at: 1580691735,
          text: "والدہ",
          phonetic: "walida",
          image: "r4pxGRXv2CnWTPSiIjgo7hfi7mOeML3m",
          image_updated_at: 1689159128,
        },
      ],
    },
    {
      id: 608905,
      lesson: 205,
      type: "D",
      modifiers: 327,
      wordID: 18221,
      alternates: [18188, 18237, 18223],
      sols: [
        {
          key: "DPkAO64vrrgADqbCRI_uGuIwgEDUC44W",
          audio_updated_at: 1688821942,
          text: "عمة",
        },
        {
          key: "Vgi5oeaMwkoJyeikKd4Hgs5QEag8tM6f",
          audio_updated_at: 1580691752,
          text: "عم",
        },
        {
          key: "p7nBU02xSEkJZD8IkkH2lzYOwWhj2BGh",
          audio_updated_at: 1688821948,
          text: "ابن أخ",
        },
        {
          key: "pF8r7wuDtPPTPEZPrvCTwETWqQUgpO-e",
          audio_updated_at: 1580691739,
          text: "ابنة أخ",
        },
      ],
      alts: [
        {
          key: "DPkAO64vrrgADqbCRI_uGuIwgEDUC44W",
          audio_updated_at: 1688821942,
          image: "h1ROtARoDS0Yhl4H24J6pSXaK99DPMbO",
          image_updated_at: 1689159120,
          text: "چاچی",
          phonetic: "chachi",
        },
        {
          key: "Vgi5oeaMwkoJyeikKd4Hgs5QEag8tM6f",
          audio_updated_at: 1580691752,
          image: "Adc6c0kTGGNCaYeSl-Kzm3M9BtUMY-vE",
          image_updated_at: 1689159132,
          text: "چچا",
          phonetic: "chacha",
        },
        {
          key: "p7nBU02xSEkJZD8IkkH2lzYOwWhj2BGh",
          audio_updated_at: 1688821948,
          text: "بھتیجا",
          phonetic: "bhateeja",
          image: "cR9v2rW22J-WmZOSeMgyJg02Tetl9yMJ",
          image_updated_at: 1689159128,
        },
        {
          key: "pF8r7wuDtPPTPEZPrvCTwETWqQUgpO-e",
          audio_updated_at: 1580691739,
          image: "Hu5cNyQfkAGboT01QoLLAvxsU5-Le9h8",
          image_updated_at: 1689159129,
          text: "بھانجی",
          phonetic: "bhanji",
        },
      ],
    },
  ],
};
