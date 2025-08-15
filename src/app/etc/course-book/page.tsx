import book from "./_components/toc.json";
import BookBrowser from "./_components/book-browser";
import { Unit } from "./_components/difinitions";

export default function DemoPage() {
  return <BookBrowser data={book as Unit[]} />;
}
