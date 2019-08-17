import { Account } from "../../models/account.model";
import { Comunity } from "../../models/comunity.model";
import { Promotion } from "../../models/promotion.model";

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
        const comunities: Comunity[] = [];

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

    public adaptPromotionsForPromotions(rawResponse: any): Promotion[] {
        const promotions: Promotion[] = [];
        const rawPromotions = rawResponse.AnunciosLista;

        rawPromotions.forEach((rawPromotion: any) => {
            promotions.push({
                id: rawPromotion.id,
                description: rawPromotion.text,
                name: rawPromotion.title,
                imagePath: rawPromotion.image
            });
        });

        return promotions;
    }
}

export const responseAdapter = new ResponseAdapter();