import { DynamicBreadcrumb } from "@/app/mondly/_components/dynamic-breadcrumb";
export default function DialoguePage() {
  return (
    <div dir="rtl" className="flex flex-col gap-4">
      <DynamicBreadcrumb />
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
        Dialogue Page
      </h1>
    </div>
  );
}