import axiosInstance from "../axios/axiosInstance";
import type {ApiResponse} from "../../types/ApiType";
import type {Register} from "../../types/RegisterType";

export const registarUsuario = async (request: Register): Promise<ApiResponse<any>> => {
    try {
        const {data} = await axiosInstance.post<ApiResponse<any>>("registrar-usuario", request);
        console.log(data);
        return data;
    }catch(err: any) {
        console.log("Error en registro:", err.response?.data || err.message);
        throw err;
    }

}