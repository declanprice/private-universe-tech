import {
  Card,
  CardBody,
  Text,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { COLOR } from "@/theme";
import { DogBreedImageModal } from "@/app/dogs/components/DogBreedImageModal";

type DogListItemProps = {
  breed: string;
};

export const DogBreedListItem = (props: DogListItemProps) => {
  const { breed } = props;

  const modal = useDisclosure();

  return (
    <WrapItem>
      <Card
        onClick={() => modal.onOpen()}
        _hover={{
          cursor: "pointer",
          background: COLOR.hover,
        }}
      >
        <CardBody>
          <Text>
            <Text>{breed}</Text>
          </Text>
        </CardBody>
      </Card>

      <DogBreedImageModal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        breed={breed}
      />
    </WrapItem>
  );
};
