// services/userService.ts
import axiosInstance from "../axios/axiosInstance";
import type { ApiResponse } from "../../types/ApiType";

export const obtenerMisDatos = async (): Promise<ApiResponse<number>> => {
    console.log("llamada")
    // El interceptor de axiosInstance agregará automáticamente el "Bearer token"
    try {
        const { data } = await axiosInstance.get<ApiResponse<number>>("/mis-datos");

        return data;
    }catch(e) {
        console.log(e);
    }

};