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
  Router,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { useContext,useState } from "react";
import { UiContext } from "../../context/ui";
import { useRouter } from "next/router";
import NextLink from "next/link";

export const SideMenu = () => {


  const router = useRouter()

  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState('')

  const onSearchTerm = () => {
    if(searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`)

  }

  const navigateTo = (url:string) => {
    toggleSideMenu()
    router.push(url)
  }



  const toggleMenu = () => {
    toggleSideMenu();
  };



  return (
    <Drawer
      open={isMenuOpen}
      anchor="left"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem className='side-menu-items'>
            <Input
            autoFocus
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyPress={(e)=> e.key === 'Enter' ? onSearchTerm() : null}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton 
                  onClick={onSearchTerm}
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem button className='side-menu-items'>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Perfil"} />
          </ListItem>

          <ListItem button className='side-menu-items'>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"Mis Ordenes"} />
          </ListItem>

          <NextLink href="/categoria/hombres" passHref>
            <Link>
              <ListItem
                button
                sx={{ display: { xs: "", sm: "none"}, color:'rgba(0, 0, 0, 0.87)' }}
                onClick={toggleMenu}
                className='side-menu-items'
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
                sx={{ display: { xs: "", sm: "none" },color:'rgba(0, 0, 0, 0.87)' }}
                onClick={toggleMenu}
                className='side-menu-items'
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
                sx={{ display: { xs: "", sm: "none" },color:'rgba(0, 0, 0, 0.87)' }}
                onClick={toggleMenu}
                className='side-menu-items'
              >
                <ListItemIcon>
                  <EscalatorWarningOutlined />
                </ListItemIcon>
                <ListItemText primary={"Artesanías"} />
              </ListItem>
            </Link>
          </NextLink>

          <ListItem button className='side-menu-items'>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={"Ingresar"} />
          </ListItem>

          <ListItem button className='side-menu-items'>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={"Salir"} />
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Panel de Administrador</ListSubheader>

          <ListItem button className='side-menu-items'>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={"Productos"} />
          </ListItem>
          <ListItem button className='side-menu-items'>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"Ordenes"} />
          </ListItem>

          <ListItem button className='side-menu-items'>
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

