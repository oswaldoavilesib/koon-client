import React, { useContext, useState } from "react";
import NextLink from "next/link";
import router, { useRouter } from "next/router";
import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Input,
  InputAdornment,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ClearOutlined, SearchOutlined } from "@mui/icons-material";
import { UiContext } from "../../context/ui";
import { CartContext } from '../../context/cart/CartContext';
import MenuIcon from '@mui/icons-material/Menu';
import { useSession } from 'next-auth/react';
import { IUser } from '../../interfaces/user';
import { AuthContext } from "../../context";


export const Navbar = () => {
  const { asPath, push } = useRouter();

  const { toggleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);


  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);


  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  const { user, isLoggedIn, logout } = useContext(AuthContext);


  return (
    <AppBar color='transparent'>
      <Toolbar>
        <Box sx={{display:'flex', alignItems:'end'}}>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Typography variant="h6">Koon</Typography>
            </Link>
          </NextLink>
          <Button onClick={toggleSideMenu}><MenuIcon/></Button>
        </Box>

        {/* todo flex */}
        <Box flex={1}></Box>
        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
          className="fadeIn"
        >
          <NextLink href="/categoria/hombres" passHref>
            <Link>
              <Button
                color={asPath === "/categoria/hombres" ? "primary" : "info"}
              >
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/categoria/mujeres" passHref>
            <Link>
              <Button
                color={asPath === "/categoria/mujeres" ? "primary" : "info"}
              >
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/categoria/artesanias" passHref>
            <Link>
              <Button
                color={asPath === "/categoria/artesanias" ? "primary" : "info"}
              >
                Artesanías
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1}></Box>

        {/* Pantallas pantallas grandes */}
      {
        isLoggedIn 
        ?
        <Typography sx={{textTransform:'capitalize'}}>{`Hola ${user!.name}!`}</Typography>
        : 
        null
      }
        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" } }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined color='primary'/>
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <SearchOutlined color='primary'/>
          </IconButton>
        )}

        {/* Pantallas pequeñas */}

        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined color='primary'/>
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={numberOfItems < 10 ? numberOfItems : '+9'} color="primary">
                <ShoppingCartIcon color='primary'/>
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
