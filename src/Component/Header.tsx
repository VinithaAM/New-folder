import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const Header = () => {
  const navigate = useNavigate();
  const logo = require("../image.png");
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const settings = ["Location", "Dashboard", "Logout"];
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleNavigation = (name:any) => {
    console.log(name)
    if(name==="Location"){
      navigate("/NewPlanner");
    }
    else if(name==="Dashboard"){

    }
    else if(name==="Logout"){
      navigate("/");
    }
    setAnchorElUser(null);
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [open, setOpen] = React.useState(false);
 
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  const drawerWidth = 240;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ minHeight: 5, backgroundColor: "#0049A3" }}>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                edge="start"
                // color="error"
                style={{ color: "#ffffff" }}
                sx={{ mr: 1 }}
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>

             
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="#ffffff"
                sx={{
                  display: {  sm: "block", mr: 1, margin: "6px" },
                }}
              >
                Settings
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <img
                src={logo}
                style={{
                  position: "relative",
                  alignContent: "center",
                  justifyContent: "center",
                }}
                alt="logo"
              />
            </Box>
            <Box sx={{ display: {  md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                style={{ color: "#ffffff" }}
                onClick={handleOpenUserMenu}
              >
                <AccountCircle />
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
                  <MenuItem  onClick={()=>handleNavigation("Logout")}>
                    <Typography textAlign="center">{"Logout"}</Typography>
                  </MenuItem>
                
              </Menu> 
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" aria-label="show more" color="inherit">
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.warning.main,
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader style={{ backgroundColor: "primary.main" }}>
            <IconButton onClick={handleDrawerClose} style={{ color: "#ffffff" }}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon   />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <List>
            {settings.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={()=>handleNavigation(text)}>
                  <ListItemText primary={text} color="#ffffff" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default Header;
