"use client";

import useSWR from "swr";
import { Flex, Heading, Spinner, Text, Wrap } from "@chakra-ui/react";
import { DogBreedListItem } from "@/app/dogs/components/DogBreedListItem";

export default function DogsPage() {
  const { data, isLoading, error } = useSWR<string[]>(
    "/api/dogs",
    (url: string) => fetch(url).then((r) => r.json()),
  );

  if (error) {
    return <Text>{`Sorry, we couldn't load the dog breeds. :(`}</Text>;
  }

  if (!data || isLoading) {
    return <Spinner />;
  }

  return (
    <Flex direction="column" gap={4}>
      <Heading>Dog breeds ({data.length})</Heading>

      <Wrap spacing={4}>
        {data.map((breed) => (
          <DogBreedListItem key={breed} breed={breed} />
        ))}
      </Wrap>
    </Flex>
  );
}
