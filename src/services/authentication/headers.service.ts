class HeadersService {

    public getHeaders(): any {
        const headers = {
            "Content-Type": "application/json",
            "Doouserid": "41",
            "Dooauth": "59d853l7ucoaz071ysqr2p2d4v398251mnbiw6djkefgh71tx"
        }

        return headers;
    }
}

export const headersService = new HeadersService();