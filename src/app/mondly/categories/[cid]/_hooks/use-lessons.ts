import useSWR from "swr";

//  backend api
const API_URL = "https://langisor-app.netlify.app/api/v2/";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * fetches specific category lessons data from backend api  for example https://langisor-app.netlify.app/api/v2/c/[cid]
 *
 * @param _cid category id
 */

// note this not async function
export function useLessons(_cid: number) {
  const { data, isLoading, error } = useSWR(`${API_URL}c/${_cid}`, fetcher);
  const lessons: any[] = data?.lessons;
  // filter lessons to get only lessons with id less than or equal to 6
  const filteredLessons = lessons?.filter((lesson: any) => lesson.id <= 6);
  return { lessons: filteredLessons, isLoading, error };
}
