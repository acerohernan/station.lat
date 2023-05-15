import { ThemeOptions } from '@mui/material';
import { montserrat } from './font';

export const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: montserrat.style.fontFamily,
    button: {
      textTransform: 'none',
    },
    fontSize: 13,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
};
