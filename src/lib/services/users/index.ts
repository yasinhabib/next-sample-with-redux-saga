import { UserType } from '@/lib/redux/slices/users'
import {AxiosInstance} from 'axios'
import { getCookie } from 'cookies-next';

export type UserListResponse = {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: UserType[]
}

export type UserResponse = {
    data: UserType
}

export const getUserListService = (axios: AxiosInstance) => async (): Promise<UserListResponse> => {
    try{
        
        const response = await axios.get<UserListResponse>('/users')

        return response.data
    }catch(error: any){
        throw new Error(error.response.data.message)
    }
}

export const getUserService = (axios: AxiosInstance) => async (id: number): Promise<UserResponse> => {
    try{
        const response = await axios.get<UserResponse>(`/users/${id}`)

        return response.data
    }catch(error: any){
        throw new Error(error.response.data.message)
    }
}

export const createUserService = (axios: AxiosInstance) => async (data : UserType): Promise<UserType> => {
    try{
        const response = await axios.post<UserType>(`/users`,data)

        return response.data
    }catch(error: any){
        throw new Error(error.response.data.message)
    }
}

export const updateUserService = (axios: AxiosInstance) => async (id: number, data : UserType): Promise<UserType> => {
    try{
        const response = await axios.put<UserType>(`/users/${id}`,data)

        return response.data
    }catch(error: any){
        throw new Error(error.response.data.message)
    }
}

export const deleteUserService = (axios: AxiosInstance) => async (id: number): Promise<void> => {
    try{
        await axios.delete<UserType>(`/users/${id}`)
    }catch(error: any){
        throw new Error(error.response.data.message)
    }
}

export type UserServiceType = {
    getUserList : () => Promise<UserListResponse>,
    getUser     : (id: number) => Promise<UserResponse>,
    createUser  : (data : UserType) => Promise<UserType>
    updateUser  : (id: number, data : UserType) => Promise<UserType>,
    deleteUser  : (id: number) => Promise<void>
}

export const UserServices = (axiosInstance: AxiosInstance) : UserServiceType => ({
    getUserList : getUserListService(axiosInstance),
    getUser     : getUserService(axiosInstance),
    createUser  : createUserService(axiosInstance),
    updateUser  : updateUserService(axiosInstance),
    deleteUser  : deleteUserService(axiosInstance),
})