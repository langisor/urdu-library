import { Card } from "@/components/ui/card";
import vocsData from "./vocs-data.json";
import exersData from "./exers-data.json";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";

export default function Demo2() {
  const new_struct: any[] = [];
  vocsData.forEach((voc, index) => {
    if (voc.table) {
      voc.table.data?.forEach((item, index) => {
        new_struct.push({
          id: index,
          english: item.English,
          transliteration: item.Transliteration,
          urdu: item.Urdu,
          arabic: item.Arabic,
        });
      });
    }
  });

  return (
    <Card>
      <h1>Demo2</h1>
      {/* <h1 className="text-lg">Vocabularies....</h1>
      <JsonViewerComponent data={vocsData} />
      <h1 className="text-lg">Exercizes</h1>
      <JsonViewerComponent data={new_struct} /> */}
      {/* <SmartVocabularyTable   /> */}
    </Card>
  );
}
