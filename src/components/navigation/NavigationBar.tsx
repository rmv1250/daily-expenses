import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {AccountCircleOutlined, QueryStats} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

interface MenuItem {
  title: string;
  path: string;
}

const pages: MenuItem[] = [
  {title: 'Add new', path: '/expenses/add'},
  {title: 'Summary', path: '/'},
  {title: 'Dashboard', path: '/expenses'},
  {title: 'Reports', path: '/expenses/reports'}];

const settings: MenuItem[] = [
  {title: 'Logout', path: ''},
  {title: 'Settings', path: '/settings'}
];

const NavigationBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page: MenuItem) => {
    if (page) {
      navigate(page.path);
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: MenuItem) => {
    if(setting){
      navigate(setting.path);
    }
    setAnchorElUser(null);
  };

  return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <QueryStats sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: {xs: 'none', md: 'flex'},
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
            >
              EXPENSES
            </Typography>

            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
              >
                <MenuIcon/>
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: {xs: 'block', md: 'none'},
                  }}
              >
                {pages.map((page) => (
                    <MenuItem key={page.title} onClick={() => {
                      handleCloseNavMenu(page)
                    }}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                ))}
              </Menu>
            </Box>
            <QueryStats sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: {xs: 'flex', md: 'none'},
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
            >
              EXPENSES
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              {pages.map((page) => (
                  <Button key={page.title}
                          onClick={() => {
                            handleCloseNavMenu(page)
                          }}
                          sx={{my: 2, color: 'white', display: 'block'}}
                  >
                    {page.title}
                  </Button>
              ))}
            </Box>

            <Box sx={{flexGrow: 0}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                  <Avatar>
                    <AccountCircleOutlined fontSize="medium"/>
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                  sx={{mt: '45px'}}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                    <MenuItem key={setting.path} onClick={() => handleCloseUserMenu(setting)}>
                      <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  );
}
export default NavigationBar;