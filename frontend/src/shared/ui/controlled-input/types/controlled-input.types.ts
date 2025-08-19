import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField';

export interface IControlledInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'error' | 'helperText'> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: object;
}
