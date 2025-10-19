import { Card } from "@/components/ui/card";
import data from "./vocs-data.json";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";

export default function Demo2() {
 

  return (
    <Card>
      <h1>Demo2</h1>
      <JsonViewerComponent data={data} />
    </Card>
  );
}
