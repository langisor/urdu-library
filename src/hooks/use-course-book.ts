import SWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCourseBook = () => {
  const { data, error, isLoading } = SWR("/api/course-book", fetcher);
  return { data, error, isLoading };
};
