import { createTheme } from '@mui/material/styles';
import { materialTheme } from './materialTheme';

const lightScheme = materialTheme.schemes.light;

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightScheme.primary,
      contrastText: lightScheme.onPrimary,
    },
    secondary: {
      main: lightScheme.secondary,
      contrastText: lightScheme.onSecondary,
    },
    error: {
      main: lightScheme.error,
      contrastText: lightScheme.onError,
    },
    background: {
      default: lightScheme.background,
      paper: lightScheme.surface,
    },
    text: {
      primary: lightScheme.onSurface,
      secondary: lightScheme.onSurfaceVariant,
    },
    divider: lightScheme.outline,
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'Helvetica',
      'Arial',
      'PingFang SC',
      'Hiragino Sans GB',
      'Microsoft YaHei',
      'sans-serif',
    ].join(','),
  },
});
