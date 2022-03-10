import React from "react";
import NextLink from "next/link";
import {useRouter} from 'next/router'
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

const {asPath} = useRouter()



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
          <NextLink href="/categoria/hombres" passHref>
            <Link>
              <Button color={asPath === '/categoria/hombres' ? 'primary' : 'info'}>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href="/categoria/mujeres" passHref>
            <Link>
              <Button color={asPath === '/categoria/mujeres' ? 'primary' : 'info'}>Women</Button>
            </Link>
          </NextLink>
          <NextLink href="/categoria/artesanias" passHref>
            <Link>
              <Button color={asPath === '/categoria/artesanias' ? 'primary' : 'info'}>Artesanías</Button>
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
