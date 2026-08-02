import type { Metadata } from "next";
import { MainLayout } from "@/components/layouts/main-layout";
import { config } from "@/lib/config";

export const metadata: Metadata = {
    description:
        "A personal portfolio featuring software projects, technical experiments, and engineering write-ups.",
};

type AppLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export default function AppLayout({ children }: AppLayoutProps) {
    return <MainLayout config={config}>{children}</MainLayout>;
}
