import { IVocabulary, VocabularyItem } from "./types";
export const shuffleArray = <T extends any[]>(array: T): T => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

// Helper function to generate a set of unique random options
export const getFourRandomOptions = (correctItem: string, allItems: VocabularyItem[]): string[] => {
    const options = new Set<string>();
    options.add(correctItem);

    while (options.size < 4) {
        const randomIndex = Math.floor(Math.random() * allItems.length);
        const randomOption = allItems[randomIndex].sols[1].text;
        options.add(randomOption);
    }

    return shuffleArray(Array.from(options));
};