import React from 'react';
import { IThemeContext } from './types';

export const ThemeContext = React.createContext<IThemeContext>({
  toggleMode: () => {
    return;
  },
});
