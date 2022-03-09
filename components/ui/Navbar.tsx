import React from "react";
import NextLink from "next/link";
import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SearchOutlined } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Koon</Typography>
          </Link>
        </NextLink>

        {/* todo flex */}
        <Box flex={1}></Box>
        <Box sx={{display:{xs:"none", sm:'block'}}}>
          <NextLink href="/categoty/men" passHref>
            <Link>
              <Button>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href="/categoty/women" passHref>
            <Link>
              <Button>Women</Button>
            </Link>
          </NextLink>
          <NextLink href="/categoty/kid" passHref>
            <Link>
              <Button>Niños</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1}></Box>

        {/* todo flexx */}

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button >Menú</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
