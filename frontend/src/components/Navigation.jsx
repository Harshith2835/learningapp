import React from 'react';
import { Box, Fab, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import NavigationIcon from '@mui/icons-material/Navigation';
import InfoIcon from '@mui/icons-material/Info';
import { TurnLeft } from '@mui/icons-material';

export default function Navigation() {
  const location = useLocation();

  const appBarStyle = {
    backgroundColor: '#d2a119', // Mustard color for the taskbar
    top: 'auto',
    bottom: 0,
  };

  const fabStyle = {
    position: 'fixed',
    zIndex: 'tooltip',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 32,
  };

  const brownFabStyle = {
    ...fabStyle,
    backgroundColor: '#8B4513', // Brown color for Settings button
    color: '#fff',              // White icon color for contrast
  };

  if (location.pathname === '/') {
    return (
      <Link to="/path">
        <Fab color="primary" variant="extended" sx={fabStyle}>
          <Typography display="flex" p={2} alignItems="center" variant="h6" fontWeight="bold">
            <NavigationIcon sx={{ mr: 1 }} />
            START
          </Typography>
        </Fab>
      </Link>
    );
  } else if (location.pathname === '/path') {
    return (
      <AppBar position="fixed" sx={appBarStyle}>
        <Link to="/settings">
          <Fab sx={brownFabStyle}>
            <SettingsIcon />
          </Fab>
        </Link>

        <Toolbar>
          <Link to="/" sx={{ alignItems: 'flex-start' }}>
            <IconButton sx={{ color: '#fff' }}>
              <HomeIcon />
            </IconButton>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Link to="/sources">
            <IconButton sx={{ color: '#fff' }}>
              <InfoIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    );
  } else if (location.pathname === '/settings' || location.pathname === '/sources') {
    return (
      <AppBar position="fixed" sx={appBarStyle}>
        <Toolbar>
          <Link to="/" sx={{ alignItems: 'flex-start' }}>
            <IconButton sx={{ color: '#fff' }}>
              <HomeIcon />
            </IconButton>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Link to="/path">
            <IconButton sx={{ color: '#fff' }}>
              <TurnLeft />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    );
  } else if (location.pathname.startsWith('/lecture/')) {
    return (
      <AppBar position="fixed" sx={appBarStyle}>
        <Link to="/path">
          <Fab color="primary" sx={fabStyle}>
            <NavigationIcon />
          </Fab>
        </Link>

        <Toolbar>
          <Link to="/" sx={{ alignItems: 'flex-start' }}>
            <IconButton sx={{ color: '#fff' }}>
              <HomeIcon />
            </IconButton>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Link to="/path" sx={{ alignItems: 'flex-end' }}>
            <IconButton sx={{ color: '#fff' }}>
              <TurnLeft />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    );
  } else {
    return null;
  }
}