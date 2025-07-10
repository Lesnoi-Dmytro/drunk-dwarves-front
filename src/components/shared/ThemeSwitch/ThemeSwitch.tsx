import {
  darkPreferedMatcher,
  preferedThemeEventListener,
  removeDarkDocumentTheme,
  setDarkDocumentTheme,
  themeOptions,
} from '@/components/shared/ThemeSwitch/helpers';
import { Box, IconButton, Menu, MenuItem, useColorScheme } from '@mui/material';
import React, { useEffect, useMemo, useState, type MouseEvent } from 'react';

const ThemeSwitch = React.memo(() => {
  const { mode, setMode } = useColorScheme();
  const selecteTheme = useMemo(() => themeOptions.find((option) => option.value === mode)!, [mode]);

  useEffect(() => {
    if (mode === 'system') {
      if (darkPreferedMatcher.matches) {
        setDarkDocumentTheme();
      } else {
        removeDarkDocumentTheme();
      }
      darkPreferedMatcher.addEventListener('change', preferedThemeEventListener);

      return;
    }
    darkPreferedMatcher.removeEventListener('change', preferedThemeEventListener);

    if (mode === 'dark') {
      setDarkDocumentTheme();
    } else if (mode === 'light') {
      removeDarkDocumentTheme();
    }
  }, [mode]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleOpen} color="secondary">
        <selecteTheme.Icon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {themeOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option === selecteTheme}
            onClick={() => setMode(option.value)}
          >
            <Box display="flex" gap={1}>
              <option.Icon />
              {option.label}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
});

ThemeSwitch.displayName = 'ThemeSwitch';

export default ThemeSwitch;
