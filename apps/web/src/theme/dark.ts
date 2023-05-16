import { ThemeOptions } from '@mui/material';

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: '#171C24',
      paper: '#222B36',
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#222B36',
        },
      },
    },
  },
};
