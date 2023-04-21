import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import UsersIcon from '@mui/icons-material/Group';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SummarizeIcon from '@mui/icons-material/Summarize';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogoutAction } from '../../redux/Actions/ADMIN_ACTIONS/LogoutAction';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function AdminSideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleLogout = () => {
    dispatch(adminLogoutAction())
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style = {{backgroundColor : "#fed250" , color : "black"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Two Wheeler
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {name : "Dashboard" , icon : <DashboardIcon/>},
            {name : "Users" , icon : <UsersIcon/>},
            {name : "Bikes" , icon : <TwoWheelerIcon/>},
            {name : "Bookings" , icon : <SportsMotorsportsIcon/>},
            {name : "Add Bikes" , icon : <AddIcon/>},
            {name : "Rent Requests" , icon : <RequestPageIcon/>},
            {name : "Locations" , icon : <LocationOnIcon/>},
            {name : "Coupons" , icon : <LocalOfferIcon/>},
            {name : "Sales Report", icon : <SummarizeIcon/>},
            {name : "Logout" , icon : <LogoutIcon/>}

          ].map((text, index) => (
            <ListItem key={text.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
               
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   {text.icon}
      
                </ListItemIcon>
                <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }} 
                 onClick = {() => {
                  let text2 = text.name.toLowerCase()
                  text2 === "dashboard" && navigate('/admin/dashboard')
                  text2 === 'users' && navigate('/admin/users')
                  text2 === 'bikes' && navigate('/admin/bikes')
                  text2 === 'add bikes' && navigate('/admin/add-bikes')
                  text2 === 'bookings' && navigate('/admin/bookings')
                  text2 === 'rent requests' && navigate('/admin/rent-requests')
                  text2 === 'locations' && navigate('/admin/locations')
                  text2 === 'add location' && navigate('/admin/add-location')
                  text2 === 'coupons' && navigate('/admin/coupons')
                  text2 === 'sales report' && navigate('/admin/sales-report')
                  text2 === 'logout' && handleLogout()
                 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
       
      </Drawer>
    </Box>
  );
}