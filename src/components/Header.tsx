import { Avatar, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/user/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.userData);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    handleClose();

    navigate("/auth");
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleLogoClick}
          >
            Pharmacy Stock
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ width: 40, height: 40 }}>
              {user && user.name[0].toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {user
              ? [
                  <MenuItem key={uuidv4()} onClick={handleClose}>
                    Profile
                  </MenuItem>,
                  <MenuItem key={uuidv4()} onClick={handleLogoutClick}>
                    Logout
                  </MenuItem>,
                ]
              : [
                  <MenuItem key={uuidv4()} onClick={handleLoginClick}>
                    Login
                  </MenuItem>,
                ]}
          </Menu>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
