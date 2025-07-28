"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface PreliminaryTabProps {
  preliminaryContent: {
    aboutBeginningUrdu: {
      page: string;
    };
    howToUseThisBookForTeachers: {
      page: string;
    };
    howToUseThisBookForStudents: {
      page: string;
    };
    acknowledgments: {
      page: string;
    };
    aboutTheUrduLanguage: {
      page: string;
    };
    theSoundSystemAndScriptOfUrdu: {
      page: string;
    };
  };
}

export default function PreliminaryTab({
  preliminaryContent,
}: PreliminaryTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center border-b border-gray-200 p-2">
          Preliminary Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-1">
            <p className="font-bold w-3/4">About Beginning Urdu</p>
            <p className="">
              Page: {preliminaryContent.aboutBeginningUrdu.page}
            </p>
          </div>
          <div className="flex flex-row gap-1">
            <p className="font-bold w-3/4">How to Use This Book for Teachers</p>
            <p className="">
              Page: {preliminaryContent.howToUseThisBookForTeachers.page}
            </p>
          </div>
          <div className="flex flex-row gap-1">
            <p className="font-bold w-3/4">How to Use This Book for Students</p>
            <p className="">
              Page: {preliminaryContent.howToUseThisBookForStudents.page}
            </p>
          </div>
          <div className="flex flex-row gap-1">
            <p className="font-bold w-3/4">Acknowledgments</p>
            <p className="">Page: {preliminaryContent.acknowledgments.page}</p>
          </div>
          <div className="flex flex-row gap-1">
            <p className="font-bold w-3/4">About the Urdu Language</p>
            <p className="">
              Page: {preliminaryContent.aboutTheUrduLanguage.page}
            </p>
          </div>
          <div className="flex flex-row gap-1">
            <p className="font-bold w-3/4">
              The Sound System and Script of Urdu
            </p>
            <p className="">
              Page: {preliminaryContent.theSoundSystemAndScriptOfUrdu.page}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
