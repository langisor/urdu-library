// Define the shape of a Lesson object using a TypeScript interface.
export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
}

type LessonItem = {
  id: number;
  index: number;
  categoryID: number;
  name: string;
  countPhrases: number;
  countWords: number;
  countQuiz: number;
  quizzes: number[];
};

type QuizFItem = {
  id: number;
  alts: Array<{
    key: string;
    text: string;
    image: string;
    phonetic: string;
    audio_updated_at: number;
    image_updated_at: number;
  }>;
  sols: Array<{
    key: string;
    text: string;
    audio_updated_at: number;
  }>;
  type: string;
  lesson: number;
  wordID: number;
  modifiers: number;
  alternates: Array<number>;
};
type QuizQItem = {
  id: number;
  alts: Array<{
    key: string;
    text: string;
    audio_updated_at: number;
  }>;
  sols: Array<{
    key: string;
    text: string;
    phonetic: string;
    dictionary?: Array<{
      raw: string;
      translations: Array<{
        text?: string;
        type: string;
        phonetic: any;
        id?: number;
        conj?: {
          fu: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
          pa: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
          pr: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
        };
        name?: {
          m: string;
          t: string;
          phonetic: string;
        };
        tenseNames?: {
          fu: string;
          pa: string;
          pr: string;
        };
      }>;
    }>;
    phraseType?: number;
    text_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    phonetic_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    audio_updated_at?: number;
  }>;
  type: string;
  lesson: number;
  wordID: number;
  modifiers: number;
  alternates: Array<number>;
};
type QuizQbItem = {
  id: number;
  alts: Array<{
    key: string;
    text: string;
    phonetic: string;
    audio_updated_at: number;
  }>;
  sols: Array<{
    key: string;
    text: string;
    dictionary?: Array<{
      raw: string;
      translations: Array<{
        text: string;
        type: string;
        phonetic: string;
      }>;
    }>;
    phraseType?: number;
    text_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    audio_updated_at?: number;
  }>;
  type: string;
  lesson: number;
  wordID: number;
  modifiers: number;
  alternates: Array<number>;
};
type QuizPItem = {
  id: number;
  alts: Array<{
    key: string;
    text: string;
    image: string;
    phonetic: string;
    audio_updated_at: number;
    image_updated_at: number;
  }>;
  sols: Array<{
    key: string;
    text: string;
    audio_updated_at?: number;
  }>;
  type: string;
  lesson: number;
  wordID: number;
  modifiers: number;
  alternates: Array<number>;
};

type QuizT1Item = {
  id: number;
  ord: Array<string>;
  sols: Array<{
    key: string;
    text: string;
    phonetic?: string;
    dictionary?: Array<{
      raw: string;
      translations: Array<{
        text?: string;
        type: string;
        phonetic: any;
        id?: number;
        conj?: {
          fu: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
          pa: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
          pr: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
        };
        name?: {
          m: string;
          t: string;
          phonetic: string;
        };
        tenseNames?: {
          fu: string;
          pa: string;
          pr: string;
        };
      }>;
    }>;
    phraseType?: number;
    text_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    phonetic_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    audio_updated_at: number;
  }>;
  alts?: Array<any>;
  type: string;
  lesson: number;
  tokens: Array<{
    key: string;
    raw: {
      text: string;
      length: number;
      location: number;
    };
    text: string;
    linker: {
      text: string;
      length: number;
      location: number;
    };
    prefix: {
      text: string;
      length: number;
      location: number;
    };
    suffix: {
      text: string;
      length: number;
      location: number;
    };
  }>;
  wordID: number;
  modifiers: number;
  alternates: Array<any>;
  tokensEqualSize: boolean;
};
type QuizT1bItem = {
  id: number;
  ord: Array<string>;
  sols: Array<{
    key: string;
    text: string;
    dictionary?: Array<{
      raw: string;
      translations: Array<any>;
    }>;
    phraseType?: number;
    text_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    audio_updated_at: number;
    phonetic?: string;
  }>;
  type: string;
  lesson: number;
  tokens: Array<{
    key: string;
    raw: {
      text: string;
      length: number;
      location: number;
    };
    text: string;
    linker: {
      text: string;
      length: number;
      location: number;
    };
    prefix: {
      text: string;
      length: number;
      location: number;
    };
    suffix: {
      text: string;
      length: number;
      location: number;
    };
  }>;
  wordID: number;
  modifiers: number;
  alternates: Array<any>;
  tokensPhonetic: Array<{
    key: string;
    raw: {
      text: string;
      length: number;
      location: number;
    };
    text: string;
    linker: {
      text: string;
      length: number;
      location: number;
    };
    prefix: {
      text: string;
      length: number;
      location: number;
    };
    suffix: {
      text: string;
      length: number;
      location: number;
    };
  }>;
  tokensEqualSize: boolean;
};
type QuizT2Item = {
  id: number;
  sols: Array<{
    key: string;
    text: string;
    phonetic?: string;
    dictionary?: Array<{
      raw: string;
      translations: Array<{
        text?: string;
        type: string;
        phonetic: any;
        id?: number;
        conj?: {
          fu: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
          pa: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
          pr: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
        };
        name?: {
          m: string;
          t: string;
          phonetic: string;
        };
        tenseNames?: {
          fu: string;
          pa: string;
          pr: string;
        };
      }>;
    }>;
    phraseType?: number;
    text_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    phonetic_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    audio_updated_at: number;
  }>;
  type: string;
  lesson: number;
  wordID: number;
  modifiers: number;
  alternates: Array<any>;
};

type QuizC1bItem = {
  id: number;
  ord: Array<string>;
  sols: Array<{
    key: string;
    text: string;
    dictionary?: Array<{
      raw: string;
      translations: Array<any>;
    }>;
    phraseType?: number;
    text_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    audio_updated_at: number;
    phonetic?: string;
  }>;
  type: string;
  lesson: number;
  tokens: Array<{
    key: string;
    raw: {
      text: string;
      length: number;
      location: number;
    };
    text: string;
    linker: {
      text: string;
      length: number;
      location: number;
    };
    prefix: {
      text: string;
      length: number;
      location: number;
    };
    suffix: {
      text: string;
      length: number;
      location: number;
    };
  }>;
  wordID: number;
  modifiers: number;
  alternates: Array<number>;
  completeToken: string;
  tokensPhonetic: Array<{
    key: string;
    raw: {
      text: string;
      length: number;
      location: number;
    };
    text: string;
    linker: {
      text: string;
      length: number;
      location: number;
    };
    prefix: {
      text: string;
      length: number;
      location: number;
    };
    suffix: {
      text: string;
      length: number;
      location: number;
    };
  }>;
  tokensEqualSize: boolean;
};
type SimplifiedC1bItem = {
  id: number;
  ord: Array<string>; // Keys defining the correct order of the target sentence (includes blank keys)
  sols: Array<{
    key: string;
    text: string; // Contains the source sentence text and usually the actual solution words
    // ... many other fields omitted
  }>;
  tokens: Array<{
    key: string;
    text: string; // Contains the static words of the target sentence and all word bank items
    // ... many other fields omitted
  }>;
  completeToken: string; // Sometimes holds the full, correct target sentence
};

type QuizDItem = {
  id: number;
  alts: Array<{
    key: string;
    text: string;
    image: string;
    phonetic: string;
    audio_updated_at: number;
    image_updated_at: number;
  }>;
  sols: Array<{
    key: string;
    text: string;
    audio_updated_at: number;
  }>;
  type: string;
  lesson: number;
  wordID: number;
  modifiers: number;
  alternates: Array<number>;
};

type QuizRItem = {
  id: number;
  ord: Array<string>;
  sols: Array<{
    key: string;
    text: string;
    phonetic?: string;
    dictionary?: Array<{
      raw: string;
      translations: Array<{
        text: string;
        type: string;
        phonetic: any;
      }>;
    }>;
    phraseType?: number;
    text_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    phonetic_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    audio_updated_at: number;
  }>;
  type: string;
  lesson: number;
  tokens: Array<{
    key: string;
    raw: {
      text: string;
      length: number;
      location: number;
    };
    text: string;
    linker: {
      text: string;
      length: number;
      location: number;
    };
    prefix: {
      text: string;
      length: number;
      location: number;
    };
    suffix: {
      text: string;
      length: number;
      location: number;
    };
  }>;
  wordID: number;
  modifiers: number;
  alternates: Array<any>;
  quizSkipData: {
    ord: Array<string>;
    sols: Array<{
      key: string;
      text: string;
      phonetic?: string;
      dictionary?: Array<{
        raw: string;
        translations: Array<{
          text: string;
          type: string;
          phonetic: any;
        }>;
      }>;
      phraseType?: number;
      text_tokens?: Array<{
        raw: {
          text: string;
          length: number;
          location: number;
        };
        linker: {
          text: string;
          length: number;
          location: number;
        };
        prefix: {
          text: string;
          length: number;
          location: number;
        };
        suffix: {
          text: string;
          length: number;
          location: number;
        };
      }>;
      phonetic_tokens?: Array<{
        raw: {
          text: string;
          length: number;
          location: number;
        };
        linker: {
          text: string;
          length: number;
          location: number;
        };
        prefix: {
          text: string;
          length: number;
          location: number;
        };
        suffix: {
          text: string;
          length: number;
          location: number;
        };
      }>;
      audio_updated_at: number;
    }>;
    type: string;
    tokens: Array<{
      key: string;
      raw: {
        text: string;
        length: number;
        location: number;
      };
      text: string;
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    modifiers: number;
    tokensEqualSize: boolean;
  };
  tokensEqualSize: boolean;
};
type QuizW1bItem = {
  id: number;
  ord: Array<string>;
  sols: Array<{
    key: string;
    text: string;
    dictionary?: Array<{
      raw: string;
      translations: Array<{
        text?: string;
        type: string;
        phonetic?: string;
        id?: number;
        conj?: {
          fu: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
          pa: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
          pr: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
        };
        name?: {
          m: string;
          t: string;
          phonetic: string;
        };
        tenseNames?: {
          fu: string;
          pa: string;
          pr: string;
        };
      }>;
    }>;
    phraseType?: number;
    text_tokens: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    audio_updated_at: number;
    image?: string;
    phonetic?: string;
    phonetic_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    image_updated_at?: number;
  }>;
  type: string;
  lesson: number;
  tokens: Array<{
    key: string;
    text: string;
    group: number;
  }>;
  wordID: number;
  modifiers: number;
  alternates: Array<any>;
  ordPhonetic: Array<string>;
  tokensPhonetic: Array<{
    key: string;
    text: string;
    group: number;
  }>;
  tokensEqualSize: boolean;
};

interface Feedback {
  isAnswered: boolean;
  isCorrect: boolean | null;
  message: string;
}
export type {
  QuizC1bItem,
  SimplifiedC1bItem,
  QuizDItem,
  QuizFItem,
  QuizQItem,
  QuizQbItem,
  QuizRItem,
  QuizPItem,
  QuizT1Item,
  QuizT1bItem,
  QuizT2Item,
  QuizW1bItem,
  Feedback,
};
