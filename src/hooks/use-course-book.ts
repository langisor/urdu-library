import SWR from "swr";
import { IBookData } from "@/data/course-book/ts-definition";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCourseBook = () => {
  const { data, error, isLoading } = SWR<IBookData>("/api/json/course-book", fetcher);
  return { data, error, isLoading };
};
