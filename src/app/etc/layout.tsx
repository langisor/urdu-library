import EtcNavigation from "@/app/etc/_components/etc-navigation";

export default function EtcLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col">
      <EtcNavigation />
      {children}
    </div>
  );
}
