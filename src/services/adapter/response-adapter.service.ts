import { Account } from "../../models/account.model";
import { Comunity } from "../../models/comunity.model";

class ResponseAdapter {
    public adaptAccountKitUserForAccount(accountKitUserData: any): Account {
        return {
            id: accountKitUserData.id,
            phone: {
                number: accountKitUserData.phone.number,
                country_prefix: accountKitUserData.phone.country_prefix,
                national_number: accountKitUserData.phone.national_number
            }
        }
    }

    public adaptPhoneUserValidationResponse(rawResponse: any): any {
        return rawResponse;
    }

    public adaptUserForAccount(rawResponse: any): Account {
        const { user } = rawResponse;
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            profileImage: user.profileImage
        }
    }

    public adaptRecomendedComunitiesForComunities(rawResponse: any): Comunity[] {
        debugger;
        const rawComunities = rawResponse.communities;
        let comunities: Comunity[] = [];

        rawComunities.forEach((rawComunity: any) => {
            comunities.push({
                id: rawComunity.id,
                name: rawComunity.name,
                logo: rawComunity.logo,
                description: rawComunity.description,
                likeUserPhotos: rawComunity.userPhotos.map((userPhoto: any): string => userPhoto.profileImage)
            })
        });

        debugger
        return comunities;
    }
}

export const responseAdapter = new ResponseAdapter();