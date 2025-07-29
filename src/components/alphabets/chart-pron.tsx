"use client";
import Image from "next/image";
export function ChartPron() {
  return (
    <div className="w-full h-full">
      <Image
        src="/materials/urdu-pronunciation-chart.png"
        alt="Chart Pron"
        width={700}
        height={700}
        className="max-w-[700px]"
      />
    </div>
  );
}
