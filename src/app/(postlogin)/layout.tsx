'use client'

import type { Metadata } from "next";
import { Alert, AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Snackbar, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from "react-redux";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { LOGOUT } from "@/lib/redux/types";
import { useEffect, useState } from "react";
import { RootState } from "@/lib/redux/store";
import { setTextNotification } from "@/lib/redux/slices/notification";
import { useRouter } from "next/navigation";

export default function PostLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const notificationText = useSelector((state: RootState) => state.notification)
  const [snackbarState,setSnackBarState] = useState(false)
  const [drawerState,setDrawerState] = useState(false)

  const dispatch = useDispatch()

  const onClickLogout = () => {
    dispatch({type: LOGOUT})
  }
  useEffect(() => {
      if(notificationText.text){
        setSnackBarState(true)
      }
  },[notificationText])

  const toogleDrawer = () => {
    setDrawerState(!drawerState)
  }

  const selectMenu = (url: string) => () => {
    setDrawerState(false)
    router.push(url)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toogleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Next Sampel App
            </Typography>
            <Button color="inherit" onClick={onClickLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
      <Snackbar
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          open={snackbarState}
          onClose={() => {
              setSnackBarState(false)
              setTimeout(() => {
                  dispatch(setTextNotification({text: undefined,severity: undefined}))
              }, 500)
          }}
          autoHideDuration={2000}
      >
          <Alert severity={notificationText.severity} sx={{ width: '100%' }}>
              {notificationText.text}
          </Alert>
      </Snackbar>
      <Drawer
        anchor={'left'}
        open={drawerState}
        onClose={toogleDrawer}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            {['User', 'News'].map((text, index) => (
              <>
              <ListItem key={text} disablePadding onClick={selectMenu(`/${text.toLowerCase()}`)} >
                <ListItemButton>
                  <ListItemIcon>
                    {<ArrowRightIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
              <Divider />
              </>
            ))}
          </List>
        </Box>
      </Drawer>

    </>
  );
}
