'use client'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useForm,Controller,SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from './schema';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '@/lib/redux/types';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '@/lib/redux/store';
import { setTextNotification } from '@/lib/redux/slices/notification';
import { Grid } from '@mui/material';

interface IFormInput{
    email?: string,
    password?: string
}

const LoginPage = () => {
    const dispatch = useDispatch()

    const submitButtonRef = useRef<HTMLButtonElement>(null)

    const [snackbarState,setSnackBarState] = useState(false)

    const notificationText = useSelector((state: RootState) => state.notification)

    const {
        control,
        formState: { errors },
        handleSubmit,
      } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
      })
    
    const onSubmit : SubmitHandler<IFormInput> = (data) => {
        dispatch({type: LOGIN , email: data.email, password: data.password})
    }

    useEffect(() => {
        if(notificationText.text){
            setSnackBarState(true)
        }
    },[notificationText])
        
    return(
        <Grid container height={'100vh'}>
            <Grid item sm={6} >
                <Grid item sm={3}>

                </Grid>
            </Grid>
            <Grid item sm={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Box
                border={'1px solid darkgray'}
                borderRadius={'1rem'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                padding={'32px 16px'}
                maxWidth={'400px'}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h2" variant="h5">
                        Masuk
                    </Typography>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Box sx={{ mt: 1 }}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    autoComplete="email"
                                    autoFocus
                                    error={errors.email != undefined}
                                    helperText={errors.email?.message}
                                />}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    label="Kata Sandi"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onKeyDown={(e) => {
                                        if(e.ctrlKey && e.key == 'Enter'){
                                            submitButtonRef.current?.click()
                                        }
                                    }}
                                    error={errors.password != undefined}
                                    helperText={errors.password?.message}
                                />}
                            />
                            
                            <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Ingatkan saya"
                            />
                            <Button
                            ref={submitButtonRef}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                            >
                            Masuk
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
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
        </Grid>
    )
}

export default LoginPage