export default async function DialoguesPage({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
        Dialogues
      </h1>
    </div>
  );
}