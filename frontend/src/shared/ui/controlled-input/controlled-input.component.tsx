import TextField from '@mui/material/TextField';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { IControlledInputProps } from './types/controlled-input.types';

export const ControlledInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  ...textFieldProps
}: IControlledInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} {...textFieldProps} error={!!error} helperText={error?.message} />
      )}
    />
  );
};
