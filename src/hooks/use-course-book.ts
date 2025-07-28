import SWR from "swr";
import { MediaDirectoryTree } from "@/data/helpers/utils";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCourseBook = () => {
  const { data, error, isLoading } = SWR<MediaDirectoryTree>(
    "/api/books",
    fetcher
  );
  return { data, error, isLoading };
};
