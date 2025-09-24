

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lid: string }>;
}) {
  const { lid } = await params;
  return <pre>Lesson ID: {JSON.stringify(lid, null, 2)}</pre>;
}
