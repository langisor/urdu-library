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
 
export default function MondlyPage(){

    return (
        <div>
            <h1>Mondly</h1>
            <JsonViewerComponent data={   getVocabularyItems(101)} />
        </div>
    )
}