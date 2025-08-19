import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { Theme } from '@mui/material/styles';

export const StyledPageContainer = styled(Box)<{ theme: Theme }>`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.palette.primary.light} 0%,
    ${({ theme }) => theme.palette.primary.main} 100%
  );
`;
