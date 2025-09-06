export function capitalizeFirstChar(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isValidQuizType(input: string): boolean {
    const validStrings = new Set(['t1', 'q', 'f', 't1b', 'c2b', 'r', 'l1', 'd', 'p', 'w1b', 'qb', 'c1b', 't2', 't2b']);
    return validStrings.has(input);
}

export function isValidCatId(id: number) {
  const validCategoriesIds = new Set([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 34, 35, 36, 37, 38, 39, 40, 88, 89, 90, 91,
  ]);
  return validCategoriesIds.has(id);
}
export function getAudioUrl(key: string): string {
  return `/media/mondly/audios/${key}`;
 }
 
 export function getImageUrl(image: string): string {
  return `/media/mondly/images/${image}`;
 }
 
 export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
 }