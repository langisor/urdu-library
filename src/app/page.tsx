import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/course-book">Course Book</Link>
      <Link href="/alphabets">Alphabets</Link>
      <Link href="/urdu-script-book">Urdu Script Book</Link>
    </div>
  );
}
