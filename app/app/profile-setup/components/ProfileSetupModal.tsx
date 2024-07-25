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
  profile: Profile;
  onSubmit: (profile: Profile) => void;
};

enum ProfileSetupSteps {
  USERNAME = 0,
  JOB_TITLE = 1,
  END = 2,
}

export const ProfileSetupModal = (props: ProfileSetupModalProps) => {
  const { profile, onSubmit } = props;

  const [currentStep, setCurrentStep] = useState<number>(
    ProfileSetupSteps.USERNAME,
  );

  const form = useForm<Profile>({
    defaultValues: {
      username: profile.username || "",
      jobTitle: profile.jobTitle || "",
    },
  });

  const renderBody = () => {
    if (currentStep === ProfileSetupSteps.USERNAME) {
      return (
        <FormTextInput
          label={"Choose a username"}
          name={"username"}
          control={form.control}
        />
      );
    }

    if (currentStep === ProfileSetupSteps.JOB_TITLE) {
      return (
        <FormTextInput
          label={"What is your job title?"}
          name={"jobTitle"}
          control={form.control}
        />
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
          onClick={() => {
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
          onClick={() => {
            setCurrentStep(currentStep + 1);
          }}
        >
          Next
        </Button>
      );
    }

    return <Button type={"submit"}>Save Profile</Button>;
  };

  return (
    <Modal isOpen={true} onClose={() => {}} size="lg">
      <ModalOverlay />

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader title="Welcome">
            Lets get your profile setup.
          </ModalHeader>

          <ModalBody>{renderBody()}</ModalBody>

          <ModalFooter>
            <ButtonGroup>
              {renderBackButton()}
              {renderNextButton()}
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
