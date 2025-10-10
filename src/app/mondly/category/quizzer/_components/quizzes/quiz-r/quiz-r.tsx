"use client";
import { QuizRItem, type Feedback } from "../../definitions";
import { convertR } from "../../converters";
import { useHookstate, State } from "@hookstate/core";
import { useTune } from "@/hooks/use-tone";
import { Button } from "@/components/ui/button";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { JsonViewerComponent } from "@/components/json-viewer";
import { getAudioUrl, shuffleArray } from "../../helpers-types";
import { useQuizR } from "./use-r";
interface QuizRProps {
  quizData: QuizRItem;
  quizzerFeedbackState: State<Feedback>;
  scoreState: State<{ userName: string; score: number }>;
}

export default function QuizR({
  quizData,
  quizzerFeedbackState,
  scoreState,
}: QuizRProps) {
  const { handlers, interactive, staticData } = useQuizR({ quizData });

  const renderHeader = () => {
    console.log("renderHeader ....")
    return (
      <div className="flex  flex-row gap-3 text-right urdu-text" dir="rtl">
        <CardTitle>{staticData.text}</CardTitle>
        <TonePlayerButton url={staticData.audioFile} />
      </div>
    );
  };

  const renderTokensArea = () => {
    return (
      <div className="px-4 py-6">
        <CardContent
          className="min-h-[120px]  flex flex-wrap gap-2 items-start justify-end"
          dir="rtl"
        >
          {interactive.selectedTokens.length === 0 ? (
            <p className="text-white/60 text-center w-full">
              اختر الكلمات بالترتيب الصحيح
            </p>
          ) : (
            interactive.selectedTokens.map((key, index) => (
              <button
                key={`${key}-${index}`}
                onClick={() => handlers.handleRemoveToken(index)}
                
                className="  px-4 py-2 rounded-lg font-semibold text-lg"
              >
                {handlers.getTokenText(key.get())}
              </button>
            ))
          )}
        </CardContent>
      </div>
    );
  };

  const renderAvailableTokens = () => {
    return (
      <div className="px-4 py-4 text-right naskh-text" dir="rtl" >
        <div className="flex flex-wrap gap-3 justify-center" dir="rtl">
          {interactive.availableTokens.map((token) => (
            <Button
              key={token.key}
              onClick={() => handlers.handleTokenClick(token.key)}
              
              className="  px-5 py-3 rounded-lg font-semibold text-lg border border-white/30  "
            >
              {token.text}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Card>{renderHeader()}</Card>
      <Card>{renderTokensArea()}</Card>
      <Card>{renderAvailableTokens()}</Card>
    </div>
  );
}
