export function getAudioUrl(key: string): string {
 return `/media/mondly/audios/${key}`;
}

export function getImageUrl(key: string): string {
 return `/media/mondly/images/${key}`;
}

export function shuffleArray<T>(array: T[]): T[] {
 const shuffledArray = [...array];
 for (let i = shuffledArray.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
 }
 return shuffledArray;
}