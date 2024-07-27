import type { Metadata } from "next";
import React from "react";
import { AppLayout } from "@/shared/components/app-layout/AppLayout";
import { DogListItem } from "@/app/dogs/DogListItem";

export const metadata: Metadata = {
  title: "Private Universe Tech - Dogs",
  description: "List of dogs",
};

export default function DogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppLayout>
      <DogListItem></DogListItem>
    </AppLayout>
  );
}
