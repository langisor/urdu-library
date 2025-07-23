"use client"
import { vocabs, getVocabularyItems, getTotalWords, getVocabulary, getAudioUrl } from "@/data/mondly-urdu-vocas"
import { JsonViewerComponent } from "@/components/json-viewer"

interface ISimpleVocabulary{
    id: number;
    wordID: number;
    audioUrl:string;
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
            audioUrl: audio,
            mText,
            tText,
         
             phonetic: phonetic || ""
        })
    }
    return rows;
} 
 

interface IDict {
    id: number;
    tRaw: string;
    mRaw: string;
    
    
} 


function buildDictionary(vocabularyId: number){
    const items = getVocabularyItems(vocabularyId);
    if (!items) return null;
    const rows: IDict[] = [];
    let id=1;
    for(const item of items){
        const t:string[]= item.sols[0].dictionary.map((sol) => sol.raw);
        const m:string[]= item.sols[1].dictionary.map((sol) => sol.raw);

        for(let i=0;i<t.length;i++){
            rows.push({
                id: id++,
                tRaw: t[i],
                mRaw: m[i]
            })
        }

    }
    return rows;
}
function buildDictionaries(){
    const dicts: IDict[] = [];
    for(let i of vocabs){
        const dict = buildDictionary(i.vocabulary.id)
        if(dict){
            dicts.push(...dict)
        }
    }
    return dicts;
}

export default function MondlyPage(){
    const dicts = buildDictionaries();
    console.log("dicts : ",dicts.length);
    return (
        <div>
            <h1>Mondly</h1>
            {/* <JsonViewerComponent data={  simplifyData(101)} /> */}
            {/* <hr /> */}
            <JsonViewerComponent data={  dicts} />
        </div>
    )
}