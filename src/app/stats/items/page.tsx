import { queryClient } from "@/lib/postgres-client";
import { ItemsTable } from "./_components/items-table";
 
interface Item {
  id: number;
  word_id: number;
 
  mother_text: string;
  target_text: string;
  phonetic: string;
   audio_src: string;
}

async function getStats() {
  const itemsData = await queryClient`
     SELECT * from "Item"
    `;

  const items: Item[] = itemsData.map((item) => ({
    id: item.id,
    word_id: item.wordID,
    audio_src: item.key,
    mother_text: item.vItemData.sols[0].text,
    target_text: item.vItemData.sols[1].text,
    phonetic: item.vItemData.sols[1].phonetic,
  }));

  return items;
}

export default async function StatsPage() {
  const items = await getStats();
  return (
   <ItemsTable items={items} title="Items Table" />
  );
}
