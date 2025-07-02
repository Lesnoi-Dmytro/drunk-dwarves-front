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
