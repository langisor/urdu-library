"use client"
import toc from "@/data/toc.json"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {memo } from "react"
import { JsonViewerComponent } from "./json-viewer"

export const TocCard = memo(function TocCard() {
     return (
        <Card>
            <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
            </CardHeader>
            <CardContent>
                <JsonViewerComponent data={toc} />
            </CardContent>
        </Card>
     )
})