import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

// ResponsiveAppBar.tsx
import * as React from 'react';
import { Link as RouterLink } from '@tanstack/react-router';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Box,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(e.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* 移动端菜单按钮 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {NAV_ITEMS.map((item) => (
                <MenuItem
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  onClick={handleCloseNavMenu}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* 移动端 LOGO */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const RootLayout = () => (
  <>
    <ResponsiveAppBar />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
