import { purple } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: purple[900],
        },
      },
    },
    light: {
      palette: {
        primary: {
          main: purple[600],
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
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiConfig;
