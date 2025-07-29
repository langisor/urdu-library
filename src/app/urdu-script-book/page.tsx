import alphabetsData from "@/data/additional/alphabet-tabel.json";
import { JsonViewerComponent } from "@/components/json-viewer";   
interface AlphabetsData {
  title: string;
  alphabets: {
    letter_alone: string;
    initial_form: string;
    medial_form: string;
    final_form: string;
    name_romanized: string;
    basic_sound_romanized: string;
    audio_link: string;
  }[];
}

export default function UrduScriptBookPage() {
  return  (
    <div>
      <h1 className="text-3xl font-bold">Urdu Script Book Page</h1>
      <JsonViewerComponent data={alphabetsData} />
    </div>
  );
}
