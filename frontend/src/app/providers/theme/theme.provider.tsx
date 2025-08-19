import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { IThemeProviderProps } from './types/theme.types';
import { theme } from './config/theme.config';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
