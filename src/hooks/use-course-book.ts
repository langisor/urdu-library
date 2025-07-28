import SWR from "swr";
import { BookData } from "@/data/course-book/definition";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCourseBook = () => {
  const { data, error, isLoading } = SWR<BookData>("/api/books", fetcher);
  return { data, error, isLoading };
};
