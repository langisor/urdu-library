// --- TypeScript Definitions ---
// Define types for the data structures to improve code clarity and safety
export interface QuizSolution {
    key: string;
    text: string;
    phonetic?: string;
    dictionary: any[]; // Using 'any' for simplicity based on the mock data structure
}

export interface QuizItem {
    id: number;
    vocabulary: number;
    wordID: number;
    key: string;
    sols: [QuizSolution, QuizSolution]; // A tuple with exactly two solutions
    audio_updated_at: number;
}

export interface Question {
    id: number;
    isAudioQuestion: boolean;
    promptText: string;
    phonetic?: string;
    audioKey: string;
    correctAnswer: string;
    options: string[];
}

// Helper function to shuffle an array
export const shuffleArray = <T extends any[]>(array: T): T => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Helper function to create a new quiz question object with randomized options
export const createQuestion = (item: QuizItem, allArabicWords: string[]): Question => {
    // Determine question type randomly: 0 for Audio-to-Text, 1 for Text-to-Text
    const questionType = Math.floor(Math.random() * 2);

    const arabicWord = item.sols[0].text;
    const urduWord = item.sols[1].text;
    const phonetic = item.sols[1].phonetic;
    const audioKey = item.sols[0].key;
    const isAudioQuestion = questionType === 0;

    // Filter out the correct answer from the list of all Arabic words
    const wrongAnswers = allArabicWords.filter(word => word !== arabicWord);
    // Shuffle the wrong answers and take the first 3
    const shuffledWrongAnswers = shuffleArray([...wrongAnswers]).slice(0, 3);
    
    // Combine correct and wrong answers, then shuffle them for the options
    const options = shuffleArray([...shuffledWrongAnswers, arabicWord]);

    return {
        id: item.id,
        isAudioQuestion,
        promptText: isAudioQuestion ? urduWord : urduWord,
        phonetic,
        audioKey,
        correctAnswer: arabicWord,
        options
    };
};

export const getCourseAudio = (audioKey: string):string => {
    // In a real application, this would fetch an audio file from a server.
     return `${process.env.NEXT_PUBLIC_AUDIO_BASE_URL}/media/mondly/audios/${audioKey}.mp3`;
    
};