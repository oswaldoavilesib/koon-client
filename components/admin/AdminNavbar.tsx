import React, { useContext } from "react";
import NextLink from "next/link";
import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  Box,
  Button,
  Badge,
  Input,
  InputAdornment,
} from "@mui/material";

import { UiContext } from "../../context/ui";
import MenuIcon from '@mui/icons-material/Menu';

export const AdminNavbar = () => {

  const { toggleSideMenu } = useContext(UiContext);


  return (
    <AppBar>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "end" }}>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Typography variant="h6">Koon</Typography>
            </Link>
          </NextLink>
        </Box>

        <Button onClick={toggleSideMenu}><MenuIcon/></Button>

      </Toolbar>
    </AppBar>
  );
};
