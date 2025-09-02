"use client";
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { BookOpen, Star, Trophy, GraduationCap, BookCheck } from "lucide-react";
import Link from "next/link";
import { CategoryItem } from "@/app/mondly/_types/data-services";

export function CategoriesCards({
  categories,
}: {
  categories: CategoryItem[];
}) {
  return (
    <div className="container mx-auto px-1 naskh-text " dir="rtl">
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category: CategoryItem) => (
          <Link
            href={`/mondly/categories/${category.id}`}
            className="hover:cursor-pointer transition-all hover:scale-105"
            dir="rtl"
            key={category.id}
          >
            <div className="flex flex-col">
              <Card className="bg-gradient-to-br from-blue-100 to-blue-600">
                <CardContent className="flex flex-col gap-4 ">
                  <CardHeader className="space-y-1 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen
                          className={`h-5 w-5 ${
                            category.disabled
                              ? "text-gray-400"
                              : "text-blue-500"
                          }`}
                        />
                        <h3
                          className={`font-bold   sm:text-base md:text-xl lg:text-2xl   ${
                            category.disabled ? "text-gray-400" : ""
                          }`}
                        >
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </CardHeader>

                  {/* stars */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < (category.stars || 1)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between  text-sm">
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-orange-500" />
                        {/* 
                            <span>{category.countQuiz} Quizzes</span> */}
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-purple-500" />
                        {/* 
                            <span>{category.countWords} Words</span> */}
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookCheck className="h-4 w-4 text-green-500" />
                        {/* 
                            <span>{category.countPhrases} Phrases</span> */}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          {/* {Math.round(category.progress.get())}% */}
                        </span>
                      </div>
                      {/* 
                          <Progress value={category.progress.get()} className="h-2" />
                          */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
