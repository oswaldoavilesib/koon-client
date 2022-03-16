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

export const AdminNavbar = () => {

  const { toggleSideMenu } = useContext(UiContext);


  return (
    <AppBar>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "end" }}>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Typography variant="h6">Koon |</Typography>
            </Link>
          </NextLink>
        </Box>

        {/* todo flex */}
        <Box flex={1}></Box>

        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
