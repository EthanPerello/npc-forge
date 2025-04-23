import type { Metadata } from "next";
import DocsNavigation from "@/components/docs-navigation";

export const metadata: Metadata = {
  title: "Documentation | NPC Forge",
  description: "User guides, examples, and developer documentation for NPC Forge.",
};

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-4 lg:p-8">
      <DocsNavigation />
      <div className="prose max-w-4xl mx-auto dark:prose-invert">
        {children}
      </div>
    </div>
  );
}