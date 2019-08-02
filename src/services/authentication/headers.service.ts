import { authService } from "./auth.service";
import { utilService } from "../util.service";

class HeadersService {

    public getHeaders(): any {
        // Se obtienen los headers de autenticación
        let authHeaders = authService.getAuthHeaders();

        const headers = utilService.merge(
            {
                "Content-Type": "application/json"
            },
            authHeaders
        );

        return headers;
    }
}

export const headersService = new HeadersService();