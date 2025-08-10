import MondlyNavigation from "@/app/mondly/_components/mondly-navigation";

export default function MondlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <MondlyNavigation />
      {children}
    </div>
  );
}
