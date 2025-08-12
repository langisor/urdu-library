import DynamicBreadcrumb from "./_components/dynamic-breadcrumb";

export default function MondlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DynamicBreadcrumb />
      {children}
    </>
  );
}
