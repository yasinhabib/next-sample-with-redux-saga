'use client'
import { useEffect, useRef } from "react";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { GET_NEWS_LIST } from "@/lib/redux/types";
import ModalNews, { ModalNewsHandles } from "./modal";
import { NewsType } from "@/lib/redux/slices/news";

const News = () => {
    const {news,fetching,error} = useSelector((state: RootState) => state.news)

    const modalNewsRef = useRef<ModalNewsHandles>(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type: GET_NEWS_LIST})
    },[])

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 1
        },
        {
            field: 'title',
            headerName: 'Title',
        },
        {
            field: 'content',
            headerName: 'Content',
        },
        {
            field: 'action',
            headerName: 'Action',
            headerAlign: 'center',
            width: 100,
            align: 'center',
            editable: false,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams<any>) => {
                return(
                    <IconButton aria-label="delete" onClick={handOpenModalEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                )
            }
        },
    ]

    const handleOpenModal = () => {
        modalNewsRef.current?.openModal()
    }

    const handOpenModalEdit = (data: NewsType) => () => {
        modalNewsRef.current?.openModal(data)
    }

    return(
        <Container sx={{padding: '16px 16px', height: '100%', gap: '16px', display: 'flex', flexDirection: 'column'}} >
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant="h6" marginBottom={'16px'}>Data News</Typography>
                <IconButton aria-label="add" onClick={handleOpenModal}><AddIcon /></IconButton>
            </Box>
            <DataGrid
                density={'compact'}
                rows={news}
                columns={columns}
                autoHeight
                getRowHeight={() => 'auto'} 
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableDensitySelector
                loading={fetching}
            />

            <ModalNews ref={modalNewsRef}/>
        </Container>
    )
}

export default News