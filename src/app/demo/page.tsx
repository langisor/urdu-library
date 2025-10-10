"use client"

import data from "./quiz-r.json"
import { JsonViewerComponent } from "@/components/general/json-viewer-component"
export default function Demo() {
    return (
        <JsonViewerComponent data={data} />
    )
}