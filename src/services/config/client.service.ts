import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { systemActions } from "../../redux/action-creators/system.action.creator";
import appStore from "../../redux/app-store";

class ClientHttpService {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create();

        // Se interceptan las peticiones para poner una máscara
        this.interceptRequest();

        // Se interceptan las respuestas para remover la máscara
        this.interceptResponse();

    }

    /**
     * Permite interceptar las peticiones http realizadas.
     * Esto con le objetivo de adicionar una máscara de carga.
     */
    private interceptRequest() {
        this.axiosClient.interceptors.request.use(
            (config: AxiosRequestConfig): AxiosRequestConfig => {
                appStore.dispatch(systemActions.showLoadingScreen());
                return config;
            },
            (error: any) => {
                appStore.dispatch(systemActions.showLoadingScreen());
                console.log("error: mostrando mascara");
                return Promise.reject(error);
            }
        );
    }

    /**
     * Permite interceptar las respuestas http obtenidas.
     * Esto con le objetivo de remover la máscara de carga.
     */
    private interceptResponse() {
        this.axiosClient.interceptors.response.use(
            (response: any) => {

                // se elimina cualquier mensaje de error existente
                appStore.dispatch(systemActions.handleAppError());

                // Se oculta la pantalla de carga
                appStore.dispatch(systemActions.hideLoadingScreen());
                return response;
            },
            (error: any) => {
                appStore.dispatch(systemActions.hideLoadingScreen());
                return Promise.reject(error);
            }
        );
    }

    get(resource: string) {
        return this.axiosClient.get(resource);
    }

    post(resource: string, body: string, headers: any = {}) {
        return this.axiosClient.post(
            resource,
            body,
            {
                headers
            }
        );
    }
}

export const clientService = new ClientHttpService();