"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FakeSuspenseLoader,
  type LoadingStep,
} from "@/components/general/fake-suspense-loader/fake-suspense-loader";
import { useFakeLoading } from "@/components/general/fake-suspense-loader/use-fake-loading";

const dataFetchSteps: LoadingStep[] = [
  { id: "auth", message: "التحقق من الإعدادت ...", duration: 1500 },
  { id: "prepare", message: "تجهيز واجهة المستخدم ...", duration: 1000 },
  { id: "fetch", message: "جلب البيانات ...", duration: 2000 },
  { id: "process", message: "المعالجة ...", duration: 1200 },
  { id: "cache", message: "تخزين البيانات ...", duration: 800 },
];

export default function FakeLoader() {
  const [data, setData] = React.useState<string | null>(null);
  const [uploadResult, setUploadResult] = React.useState<string | null>(null);

  const dataLoading = useFakeLoading({
    steps: dataFetchSteps,
    onComplete: () => {
      setData("Data successfully loaded! Here is your fetched content.");
    },
  });

  const handleDataFetch = () => {
    setData(null);
    dataLoading.startLoading();
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold text-foreground">
        Data Fetching Simulation
      </h2>
      <p className="text-muted-foreground">
        لبداء التدريب وجلب البيانات اضغط على زر التحميل
      </p>

      <Button
        onClick={handleDataFetch}
        disabled={dataLoading.isLoading}
        className="w-full"
      >
        {dataLoading.isLoading ? "جاري التحميل..." : "تحميل البيانات"}
      </Button>

      {data && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <p className="text-green-800 dark:text-green-200 text-sm">{data}</p>
        </div>
      )}
    </Card>
  );
}
