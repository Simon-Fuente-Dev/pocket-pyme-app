import axiosInstance from "../axios/axiosInstance";
import type {ApiResponse} from "../../types/ApiType";
import type {LoginUser, AuthData} from "../../types/UserTypes";

export const authUsuario = async (request: LoginUser) : Promise<ApiResponse<AuthData>> => {
    const {data} = await axiosInstance.post<ApiResponse<AuthData>>("iniciar-sesion", request);
    return data;
}