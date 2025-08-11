/**
 * Generate a random string
 */
export function generateRandomString(length: number = 8): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Delay execution for specified milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [
      shuffledArray[j]!,
      shuffledArray[i]!,
    ];
  }
  return shuffledArray;
}

// export function getImageUrl(imageId: string): string {
//   return `/images/course-images/${imageId}`;
// }

export function getImageUrl(imageId: string): string {
  return `https://d37sy4vufic209.cloudfront.net/phrase-images/${imageId}`;
}
export function getLocalImageUrl(imageId: string): string {
  return `/images/course-images/${imageId}`;
}

export function getAudioUrl(audioId: string, audio_updated_at: number): string {
  return `https://d13tz37rv54ob.cloudfront.net/ur/${audioId}?t=${audio_updated_at}`;
}
