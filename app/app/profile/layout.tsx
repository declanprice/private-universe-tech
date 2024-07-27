import type { Metadata } from "next";
import React from "react";
import { AppLayout } from "@/shared/components/app-layout/AppLayout";

export const metadata: Metadata = {
  title: "Private Universe Tech - Profile",
  description: "Profile",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
