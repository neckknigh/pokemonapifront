import { Account } from "../../models/account.model";

class RequestAdapter {

    public getBodyDataForSaveFacebookUser(
        facebookUser: Account
    ): string {
        const {
            email,
            id,
            lastName,
            name,
            gender,
            birthday,
            profileImage
        } = facebookUser;
        const body = {
            user: {
                email,
                name,
                lastName,
                userName: this.buildDooUserName(
                    id,
                    name,
                    lastName
                ),
                facebookId: id,
                profileImage,
                birth: birthday,
                sex: gender
            }
        };

        return JSON.stringify(body);
    }

    public getBodyDataForPhoneUserValidation(
        user: Account
    ): string {
        const { phone } = user;
        const body = {
            user: {
                //phone: phone!.number + "23"
                phone: phone!.number
            }
        }

        return JSON.stringify(body);
    }

    public getBodyDataForUserRegistration(userData: any, accountKitData: Account): string {
        const { phone } = accountKitData;
        const body: any = {
            user: {
                // TODO: quitar el valor de new date
                //phone: phone!.number + new Date().getMilliseconds(),
                phone: phone!.number,
                userName: userData.userName,
                email: userData.email,
                country: phone!.country_prefix,
                city: ""
            }
        }
        return JSON.stringify(body);
    }

    /**
     * Permite obtener el body necesario para el servicio
     * de consulta de comunidades recomendadas.
     * TODO: Servicio pendiente de finalizar.
     */
    public getBodyForRecomendedComunities(): string {
        const dummyBody = {
            userGPS: "4.715596, -74.037143",
            city: "Bogota",
            country: "Colombia",
            radius: 900
        }

        return JSON.stringify(dummyBody);
    }

    /**
     * Permite obtener el detalle de una comunidad por su id.
     * @param {String} communityId id de la comunidad a consultar
     */
    public getBodyForLoadComunity(communityId: string): string {
        const body = {
            communityId
        }

        return JSON.stringify(body);
    }

    public getBodyForLoadPopularComunities(): string {
        const body = {
            userGPS: "4.715596, -74.037143",
            city: "Bogotá"
        }

        return JSON.stringify(body);
    }

    /**
     * Permite obtener el body necesario para el servicio
     * de consulta de promociones.
     * TODO: Servicio pendiente de finalizar.
     */
    public getBodyForPromotions(): string {
        const dummyBody = {
            communityId: 120,
            type: "2",
            city: "Bogota",
            country: "Colombia"
        }

        return JSON.stringify(dummyBody);
    }

    /**
     * Permite obtener el body para la petición
     * que obtiene la información del usuario 
     * apartir de su ID.
     * @param userId {string} id del usuario
     */
    public getBodyForUserById(userId: string): string {
        const body: any = {
            userId
        }

        return JSON.stringify(body);
    }

    /**
     * Permite construir el username que utilizará
     * el usuario logueado por facebook
     * @param {string} id de facebook 
     * @param {string} firstName primer nombre de facebook 
     * @param {string} lastName segundo nombre de facebook
     * 
     * @return {string} el username del usuario en Doo. 
     */
    private buildDooUserName(
        id: string,
        firstName: string = "",
        lastName: string = ""
    ): string {
        let dooUserName: string = [
            this.removeWhiteSpaces(firstName),
            this.removeWhiteSpaces(lastName),
            id.substring(id.length - 5)
        ].join("");

        return dooUserName;
    }

    private removeWhiteSpaces(phrase: string) {
        let cleanPhrase: string = "";
        if (phrase) {
            cleanPhrase = phrase.replace(/ /g, '');
        }

        return cleanPhrase;
    }

}

export const requestAdapter = new RequestAdapter();