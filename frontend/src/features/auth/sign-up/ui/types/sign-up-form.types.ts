import { signUpSchema } from '../schemas/sign-up.schema';
import { z } from 'zod';

export type ISignUpForm = z.infer<typeof signUpSchema>;

export interface ISignUpFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}
