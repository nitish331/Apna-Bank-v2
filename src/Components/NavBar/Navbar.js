import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { logout } from "../../reducers/userSlice";

const pages = [
  <Link
    to={"/user/transferMoney"}
    style={{ color: "white", textDecoration: "none" }}
  >
    Transfer-Money
  </Link>,
  <Link
    to={"/user/deposits"}
    style={{ color: "white", textDecoration: "none" }}
  >
    Deposits
  </Link>,
];

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logouthandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    return navigate("/user/login");
  };

  const settings = [
    <Link
      to={"/user/dashboard"}
      style={{ color: "white", textDecoration: "none" }}
    >
      Dashboard
    </Link>,
    <Link
      to={"/user/createRequest"}
      style={{ color: "white", textDecoration: "none" }}
    >
      Create New Request
    </Link>,
    <Link
      to={"/user/requests"}
      style={{ color: "white", textDecoration: "none" }}
    >
      All Request
    </Link>,
    <Link
      to={"/user/profile"}
      style={{ color: "white", textDecoration: "none" }}
    >
      Profile
    </Link>,
    <Typography onClick={logouthandler}>LogOut</Typography>,
  ];

  const state = useSelector((state) => state.user);

  const handleOpenNavMenu = (event) => {
    event.preventDefault();
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    event.preventDefault();
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    event.preventDefault();
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    event.preventDefault();
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ApnaBank
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {state.user.name &&
                  pages.map((page, i) => (
                    <MenuItem key={i} onClick={handleCloseNavMenu}>
                      {page}
                    </MenuItem>
                  ))}
              </Menu>
            </Box>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ApnaBank
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {state.user.name && (
                <>
                  {pages.map((page, i) => (
                    <Button
                      key={i}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
                  <Typography style={{ margin: "auto" }}>
                    Welcome {state.user.name}
                  </Typography>
                </>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {!state.user.name && (
                <>
                  <Button
                    style={{ marginRight: "2rem" }}
                    onClick={() => {
                      navigate("/user/login");
                    }}
                    variant="contained"
                  >
                    LogIn
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/user/register")}
                  >
                    Register here!!
                  </Button>
                </>
              )}
              {state.user.name && (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: "orange" }}>
                      {state.user.name[0]}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, i) => (
                  <MenuItem key={i} onClick={handleCloseUserMenu}>
                    {setting}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default NavBar;
