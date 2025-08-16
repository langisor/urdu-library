import { DynamicBreadcrumb } from "@/app/mondly/_components/dynamic-breadcrumb";
interface VocabulariesPageProps {
  searchParams: Promise<{ cid: string }>;
}
export default async function VocabulariesPage({
  searchParams,
}: VocabulariesPageProps) {
  const { cid } = await searchParams;
 
  return (
    <div className="flex flex-col gap-4">
      <DynamicBreadcrumb />
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
        Vocabularies
      </h1>
    </div>
  );
}
