import {queryClient} from "@/lib/postgres-client";
import {Row} from "postgres";
interface GetVocabulariesProps {
 cid: string;
}

export async function getVocabularies({ cid }: GetVocabulariesProps) {
 let vocabulary: Row[] = [];
 vocabulary = await queryClient`
   SELECT * FROM "Vocabulary" WHERE "id" = ${cid};
 `;
 // get vItems
 const vItems = vocabulary[0].vItems as number[];
 const vItemDataArray: Row[] = [];
 const column = ["vItemData"];
 for (const vItem of vItems) {
   const vItemData = await queryClient`
     SELECT ${queryClient(column)} FROM "Item" WHERE "id" = ${vItem};
   `;
   vItemDataArray.push(vItemData[0]);
 }
  // extract vItemData 
  const extractedVItemDataArray = vItemDataArray.map((vItemData) => vItemData.vItemData);
 return { vocabulary: vocabulary[0], vItemDataArray: extractedVItemDataArray };
}

export async function getCategoryName(cid:string){
 // first, get the category id (category) from Vocabulary table
 const categoryId=await queryClient`
   SELECT "category" FROM "Vocabulary" WHERE "id" = ${cid};
 `;
 // second, get the category name from Category table
 const categoryName=await queryClient`
   SELECT "name" FROM "Category" WHERE "id" = ${categoryId[0].category};
 `;
 return categoryName[0].name;
}