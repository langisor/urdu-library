import toc from "@/data/toc.json";

const PartsData = toc.table_of_contents[5].parts?.map((part) => part);
const chapters = toc.table_of_contents[6].chapters?.map((chapter) => {
  return {
    ...chapter,
    topics : chapter.sub_topics?.map((topic) => topic),
  };
});
const units_start = toc.table_of_contents[7];
const UnitsData: any[] = [];
for (let i = 7; i <= toc.table_of_contents.length; i++) {
  UnitsData.push(toc.table_of_contents[i]);
}

function findLessonByIndex(index: number) {
  const lessons = PartsData?.map((part) => part.lessons);

  return lessons?.flat()?.[index];
}
export { findLessonByIndex, UnitsData, PartsData, chapters as ChaptersData };
