"use client";

import useSWR from "swr";

import { Spinner } from "@chakra-ui/react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DataPage() {
  const { data, isLoading } = useSWR(
    "https://dog.ceo/api/breeds/list/all",
    fetcher,
  );

  if (!data || isLoading) {
    return <Spinner />;
  }

  return <>dog data</>;
}
