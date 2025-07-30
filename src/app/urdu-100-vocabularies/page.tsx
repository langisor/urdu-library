import Link from "next/link";

export default function Urdu100PhrasesPage() {
  return (
    <div className="text-xl font-bold p-4">
      <h1 className="text-2xl mb-4">TODO: Urdu 100 Phrases</h1>
      <Link
        href="https://www.goethe-verlag.com/book2/AR/ARUR/ARUR004.HTML"
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        Click here to redirect you to website
      </Link>
    </div>
  );
}
