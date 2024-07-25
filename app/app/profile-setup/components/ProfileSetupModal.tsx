import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button, ButtonGroup, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormTextInput } from "@/components/form/FormTextInput";
import { useState } from "react";

export type Profile = {
  username?: string;
  jobTitle?: string;
};

type ProfileSetupModalProps = {
  onSubmit: (profile: Profile) => void;
};

enum ProfileSetupSteps {
  USERNAME = 0,
  JOB_TITLE = 1,
  END = 2,
}

export const ProfileSetupModal = (props: ProfileSetupModalProps) => {
  const { onSubmit } = props;

  const [currentStep, setCurrentStep] = useState<number>(
    ProfileSetupSteps.USERNAME,
  );

  const form = useForm<Profile>({
    values: {
      username: "",
      jobTitle: "",
    },
  });

  const renderBody = () => {
    if (currentStep < ProfileSetupSteps.END) {
      return (
        <>
          <FormTextInput
            hidden={currentStep !== ProfileSetupSteps.USERNAME}
            label={"Choose a username"}
            name={"username"}
            control={form.control}
          />

          <FormTextInput
            hidden={currentStep !== ProfileSetupSteps.JOB_TITLE}
            label={"What is your job title?"}
            name={"jobTitle"}
            control={form.control}
          />
        </>
      );
    }

    return (
      <Stack>
        <Text fontSize={16}>Profile Overview</Text>
        <Text fontSize={14}>Username : {form.getValues("username")}</Text>
        <Text fontSize={14}>JobTitle : {form.getValues("jobTitle")}</Text>
      </Stack>
    );
  };

  const renderBackButton = () => {
    if (currentStep > ProfileSetupSteps.USERNAME) {
      return (
        <Button
          type={"button"}
          onClick={(e) => {
            e.preventDefault();
            setCurrentStep(currentStep - 1);
          }}
        >
          Back
        </Button>
      );
    }

    return null;
  };

  const renderNextButton = () => {
    if (currentStep < ProfileSetupSteps.END) {
      return (
        <Button
          type={"button"}
          onClick={(e) => {
            e.preventDefault();
            setCurrentStep(currentStep + 1);
          }}
        >
          Next
        </Button>
      );
    }

    return (
      <Button type={"submit"} isLoading={form.formState.isSubmitting}>
        Save Profile
      </Button>
    );
  };

  return (
    <Modal isOpen={true} onClose={() => {}} size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader title="Welcome">Lets get your profile setup.</ModalHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ModalBody>{renderBody()}</ModalBody>

          <ModalFooter>
            <ButtonGroup>
              {renderBackButton()}
              {renderNextButton()}
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
