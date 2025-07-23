"use client"
import { vocabs, getVocabularyItems, getTotalWords, getVocabulary, getAudioUrl } from "@/data/mondly-urdu-vocas"
import { JsonViewerComponent } from "@/components/json-viewer"

interface ISimpleVocabulary{
    id: number;
    wordID: number;
    audio:string;
    mText: string;
    tText: string;
    phonetic: string;
    
}


function simplifyData(vocabularyId: number){
    const items = getVocabularyItems(vocabularyId);
    if (!items) return null;
    const rows: ISimpleVocabulary[] = [];
    for(const item of items){
        const audio = getAudioUrl(item.key,item.audio_updated_at)
        const tText = item.sols[0].text;
        const mText=item.sols[1].text;
        const phonetic = item.sols[1].phonetic;
        rows.push({
            id: item.id,
            wordID: item.wordID,
            audio: audio,
            mText,
            tText,
             phonetic: phonetic || ""
        })
    }
    return rows;
}
export default function MondlyPage(){
    return (
        <div>
            <h1>Mondly</h1>
            <JsonViewerComponent data={  simplifyData(101)} />
        </div>
    )
}