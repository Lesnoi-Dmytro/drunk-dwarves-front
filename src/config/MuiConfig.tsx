import { CssBaseline } from '@mui/material';
import { purple } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: purple[900],
        },
        background: {
          default: '#251535',
          paper: '#352055',
        },
      },
    },
    light: {
      palette: {
        primary: {
          main: purple[600],
        },
        background: {
          default: '#604b70',
          paper: '#8e6bac',
        },
      },
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
});

interface Props {
  children: React.ReactNode;
}

const MuiConfig: React.FC<Props> = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme} noSsr defaultMode="system">
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
};

export default MuiConfig;
