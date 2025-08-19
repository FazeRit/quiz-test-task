import styled from '@emotion/styled';
import { Box, Card, Container } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const StyledContainer = styled(Container)<{ theme: Theme }>`
  padding-top: ${({ theme }) => theme.spacing(4)};
  padding-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const StyledHeaderBox = styled(Box)<{ theme: Theme }>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const StyledCard = styled(Card)<{ theme: Theme }>`
  box-shadow: ${({ theme }) => theme.shadows[2]};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

export const StyledQuestionCard = styled(Card)<{ theme: Theme }>`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  border: 1px solid ${({ theme }) => theme.palette.divider};
`;

export const StyledChipContainer = styled(Box)<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const StyledAnswerList = styled(Box)<{ theme: Theme }>`
  padding-left: ${({ theme }) => theme.spacing(2)};
  margin: 0;
`;
