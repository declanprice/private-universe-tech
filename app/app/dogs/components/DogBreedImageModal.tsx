import { Spinner, Image, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import useSWR from "swr";

type DogBreedImageModalProps = {
  isOpen: boolean;
  onClose: () => any;
  breed: string;
};

export const DogBreedImageModal = (props: DogBreedImageModalProps) => {
  const { isOpen, onClose, breed } = props;

  if (!isOpen) return null;

  const { data, isLoading, error } = useSWR<string>(
    `/api/dogs/${breed}`,
    (url: string) => fetch(url).then((r) => r.json()),
  );

  const renderImage = () => {
    if (error) return <Text>Sorry, we couldn't load the image :( </Text>;

    if (!data || isLoading) return <Spinner />;

    return <Image src={data} />;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>You're looking at a very cute image of a/an {breed}</Text>
        </ModalHeader>

        <ModalBody>{renderImage()}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
