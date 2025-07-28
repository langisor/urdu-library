"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Chapter } from "@/data/course-book/ts-definition";
interface ChaptersTabProps {
  chapters: Chapter[];
}
interface MediaExercisesProps {
  number: number;
  audioFile: string;
}
interface MediaVocabularyProps {
  number: number;
  audioFile: string;
}
export default function ChaptersTab({ chapters }: ChaptersTabProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={chapters[0].chapterNumber.toString()}
    >
      {chapters.map((chapter) => (
        <div key={chapter.chapterNumber}>
        <AccordionItem value={chapter.chapterNumber.toString()}>
          <AccordionTrigger>
            <Card className="w-full cursor-pointer hover:bg-gray-100">
              <CardContent>
                <div className="flex flex-row justify-between gap-1">
                  <span className="font-bold">{chapter.chapterNumber}</span>
                  <span className="font-bold text-lg italic">
                    {chapter.title}
                  </span>
                  <span>Page: {chapter.page}</span>
                </div>
              </CardContent>
            </Card>
          </AccordionTrigger>
          <AccordionContent>
            <ChapterMedia chapter={chapter} />
          </AccordionContent>
        </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
}

function ChapterMedia({ chapter }: { chapter: Chapter }) {
  const hasExercises = chapter.media?.exercises ? true : false;
  const hasVocabulary = chapter.media?.vocabulary ? true : false;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chapter {chapter.chapterNumber}</CardTitle>
      </CardHeader>
      <CardContent>
        {hasExercises && (
          <ChapterExercises
            exercises={chapter.media?.exercises as MediaExercisesProps[]}
          />
        )}
        {hasVocabulary && (
          <ChapterVocabulary
            vocabulary={chapter.media?.vocabulary as MediaVocabularyProps[]}
          />
        )}
      </CardContent>
    </Card>
  );
}

function ChapterVocabulary({
  vocabulary,
}: {
  vocabulary: MediaVocabularyProps[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {vocabulary.map((vocabulary) => (
        <div key={vocabulary.number} className="flex flex-col gap-1">
          <p className="font-bold">{vocabulary.number}</p>
          <audio controls>
            <source
              src={`/media/audio-all/${vocabulary.audioFile}`}
              type="audio/mp3"
            />
          </audio>
        </div>
      ))}
    </div>
  );
}

function ChapterExercises({ exercises }: { exercises: MediaExercisesProps[] }) {
  return (
    <div className="flex flex-col gap-3">
      {exercises.map((exercise) => (
        <div key={exercise.number} className="flex flex-col gap-1">
          <p className="font-bold">{exercise.number}</p>
          <audio controls>
            <source
              src={`/media/audio-all/${exercise.audioFile}`}
              type="audio/mp3"
            />
          </audio>
        </div>
      ))}
    </div>
  );
}
