import { AlphabetsCard } from "@/components/alphabets/alphabets-card";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function AlphabetsPage() {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-3">
        <AlphabetsCard />
      </div>
    </ScrollArea>
  );
}
