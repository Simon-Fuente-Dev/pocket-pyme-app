import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// REEMPLAZA ESTA IP por la que obtuviste en el paso anterior
const IP_COMPUTADORA = '172.26.89.232'; // pc de la pega

const axiosInstance = axios.create({
    baseURL: `http://${IP_COMPUTADORA}:8080/movil-api`,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000, // 10 segundos por si la red está lenta
});

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            // En React Native usamos SecureStore (es asíncrono)
            const token = await SecureStore.getItemAsync('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error leyendo el token", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;