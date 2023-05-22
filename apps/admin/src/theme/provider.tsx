import React from 'react';
import { ThemeContext } from './context';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { baseTheme } from './base';
import { lightTheme } from './light';
import { darkTheme } from './dark';

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>(() => {
    const mode = (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light';

    return mode;
  });

  const value = React.useMemo(
    () => ({
      toggleMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme', newMode);
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
