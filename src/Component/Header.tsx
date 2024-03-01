import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const logo = require("../image.png");
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const settings = ["Location", "Dashboard", "Logout"];
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleNavigation = () => {
    navigate("/");
    setAnchorElUser(null);
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ minHeight: 5, backgroundColor: "#0049A3" }}>
            <Box sx={{ flexGrow: 1 ,display:"flex",}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                edge="start"
                // color="error"
                style={{ color: "#ffffff" }}
                sx={{ mr: 1 }}
                onClick={handleOpenUserMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
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
              <Typography
              variant="h6"
              noWrap
              component="div"
              color="#ffffff"
              sx={{ display: { xs: "none", sm: "block" ,mr:1, margin:"6px"} }}
            >
              Settings
            </Typography>
            </Box>

          
            <Box sx={{ flexGrow: 1 ,display:"flex",}}>
              <img
                src={logo}
                style={{position:"relative",alignContent:"center", justifyContent:"center" }}
                alt="logo"
              />
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                style={{ color: "#ffffff" }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"

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
