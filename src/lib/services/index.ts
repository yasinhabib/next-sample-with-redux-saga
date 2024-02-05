import axios from "axios";
import { AuthServiceType, AuthServices } from "./auth";
import { NewsServiceType, NewsServices } from "./news";
import { UserServiceType, UserServices } from "./users";
import { getCookie } from "cookies-next";

type ServiceType = AuthServiceType &  NewsServiceType & UserServiceType

const axiosInstanceWithoutToken = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TARGET_API,
    headers: {
        "Content-Type": "application/json",
    }
})

const token = getCookie('token')

const axiosInstanceWithToken = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TARGET_API,
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
    }
})

const services : ServiceType = {
    ...AuthServices(axiosInstanceWithoutToken),
    ...NewsServices(axiosInstanceWithToken),
    ...UserServices(axiosInstanceWithToken)
}

export const {
    login,
    register,

    getNewsList,
    getNews,
    createNews,
    updateNews,
    deleteNews,

    getUserList,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = services