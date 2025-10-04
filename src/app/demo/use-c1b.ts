"use client";
import * as React from "react";
import { QuizC1bItem } from "../mondly/category/quizzer/_components/definitions";

type Word = {
  text: string;
  isCompleteToken: boolean;
};

function convertC1b(quizData: QuizC1bItem) {
  const sentence = new Map<string, Word>();
  const options = new Map<string, Word>();
  const completeToken = quizData.completeToken;
  // options
  quizData.tokens.forEach((token) => {
    options.set(token.key, {
      text: token.raw.text,
      isCompleteToken: token.key === completeToken,
    });
  });
  // remove blank word from options
  // get blank key
  const blankKey = options.entries().find((entry) => entry[1].text === "_____");

  // remove from options
  if (blankKey) {
    options.delete(blankKey[0]);
  }
  // sentences
  const sentenceTokens = quizData.ord.map((tokenKey) => {
    const result = options.get(tokenKey);

    if (result) {
      // replace isCompleteToken=true with blankWord

      if (result.isCompleteToken) {
        const newResult = {
          key: tokenKey,

          text: result.text,
          isCompleteToken: false,
        };
        sentence.set(tokenKey, newResult);
        options.delete(tokenKey);
      } else {
        sentence.set(tokenKey, result);
      }
    }
  });
  // filter opttions by removing sentence tokens
  options.forEach((value, key) => {
    if (sentence.has(key)) {
      options.delete(key);
    }
  });
  // add isCompleteToken=true to options
  options.set(completeToken, {
    text: quizData.tokens.find((token) => token.key === completeToken)!.raw.text,
    isCompleteToken: true,
  });
  //remove blank word from sentence 
  sentence.forEach((value, key) => {
    if(key===completeToken){
       
    }
  });
  return { sentence, options, completeToken };
}

export function useC1b(quizData: QuizC1bItem) {
  const [sentence, setSentence] = React.useState<Map<string, Word>>(new Map());
  const [options, setOptions] = React.useState<Map<string, Word>>(new Map());
  const [completeToken, setCompleteToken] = React.useState<string>("");
  React.useEffect(() => {
    const { sentence, options, completeToken } = convertC1b(quizData);
    setSentence(sentence);
    setOptions(options);
    setCompleteToken(completeToken);
  }, [quizData]);

  return { sentence, options, completeToken };
}
