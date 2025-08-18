// To parse this data:
//
//   import { Convert, IVocabulary } from "./file";
//
//   const iVocabulary = Convert.toIVocabulary(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface IVocabulary {
 id: number;
 vocabulary: number;
 wordID: number;
 key: string;
 sols: Sol[];
 audio_updated_at: number;
}

interface Sol {
 key: string;
 text: string;
 dictionary: Dictionary[];
 phonetic?: string;
}

interface Dictionary {
 raw: string;
 translations: Translation[];
}

interface Translation {
 type: string;
 text: string;
 phonetic: null;
}
