"use client";

import Image from "next/image";
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, FileAudio, Clock } from "lucide-react";
interface CoverDataProps {
  title: string;
  language: string;
  coverImage: string;
  totalPages: number;
  structure: {
    preliminaryPages: number;
    soundSystemLessons: number;
    scriptLessons: number;
    totalUnits: number;
    totalChapters: number;
    totalAppendices: number;
    totalMediaFiles: number;
  };
}

export default function BookCover({
  title,
  language,
  coverImage,
  totalPages,
  structure,
}: CoverDataProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
        <div className="flex flex-col lg:flex-row">
            {/* Book Cover Section */}
            <div className="lg:w-1/3 p-6 flex justify-center items-start">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <Image
                    src={coverImage}
                    alt="Beginning Urdu Language Learning Book Cover"
                    style={{ width: "auto", height: "auto" }}
                    width={280}
                    height={360}
                    className="rounded-lg shadow-xl object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          {/* Book Information Section */}
          <div className="lg:w-2/3 p-6">
            <CardHeader className="px-0 pt-0">
              <div className="space-y-4">
                <div>
                  <Badge
                    variant="secondary"
                    className="mb-3 bg-red-100 text-red-800 hover:bg-red-200"
                  >
                    Language Learning
                  </Badge>
                  <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                    {title}
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    by Joshua H. Pien & Fauzia Farooqui
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-blue-200 text-blue-700"
                  >
                    {language}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-green-200 text-green-700"
                  >
                    Complete Course
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-0">
              <div className="space-y-6">
                {/* Key Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-900">
                      {totalPages}
                    </div>
                    <div className="text-sm text-blue-700">Pages</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-900">
                      {structure.totalChapters}
                    </div>
                    <div className="text-sm text-green-700">Chapters</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <FileAudio className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-900">
                      {structure.totalMediaFiles}
                    </div>
                    <div className="text-sm text-purple-700">Audio Files</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-900">
                      {totalPages}
                    </div>
                    <div className="text-sm text-orange-700">Pages</div>
                  </div>
                </div>

                {/* Course Structure */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Course Structure
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">
                          Sound System Lessons
                        </span>
                        <Badge variant="secondary">
                          {structure.soundSystemLessons}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">
                          Script Lessons
                        </span>
                        <Badge variant="secondary">
                          {structure.scriptLessons}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">
                          Learning Units
                        </span>
                        <Badge variant="secondary">
                          {structure.totalUnits}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">
                          Appendices
                        </span>
                        <Badge variant="secondary">
                          {structure.totalAppendices}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
