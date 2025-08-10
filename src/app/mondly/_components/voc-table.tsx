"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataValueShape, mapVItemsToAudioData } from "../_lib/helpers";
import { AudioLinesIcon } from "lucide-react";
const TableWithData = ({
  _data,
}: {
  _data: [key: string, value: DataValueShape][];
}) => {
  const [data, setData] = React.useState<
    [key: string, value: DataValueShape][]
  >([]);

  React.useEffect(() => {
    setData(_data);
  }, [_data]);
  const handleAudioPlay = (audio: string) => {
    const audioElement = new Audio(audio);
    audioElement.play();
  };
  return (
    <Card
      className="w-full  shadow-lg rounded-xl h-[calc(100vh-200px)] overflow-y-auto"
      dir="rtl"
    >
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]  w-full rounded-md border overflow-y-auto">
          <Table className="min-w-full" dir="rtl">
            <TableHeader className="sticky top-0 bg-white shadow-sm z-10 ">
              <TableRow>
                <TableHead className="w-1/6 font-semibold text-right">
                  عربي
                </TableHead>
                <TableHead className="w-1/6 font-semibold text-right">
                  اوردو
                </TableHead>
                <TableHead className="w-1/6 font-semibold text-right">
                  النطق
                </TableHead>
                <TableHead className="w-2/6 font-semibold text-right">
                  <AudioLinesIcon className="w-6 h-6" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(([key, value], index) => (
                <TableRow
                  key={index}
                  className={`
                     hover:bg-slate-100 transition-colors duration-200
                     ${
                       value.wordType === "verb"
                         ? "bg-yellow-100 font-bold"
                         : ""
                     }
                   `}
                >
                  <TableCell className="p-4 text-right lang-arabic">
                    {value.motherText}
                  </TableCell>
                  <TableCell className="p-4 text-right lang-urdu text-xl">
                    {value.targetText}
                  </TableCell>
                  <TableCell className="p-4 text-right phonetic">
                    {value.phonetic}
                  </TableCell>
                  <TableCell className="p-4 text-right">
                    <Button onClick={() => handleAudioPlay(key)}>Play</Button>
                    <audio playsInline className="w-full">
                      <source src={key} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default function VocTable({
  _data,
}: {
  _data: [key: string, value: DataValueShape][];
}) {
  return (
    <div className="p-2" dir="rtl">
      <h1 className="text-3xl font-bold text-center   text-gray-800">
        جدول المفردات
      </h1>
      <p className="text-center text-gray-600 mb-8">
        هذا الجدول يعرض بيانات المفردات مع النص العربي والأوردو وكذلك النطق
        الصوتي والسطور الخاصة بالفعل مظللة لسهولة التعرف عليها.
      </p>
      <TableWithData _data={_data} />
    </div>
  );
}
