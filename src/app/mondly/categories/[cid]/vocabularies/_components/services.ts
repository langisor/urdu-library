import { queryClient } from "@/lib/postgres-client";
import { Vocabulary, VocabularyItem } from "@/app/mondly/_types/data-services";
export async function getVocabulyData(vid: string) {
  const vocabulary = (
    await queryClient`
  SELECT * FROM "Vocabulary" WHERE id = ${vid}
  `
  )[0] as Vocabulary;
  //  get cat id
  const catId = vocabulary.categoryID;
  const catName = (
    await queryClient`
  SELECT name FROM "Category" WHERE id = ${catId}
  `
  )[0] as { name: string };
  // get  vItemData
  const vItemIds = vocabulary.vItems;
  const vItemDataArray = [];
  for (const vItemId of vItemIds) {
    const vItemData = (
      await queryClient`
    SELECT  "vItemData"  FROM "Item" WHERE id = ${vItemId}
    `
    )[0].vItemData as VocabularyItem;
    vItemDataArray.push(vItemData);
  }
  // extract vItemData from vItemDataArray
  const vItemData = vItemDataArray.map((item) => item);

  return {
    categoryName: catName.name,
    vocabulary,
    vItemData,
  };
}
