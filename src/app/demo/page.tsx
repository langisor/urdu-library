 
import { queryClient } from "@/lib/postgres-client"; 
import {Quizzer} from "./_components/quizzer";



async function getVocabularyItems(vid:number){
 const vItems=await queryClient`
 SELECT * from "Item" where "vocabulary"=${vid}
 `
 console.log(vItems);
 const vocs:any[]=[];

 for(const item of vItems){
 vocs.push(item.vItemData)
 }
  return vocs;
}


export default async function Demo() {
    const vocs=await getVocabularyItems(101);
    console.log(vocs);
    return (
        <div>
            <h1>demo</h1>
            <Quizzer  vocs={vocs} /> 
        </div>
    )
}
