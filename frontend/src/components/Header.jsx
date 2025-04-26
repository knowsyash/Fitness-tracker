import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        {location.pathname === '/' && (
          <Button color="primary">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
    