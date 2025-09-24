# How to use

```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FakeSuspenseLoader, type LoadingStep } from "@/components/fake-suspense-loader"
import { useFakeLoading } from "@/hooks/use-fake-loading"

// Example loading steps
const dataFetchSteps: LoadingStep[] = [
  { id: "auth", message: "Authenticating user...", duration: 1500 },
  { id: "validate", message: "Validating permissions...", duration: 1000 },
  { id: "fetch", message: "Fetching data from server...", duration: 2000 },
  { id: "process", message: "Processing results...", duration: 1200 },
  { id: "cache", message: "Caching for better performance...", duration: 800 },
]

const uploadSteps: LoadingStep[] = [
  { id: "prepare", message: "Preparing files...", duration: 1000 },
  { id: "compress", message: "Compressing images...", duration: 2500 },
  { id: "upload", message: "Uploading to cloud storage...", duration: 3000 },
  { id: "verify", message: "Verifying upload integrity...", duration: 1500 },
]

export default function HomePage() {
  const [data, setData] = useState<string | null>(null)
  const [uploadResult, setUploadResult] = useState<string | null>(null)

  const dataLoading = useFakeLoading({
    steps: dataFetchSteps,
    onComplete: () => {
      setData("Data successfully loaded! Here is your fetched content.")
    },
  })

  const uploadLoading = useFakeLoading({
    steps: uploadSteps,
    onComplete: () => {
      setUploadResult("Files uploaded successfully! All images have been processed.")
    },
  })

  const handleDataFetch = () => {
    setData(null)
    dataLoading.startLoading()
  }

  const handleFileUpload = () => {
    setUploadResult(null)
    uploadLoading.startLoading()
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Fake Suspense Loader Demo</h1>
          <p className="text-lg text-muted-foreground">
            Realistic loading experiences with progress tracking and step feedback
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Data Fetching Demo */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Data Fetching Simulation</h2>
            <p className="text-muted-foreground">
              Simulate a complex data fetching process with authentication, validation, and caching steps.
            </p>

            <Button onClick={handleDataFetch} disabled={dataLoading.isLoading} className="w-full">
              {dataLoading.isLoading ? "Loading..." : "Fetch Data"}
            </Button>

            {data && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <p className="text-green-800 dark:text-green-200 text-sm">{data}</p>
              </div>
            )}
          </Card>

          {/* File Upload Demo */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">File Upload Simulation</h2>
            <p className="text-muted-foreground">
              Simulate file upload with compression, cloud storage, and verification steps.
            </p>

            <Button
              onClick={handleFileUpload}
              disabled={uploadLoading.isLoading}
              className="w-full bg-transparent"
              variant="outline"
            >
              {uploadLoading.isLoading ? "Uploading..." : "Upload Files"}
            </Button>

            {uploadResult && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                <p className="text-blue-800 dark:text-blue-200 text-sm">{uploadResult}</p>
              </div>
            )}
          </Card>
        </div>

        {/* Usage Instructions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">How to Use</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>1. Define your steps:</strong> Create an array of LoadingStep objects with id, message, and
              duration.
            </p>
            <p>
              <strong>2. Use the hook:</strong> Call useFakeLoading with your steps and onComplete callback.
            </p>
            <p>
              <strong>3. Add the component:</strong> Include FakeSuspenseLoader in your JSX with the loading state.
            </p>
            <p>
              <strong>4. Customize:</strong> Use className and backdropClassName props to match your design.
            </p>
          </div>
        </Card>
      </div>

      {/* Loading overlays */}
      <FakeSuspenseLoader
        isLoading={dataLoading.isLoading}
        steps={dataFetchSteps}
        onComplete={dataLoading.handleComplete}
      />

      <FakeSuspenseLoader
        isLoading={uploadLoading.isLoading}
        steps={uploadSteps}
        onComplete={uploadLoading.handleComplete}
        className="border-blue-200 dark:border-blue-800"
        backdropClassName="bg-blue-500/5"
      />
    </div>
  )
}
```
