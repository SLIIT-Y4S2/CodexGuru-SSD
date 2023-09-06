import { ForumProvider } from "@/store/ForumProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ForumProvider>{children}</ForumProvider>;
}
