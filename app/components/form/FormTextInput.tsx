import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  FormControlProps,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { Control, useController } from "react-hook-form";

export type FormTextInputProps = {
  name: string;
  placeholder?: string;
  control: Control<any>;
  label?: string;
  helperText?: string;
  onChange?: (e: any) => void;
  onBlur?: () => void;
  leftElement?: any;
} & Partial<FormControlProps>;

export const FormTextInput = (props: FormTextInputProps) => {
  const { field, fieldState } = useController({
    name: props.name,
    control: props.control,
  });

  return (
    <FormControl isInvalid={fieldState.invalid} isDisabled={field.disabled}>
      {props.label && <FormLabel>{props.label}</FormLabel>}

      <InputGroup>
        {props.leftElement && (
          <InputLeftElement>{props.leftElement}</InputLeftElement>
        )}

        <Input
          variant="filled"
          name={field.name}
          value={field.value}
          isDisabled={field.disabled}
          autoComplete="off"
          ref={field.ref}
          onBlur={() => {
            field.onBlur();
            if (props.onBlur) {
              props.onBlur();
            }
          }}
          onChange={(e) => {
            field.onChange(e);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          disabled={field.disabled}
          placeholder={props.placeholder}
        />
      </InputGroup>

      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}

      <FormErrorMessage>{fieldState?.error?.message}</FormErrorMessage>
    </FormControl>
  );
};
