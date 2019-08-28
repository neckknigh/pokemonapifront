import { Account } from "../../models/account.model";
import { Comunity } from "../../models/comunity.model";
import { Promotion } from "../../models/promotion.model";
import { utilService } from "../util.service";

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
            comunities.push(this.adaptComunity(rawComunity));
        });

        debugger
        return comunities;
    }

    private adaptUserPhotosForUserLikesPhotos(userPhotos: any[]): string[] {
        debugger;
        return userPhotos.map((userPhoto: any): string => userPhoto.profileImage);
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

    public adaptComunity(rawResponse: any): Comunity {

        const rawCommunity = utilService.isDefined(rawResponse.community) ? rawResponse.community : rawResponse;
        return {
            id: rawCommunity.id,
            name: rawCommunity.name,
            logo: rawCommunity.logo,
            description: rawCommunity.description,
            likeUserPhotos: this.adaptUserPhotosForUserLikesPhotos(rawCommunity.userPhotos)
        }
    }
}

export const responseAdapter = new ResponseAdapter();