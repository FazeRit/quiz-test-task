import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import React from 'react';
import { ControlledInput } from '../../../../shared/ui/controlled-input';
import { ISignInForm, ISignInFormProps } from './types/sign-in-form.types';
import { RouterKeys } from '../../../../shared/constants/router-keys.const';
import { signInSchema } from './schemas/sign-in.schema';
import {
  StyledCard,
  StyledContainer,
  StyledLinkContainer,
  StyledSubmitButton,
  StyledSubtitle,
  StyledTitle,
} from './styles/sign-in-form.styles';
import { useAuthStore } from '../../../../app/store/auth';
import { useForm } from 'react-hook-form';
import { useSignIn } from '../api/use-sign-in.hook';
import { useTheme } from '@mui/material/styles';
import { zodResolver } from '@hookform/resolvers/zod';

export const SignInForm: React.FC<ISignInFormProps> = ({ onSuccess, redirectTo }) => {
  const theme = useTheme();
  const { isLoading } = useAuthStore();
  const signInMutation = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: ISignInForm) => {
    signInMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
        if (redirectTo) {
          window.location.href = redirectTo;
        }
      },
      onError: error => {
        console.error('Sign in error:', error);
      },
    });
  };

  return (
    <StyledContainer theme={theme}>
      <StyledCard theme={theme}>
        <CardHeader
          title={
            <StyledTitle variant="h4" theme={theme}>
              Sign In
            </StyledTitle>
          }
          subheader={
            <StyledSubtitle variant="body2" theme={theme}>
              Welcome back to Quiz Builder
            </StyledSubtitle>
          }
        />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
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
              autoComplete="current-password"
              disabled={isLoading}
            />
            <StyledSubmitButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={20} />}
              theme={theme}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </StyledSubmitButton>
            <StyledLinkContainer theme={theme}>
              <Link href={RouterKeys.AUTH.SIGN_UP} variant="body2" underline="hover">
                Don't have an account? Sign Up
              </Link>
            </StyledLinkContainer>
          </Box>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};
