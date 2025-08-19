import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import React from 'react';
import { ControlledInput } from '../../../../shared/ui/controlled-input';
import { ISignUpForm, ISignUpFormProps } from './types/sign-up-form.types';
import { RouterKeys } from '../../../../shared/constants/router-keys.const';
import { signUpSchema } from './schemas/sign-up.schema';
import {
  StyledCard,
  StyledContainer,
  StyledLinkContainer,
  StyledSubmitButton,
  StyledSubtitle,
  StyledTitle,
} from './styles/sign-up-form.styles';
import { useAuthStore } from '../../../../app/store/auth';
import { useForm } from 'react-hook-form';
import { useSignUp } from '../api/use-sign-up.hook';
import { useTheme } from '@mui/material/styles';
import { zodResolver } from '@hookform/resolvers/zod';

export const SignUpForm: React.FC<ISignUpFormProps> = ({ onSuccess, redirectTo }) => {
  const theme = useTheme();
  const { isLoading } = useAuthStore();
  const signUpMutation = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: ISignUpForm) => {
    signUpMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
        if (redirectTo) {
          window.location.href = redirectTo;
        }
      },
    });
  };

  return (
    <StyledContainer theme={theme}>
      <StyledCard theme={theme}>
        <CardHeader
          title={
            <StyledTitle variant="h4" theme={theme}>
              Sign Up
            </StyledTitle>
          }
          subheader={
            <StyledSubtitle variant="body2" theme={theme}>
              Create your Quiz Builder account
            </StyledSubtitle>
          }
        />
        <CardContent>
          <Box sx={{ mt: 1 }}>
            <ControlledInput
              name="username"
              control={control}
              margin="normal"
              required
              fullWidth
              label="Username"
              autoComplete="username"
              autoFocus
              disabled={isLoading}
            />
            <ControlledInput
              name="password"
              control={control}
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
            />
            <StyledSubmitButton
              type="button"
              fullWidth
              variant="contained"
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={20} />}
              theme={theme}
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </StyledSubmitButton>
            <StyledLinkContainer theme={theme}>
              <Link href={RouterKeys.AUTH.SIGN_IN} variant="body2" underline="hover">
                Already have an account? Sign In
              </Link>
            </StyledLinkContainer>
          </Box>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};
