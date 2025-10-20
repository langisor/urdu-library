import { Card } from "@/components/ui/card";
import vocsData from "./vocs-data.json";
import exersData from "./exers-data.json";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";

export default function Demo2() {
  const new_struct = exersData.map((ex) => {
    return {
      unit: ex.unit,
      chapter: ex.chapter,
      type: ex.type,
      number: ex.number,
      id: ex.id,
      data: {},
    };
  });
  return (
    <Card>
      <h1>Demo2</h1>
      <h1 className="text-lg">Vocabularies....</h1>
      <JsonViewerComponent data={vocsData} />
      <h1 className="text-lg">Exercizes</h1>
      <JsonViewerComponent data={new_struct} />
    </Card>
  );
}
