import { queryClient } from "@/lib/postgres-client";
import { Row } from "postgres";
 import {IVocabulary} from "@/app/mondly/_types/vocabulary";

export async function getVocabulyData( vid: string) {
   
  const vocNo = Number(vid);
  console.log("vocNo", vocNo);
  const vocabulary = await queryClient`
   SELECT * FROM "Vocabulary" WHERE "id" = ${vocNo};
 `;
  const [categoryID, vItems] =[vocabulary[0].categoryID,vocabulary[0].vItems];
//  get the category name 
const categoryName = await queryClient`
   SELECT "name" FROM "Category" WHERE "id" = ${categoryID};
 `;
 console.log("categoryName", categoryName); 
//  get the vItems 
 const vItemDataResult:any[] = [];
 for(const vItem of vItems){
  vItemDataResult.push(await queryClient`SELECT * FROM "VocabularyItem" WHERE "id" = ${vItem};`);
 }
 const vItemDataArray = vItemDataResult.map((row:any) => row.vItemData);
console.log("vItemDataArray", vItemDataArray);
 const vocData={
  categoryName:categoryName[0].name,
  vocabulary:vocabulary[0],
  vItemDataArray:vItemDataArray
 }
return vocData;
}
   

 
