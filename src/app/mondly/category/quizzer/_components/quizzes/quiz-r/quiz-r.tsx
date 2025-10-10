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
    return (
      <Card className="flex  flex-row gap-3 text-right" dir="rtl">
        <CardTitle>{staticData.text}</CardTitle>
        <TonePlayerButton url={staticData.audioFile} />
      </Card>
    );
  };

  const renderTokensArea = () => {
    return (
      <div className="px-4 py-6">
        <div
          className="min-h-[120px] bg-white/10 backdrop-blur-sm rounded-lg border-2 border-white/30 p-4 flex flex-wrap gap-2 items-start justify-end"
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
                disabled={interactive.showResult.get()}
                className="bg-white text-[#4A7BA7] px-4 py-2 rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {handlers.getTokenText(key.get())}
              </button>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderAvailableTokens = () => {
    return (
      <div className="px-4 py-4">
        <div className="flex flex-wrap gap-3 justify-center" dir="rtl">
          {interactive.availableTokens.map((token) => (
            <Button
              key={token.key}
              onClick={() => handlers.handleTokenClick(token.key)}
              disabled={interactive.showResult.get()}
              className="bg-white/20 backdrop-blur-sm text-white px-5 py-3 rounded-lg font-semibold text-lg border border-white/30 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
      <div>{renderHeader()}</div>
      <div>{renderTokensArea()}</div>
      <div>{renderAvailableTokens()}</div>
    </div>
  );
}
