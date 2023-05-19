import React from 'react';
import { ThemeContext } from './context';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { baseTheme } from './base';
import { lightTheme } from './light';
import { darkTheme } from './dark';

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const value = React.useMemo(
    () => ({
      toggleMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = React.useMemo(() => {
    const themeOptions = mode === 'light' ? lightTheme : darkTheme;

    return createTheme({
      ...baseTheme,
      ...themeOptions,
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
