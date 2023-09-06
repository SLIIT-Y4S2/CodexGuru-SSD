import LabsHorizontalView from "@/components/LabsHorizontalView";

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-xl p-3 flex flex-col gap-4 h-screen">
      <p className="text-4xl">Student Landing Page</p>
      <LabsHorizontalView />
    </div>
  );
}
