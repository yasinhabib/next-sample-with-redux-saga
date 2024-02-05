import axios, {AxiosInstance} from 'axios'

export type LoginServiceResponse = {
    token: string,
}

export type RegisterServiceResponse = {
    id: number,
    token: string
}

export const loginService = (axios: AxiosInstance) => async (email: string, password: string): Promise<LoginServiceResponse> => {
    try{
        const response = await axios.post<LoginServiceResponse>('/login',{
            email: email,
            password: password
        })

        return response.data
    }catch(error: any){
        throw new Error(error.response.data.error,{
            cause: error
        })
    }
}

export const registerService = (axios: AxiosInstance) => async (email: string, password: string): Promise<RegisterServiceResponse> => {
    try{
        const response = await axios.post<RegisterServiceResponse>('/login',{
            email: email,
            password: password
        })

        return response.data
    }catch(error: any){
        throw new Error(error.response.data.error,{
            cause: error
        })
    }
}

export type AuthServiceType = {
    login    : (email: string, password: string) => Promise<LoginServiceResponse>,
    register : (email: string, password: string) => Promise<RegisterServiceResponse>,
}

export const AuthServices = (axiosInstance: AxiosInstance) : AuthServiceType => ({
    login    : loginService(axiosInstance),
    register : registerService(axiosInstance),
})