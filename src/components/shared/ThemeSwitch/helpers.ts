import Brightness4Icon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

export interface ThemeOption {
  label: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  value: 'light' | 'dark' | 'system';
}

export const themeOptions: ThemeOption[] = [
  {
    label: 'Light',
    value: 'light',
    Icon: LightModeIcon,
  },
  {
    label: 'Dark',
    value: 'dark',
    Icon: ModeNightIcon,
  },
  {
    label: 'System',
    value: 'system',
    Icon: Brightness4Icon,
  },
];

export function setDarkDocumentTheme() {
  document.body.classList.add('dark');
}

export function removeDarkDocumentTheme() {
  document.body.classList.remove('dark');
}

export const darkPreferedMatcher = window.matchMedia(
  '(prefers-color-scheme: dark)',
);

export function preferedThemeEventListener(event: MediaQueryListEvent) {
  if (event.matches) {
    setDarkDocumentTheme();
  } else {
    removeDarkDocumentTheme();
  }
}
