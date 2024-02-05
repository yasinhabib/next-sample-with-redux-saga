'use client'

import Modals from "@/components/modals";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { forwardRef, useImperativeHandle, useState } from "react"
import { useForm,Controller,SubmitHandler } from 'react-hook-form';
import { newsSchema } from "./newsSchema";
import { CREATE_NEWS, UPDATE_NEWS } from "@/lib/redux/types";
import { useDispatch } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers";
import { NewsType } from "@/lib/redux/slices/news";

export interface ModalNewsHandles {
    openModal: (data?: NewsType) => void;
}

interface IFormInput{
    id? : number,
    date?: Date,
    title?: string,
    content?: string,
}

const ModalNews = forwardRef<ModalNewsHandles>((props,ref) => {
    const [open,setOpen] = useState(false)
    const dispatch = useDispatch()

    useImperativeHandle(ref, () => {
        return {
            openModal(data){
                setOpen(true)

                if(data){
                    setValue('id',data.id)
                    setValue('date',new Date(data.date))
                    setValue('title',data.title)
                    setValue('content',data.content)
                }
            },
        };
    }, []);

    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue
      } = useForm({
        resolver: yupResolver(newsSchema),
        defaultValues: {
            date: new Date(),
            title: '',
            content: '',
        }
    })

    const onSubmit : SubmitHandler<IFormInput> = (data) => {
        if(data.id){
            dispatch({type: UPDATE_NEWS , id: data.id, data: data})
        }else{
            dispatch({type: CREATE_NEWS , data: data})
        }
    }

    return(
        <Modals
            open={open}
            title="Modal Editor Data News"
            setOpen={setOpen}
            // width={'300px'}
            >
            <Box>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Box sx={{ mt: 1 }}>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => <DatePicker 
                                {...field}
                                label="Date"
                                autoFocus
                            />}
                        />
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                label="title"
                                id="title"
                                error={errors.title != undefined}
                                helperText={errors.title?.message}
                            />}
                        />
                        <Controller
                            name="content"
                            control={control}
                            render={({ field }) => <TextField
                                {...field}
                                margin="normal"
                                type="text"
                                rows={4}
                                fullWidth
                                label="content"
                                id="content"
                                error={errors.content != undefined}
                                helperText={errors.content?.message}
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

export default ModalNews