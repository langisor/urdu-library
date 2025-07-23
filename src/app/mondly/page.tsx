"use client"
import { vocabs, getVocabularyItems, getTotalWords } from "@/data/mondly-urdu-vocas"
import { JsonViewerComponent } from "@/components/json-viewer"
function showVocab(vocab: any){
    console.log(vocab)
}
export default function MondlyPage(){
    return (
        <div>
            <h1>Mondly</h1>
            <JsonViewerComponent data={ getTotalWords()} />
        </div>
    )
}