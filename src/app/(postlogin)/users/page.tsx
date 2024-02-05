'use client'
import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { GET_USER_LIST } from "@/lib/redux/types";

const Users = () => {
    const {users,fetching,error} = useSelector((state: RootState) => state.users)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type: GET_USER_LIST})
    },[])

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1
        },
        {
            field: 'first_name',
            headerName: 'First Name',
        },
        {
            field: 'last_name',
            headerName: 'Last Name',
        },
        {
            field: 'avatar',
            headerName: 'Avatar',
            renderCell: (params) => {
                return(
                    <img src={params.value} style={{maxWidth: '50px'}}/>
                )
            }
        },
    ]

    return(
        <Container sx={{padding: '16px 16px', height: '100%', gap: '16px', display: 'flex', flexDirection: 'column'}} >
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant="h6" marginBottom={'16px'}>Data User</Typography>
            </Box>
            <DataGrid
                density={'compact'}
                rows={users}
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
        </Container>
    )
}

export default Users