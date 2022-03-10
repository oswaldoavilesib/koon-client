import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { useContext } from "react";
import { UiContext } from "../../context/ui";
import { useRouter } from "next/router";
import NextLink from "next/link";

const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

  const navigateTo = () => {
    toggleSideMenu();
  };
  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Perfil"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"Mis Ordenes"} />
          </ListItem>

          <NextLink href="/categoria/hombres" passHref>
            <Link>
              <ListItem
                button
                sx={{ display: { xs: "", sm: "none" } }}
                onClick={navigateTo}
              >
                <ListItemIcon>
                  <MaleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Hombres"} />
              </ListItem>
            </Link>
          </NextLink>

          <NextLink href="/categoria/mujeres" passHref>
            <Link>
              <ListItem
                button
                sx={{ display: { xs: "", sm: "none" } }}
                onClick={navigateTo}
              >
                <ListItemIcon>
                  <FemaleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Mujeres"} />
              </ListItem>
            </Link>
          </NextLink>

          <NextLink href="/categoria/artesanias" passHref>
            <Link>
              <ListItem
                button
                sx={{ display: { xs: "", sm: "none" } }}
                onClick={navigateTo}
              >
                <ListItemIcon>
                  <EscalatorWarningOutlined />
                </ListItemIcon>
                <ListItemText primary={"Artesanías"} />
              </ListItem>
            </Link>
          </NextLink>

          <ListItem button>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={"Ingresar"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={"Salir"} />
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem button>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={"Productos"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"Ordenes"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={"Usuarios"} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
