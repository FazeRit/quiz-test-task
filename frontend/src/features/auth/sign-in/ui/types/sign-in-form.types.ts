import { signInSchema } from '../schemas/sign-in.schema';
import { z } from 'zod';

export type ISignInForm = z.infer<typeof signInSchema>;

export interface ISignInFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}
