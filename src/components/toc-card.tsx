"use client"
import { findLessonByIndex,UnitsData,PartsData,ChaptersData } from "@/lib/helpers"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { JsonViewerComponent } from "./json-viewer"

export function TocCard() {
return (
        <Card>
            <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
            </CardHeader>
            <CardContent>
                <JsonViewerComponent data={PartsData} />
            </CardContent>
        </Card>
     )
}