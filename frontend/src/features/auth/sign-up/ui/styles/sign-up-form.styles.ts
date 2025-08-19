import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';

export const StyledContainer = styled(Box)<{ theme: Theme }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const StyledCard = styled(Card)<{ theme: Theme }>`
  max-width: 400px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows[3]};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

export const StyledTitle = styled(Typography)<{ theme: Theme }>`
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 600;
`;

export const StyledSubtitle = styled(Typography)<{ theme: Theme }>`
  text-align: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const StyledForm = styled(Box)<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

export const StyledSubmitButton = styled(Button)<{ theme: Theme }>`
  margin-top: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(1.5)};
  font-weight: 600;
  text-transform: none;
`;

export const StyledLinkContainer = styled(Box)<{ theme: Theme }>`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;
