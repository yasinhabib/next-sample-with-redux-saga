'use client'

import Modals from "@/components/modals";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { forwardRef, useImperativeHandle, useState } from "react"
import { useForm,Controller,SubmitHandler } from 'react-hook-form';
import { userSchema } from "./userSchema";
import { CREATE_USER } from "@/lib/redux/types";
import { useDispatch } from "react-redux";

export interface ModalUserHandles {
    openModal: () => void;
}

interface IFormInput{
    name?: string,
    job?: string
}

const ModalUser = forwardRef<ModalUserHandles>((props,ref) => {
    const [open,setOpen] = useState(false)
    const dispatch = useDispatch()

    useImperativeHandle(ref, () => {
        return {
            openModal(){
                setOpen(true)
            },
        };
    }, []);

    const {
        control,
        formState: { errors },
        handleSubmit,
      } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            name: '',
            job: '',
        }
    })

    const onSubmit : SubmitHandler<IFormInput> = (data) => {
        dispatch({type: CREATE_USER , name: data.name, password: data.job})
    }

    return(
        <Modals
            open={open}
            title="Modal Editor Data User"
            setOpen={setOpen}
            // width={'300px'}
            >
            <Box>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Box sx={{ mt: 1 }}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                error={errors.name != undefined}
                                helperText={errors.name?.message}
                            />}
                        />
                        <Controller
                            name="job"
                            control={control}
                            render={({ field }) => <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                label="Job"
                                id="job"
                                error={errors.job != undefined}
                                helperText={errors.job?.message}
                            />}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            SAVE
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modals>
    )
})

export default ModalUser