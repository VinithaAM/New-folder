import { AppBar, Box, IconButton, Toolbar } from '@mui/material';

import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate  } from 'react-router-dom';


const Header = () => {
  const navigate  = useNavigate ();
    const logo=require("../logo.jpg")
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const settings = ['Location', 'Dashboard', 'Logout'];
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const handleNavigation = ()=>{
      navigate("/")
      setAnchorElUser(null);
    }
  return (
  <div>
 <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{minHeight:5,color:"#043BAC"}}>
          <Box>
          <IconButton
           size="large"
           aria-label="account of current user"
           aria-controls="menu-appbar"
           aria-haspopup="true"
            edge="start"
            color="error"
            sx={{ mr: 1 }}
            onClick={handleOpenUserMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
           
            >
              {settings.map((settings) => (
                <MenuItem key={settings} onClick={handleNavigation}>
                  <Typography textAlign="center">{settings}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
       
         
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="white"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Settings
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} >
          <img src={logo} style={{width:45,height:25}} alt="logo" />
         </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
            //   aria-controls={menuId}
            //   aria-haspopup="true"
            //   onClick={handleProfileMenuOpen}
              color="error"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
            //   aria-controls={mobileMenuId}
            //   aria-haspopup="true"
            //   onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu}
      {renderMenu} */}
    </Box>
  </div>
  );
};

export default Header;

