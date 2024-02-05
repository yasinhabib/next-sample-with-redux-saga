import { NewsType } from '@/lib/redux/slices/news'
import {AxiosInstance} from 'axios'

export type NewsListResponse = {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: NewsType[]
}

export type NewsResponse = {
    data: NewsType
}

export const getNewsListService = (axios: AxiosInstance) => async (): Promise<NewsListResponse> => {
    try{
        const response = await axios.get<NewsListResponse>('/news')

        return response.data
    }catch(error: any){
        throw new Error(error.response.data.message)
    }
}

export const getNewsService = (axios: AxiosInstance) => async (id: number): Promise<NewsResponse> => {
    try{
        const response = await axios.get<NewsResponse>(`/news/${id}`)

        return response.data
    }catch(error: any){
        throw new Error(error.response.data.message)
    }
}

export const createNewsService = (axios: AxiosInstance) => async (data : NewsType): Promise<NewsType> => {
    try{
        const response = await axios.post<NewsType>(`/news`,data)

        return response.data
    }catch(error: any){
        throw new Error(error.response.data.message)
    }
}

export const updateNewsService = (axios: AxiosInstance) => async (id: number, data : NewsType): Promise<NewsType> => {
    try{
        const response = await axios.put<NewsType>(`/news/${id}`,data)

        return response.data
    }catch(error: any){
        throw new Error(error.response.data.message)
    }
}

export const deleteNewsService = (axios: AxiosInstance) => async (id: number): Promise<void> => {
    try{
        await axios.delete<NewsType>(`/news/${id}`)
    }catch(error: any){
        throw new Error(error.response.data.message)
    }
}

export type NewsServiceType = {
    getNewsList : () => Promise<NewsListResponse>,
    getNews     : (id: number) => Promise<NewsResponse>,
    createNews  : (data : NewsType) => Promise<NewsType>
    updateNews  : (id: number, data : NewsType) => Promise<NewsType>,
    deleteNews  : (id: number) => Promise<void>
}

export const NewsServices = (axiosInstance: AxiosInstance) : NewsServiceType => ({
    getNewsList : getNewsListService(axiosInstance),
    getNews     : getNewsService(axiosInstance),
    createNews  : createNewsService(axiosInstance),
    updateNews  : updateNewsService(axiosInstance),
    deleteNews  : deleteNewsService(axiosInstance),
})