import v101 from "./101.json";
import v201 from "./201.json";
import v301 from "./301.json";
import v401 from "./401.json";
import v501 from "./501.json";
import v601 from "./601.json";
import v701 from "./701.json";
import v801 from "./801.json";
import v901 from "./901.json";
import v1001 from "./1001.json";
import v1101 from "./1101.json";
import v1201 from "./1201.json";
import v1301 from "./1301.json";
import v1401 from "./1401.json";
import v1501 from "./1501.json";
import v1601 from "./1601.json";
import v1701 from "./1701.json";
import v2201 from "./2201.json";
import v2301 from "./2301.json";
import v2401 from "./2401.json";
import v2501 from "./2501.json";
import v2601 from "./2601.json";
import v2701 from "./2701.json";
import v2801 from "./2801.json";
import v2901 from "./2901.json";
import v3001 from "./3001.json";
import v3101 from "./3101.json";
import v3401 from "./3401.json";
import v3601 from "./3601.json";
import v3701 from "./3701.json";
import v3801 from "./3801.json";
import v3901 from "./3901.json";
import v4001 from "./4001.json";
import v8801 from "./8801.json";
import v8901 from "./8901.json";
import v9001 from "./9001.json";
import v9101 from "./9101.json";

// export all vocabs 
export const vocabs = [
    v101,
    v201,
    v301,
    v401,
    v501,
    v601,
    v701,
    v801,
    v901,
    v1001,
    v1101,
    v1201,
    v1301,
    v1401,
    v1501,
    v1601,
    v1701,
    v2201,
    v2301,
    v2401,
    v2501,
    v2601,
    v2701,
    v2801,
    v2901,
    v3001,
    v3101,
    v3401,
    v3601,
    v3701,
    v3801,
    v3901,
    v4001,
    v8801,
    v8901,
    v9001,
    v9101,
]
export function getVocabulary(vocabularyId: number){
    switch (vocabularyId) {
        case 101:
            return v101;
        case 201:
            return v201;
        case 301:
            return v301;
        case 401:
            return v401;
        case 501:
            return v501;
        case 601:
            return v601;
        case 701:
            return v701;
        case 801:
            return v801;
        case 901:
            return v901;
        case 1001:
            return v1001;
        case 1101:
            return v1101;
        case 1201:
            return v1201;
        case 1301:
            return v1301;
        case 1401:
            return v1401;
        case 1501:
            return v1501;
        case 1601:
            return v1601;
        case 1701:
            return v1701;
        case 2201:
            return v2201;
        case 2301:
            return v2301;
        case 2401:
            return v2401;
        case 2501:
            return v2501;
        case 2601:
            return v2601;
        case 2701:
            return v2701;
        case 2801:
            return v2801;
        case 2901:
            return v2901;
        case 3001:
            return v3001;
        case 3101:
            return v3101;
        case 3401:
            return v3401;
        case 3601:
            return v3601;
        case 3701:
            return v3701;
        case 3801:
            return v3801;
        case 3901:
            return v3901;
        case 4001:
            return v4001;
        case 8801:
            return v8801;
        case 8901:
            return v8901;
        case 9001:
            return v9001;
        case 9101:
            return v9101;
        default:
            return null;
    }
}

export function getVocabularyItems(vocabularyId: number){
    const vocab =  getVocabulary(vocabularyId);
    if (!vocab) return null;
    return vocab.vItems;
}
export interface IVocabularyItem {
    id: number;
    vocabulary: number;
    wordID: number;
    key: string;
    sols: {
        key: string;
        text: string;
        dictionary: {
            raw: string;
            translations: {
                type: string;
                text: string;
                phonetic: string;
            }[];
        }[];
    }[];
    audio_updated_at: number;
}

export interface IVocabulary {
    id: number;
    index: number;
    category: number;
    categoryID: number;
    isCourse: boolean;
    name: string | null;
    disabled: boolean;
    done: boolean;
    stars: number;
    countItem: number;
    countWords: number;
    countPhrases: number;
    countDone: number;
    vItems: number[];
}
    
export function getTotalWords(){
    let totalWords = 0;
    let totalPhrases = 0;
    let totalItems = 0;
    for(const vocab of vocabs){
        const items =  getVocabulary(vocab.vocabulary.id)
        if (!items) continue;
        totalWords += items.vocabulary.countWords;
        totalPhrases += items.vocabulary.countPhrases;
        totalItems += items.vocabulary.countItem;
    }
    return {
        totalWords,
        totalPhrases,
        totalItems
    };
}