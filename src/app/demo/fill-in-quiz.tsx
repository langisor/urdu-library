"use client";

import { QuizC1bItem } from "@/app/mondly/category/quizzer/_components/definitions";
import { useHookstate } from "@hookstate/core";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import quizData from "./c1b.json";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";

const quiz: QuizC1bItem = quizData;

type Token = {
  index: number;
  text: string;
  isCorrect: boolean;
};
type Word = Record<string, Token>;
type Sentence = Word[];
type Options = Word[];

const convertC1b = (quiz: QuizC1bItem) => {
  const sentence: Sentence = [];
  const options: Options = [];
  // from ord array build sentence and options
  quiz.ord.forEach((key, index) => {
    const token = quiz.tokens.find((token) => token.key === key);
    if (token) {
      sentence.push({
        [token.key]: {
          index,
          text: token.text,
          isCorrect: quiz.completeToken === token.key,
        },
      });
    }
  });
  // build options/words_list from tokens
  quiz.tokens.forEach((token, index) => {
    options.push({
      [token.key]: {
        index,

        text: token.text,
        isCorrect: quiz.completeToken === token.key,
      },
    });
  });

  const sourceText = quiz.sols[0].text;
  const targetText = quiz.sols[1].text;

  return { sentence, options, sourceText, targetText };
};

export default function FillInQuiz() {
  const fillInQuizState = useHookstate(convertC1b(quiz));

  const selectedOption = useHookstate<string | null>(null);
  const correctOption = useHookstate<string | null>(null);

  const sentence_words = [...fillInQuizState.sentence];
  console.log("reslut: ", sentence_words);

  const renderSentence = () => {
    return (
      <Card>
        <CardContent>
          {fillInQuizState.sentence.map((word) => {
            if (!Object.values(word)[0].isCorrect.get()) {
              return (
                <Button
                  key={Object.values(word)[0].index.get()}
                  variant="outline"
                  className="mr-2 border border-gray-300 p-2 rounded-md"
                  disabled={true}
                >
                  {Object.values(word)[0].text.get()}
                </Button>
              );
            }
            return (
              <Button
                key={Object.values(word)[0].index.get()}
                variant="outline"
                className="mr-2 border border-gray-300 p-2 rounded-md"
              >
                {Object.values(word)[0].text.get()}{" "}
              </Button>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  // states

  // renders
  const renderOptions = () => {
    return (
      <Card>
        <CardContent>
          {fillInQuizState.options.map((word) => {
            return (
              <Button
                key={Object.values(word)[0].index.get()}
                variant="outline"
                className="mr-2 border border-gray-300 p-2 rounded-md"
                onClick={() => {
                  replaceWord(Object.values(word)[0].text.get());
                }}
              >
                {Object.values(word)[0].text.get()}
              </Button>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-2 text-right naskh-arabic" dir="rtl">
      <div> {renderSentence()}</div>
      <div> {renderOptions()}</div>
      <JsonViewerComponent data={fillInQuizState.get()} />
    </div>
  );
}
