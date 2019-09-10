import { Account } from "../../models/account.model";
import { Comunity } from "../../models/comunity.model";
import { Promotion } from "../../models/promotion.model";
import { utilService } from "../util.service";
import { ConfigProvider as CP } from "../config/config.service";

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
        let account: Account | null = null;

        if (utilService.isDefined(user)) {
            account = {
                id: user.id,
                email: user.email,
                name: user.name,
                lastName: user.lastName,
                profileImage: user.profileImage
            };
        }

        return account!;
    }

    public adaptRecomendedComunitiesForComunities(rawResponse: any): Comunity[] {
        //debugger;
        const rawComunities = rawResponse.communities;
        const comunities: Comunity[] = [];

        rawComunities.forEach((rawComunity: any) => {
            comunities.push(this.adaptComunity(rawComunity));
        });

        //debugger
        return comunities;
    }

    private adaptUserPhotosForUserLikesPhotos(userPhotos: any[]): string[] {
        //debugger;
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
            logo: `${CP.get(CP.COMUNITY_LOGOS_URL)}${rawCommunity.logo}`,
            description: rawCommunity.description,
            likeUserPhotos: this.adaptUserPhotosForUserLikesPhotos(rawCommunity.userPhotos),
            category: rawCommunity.category,
            averageScore: rawCommunity.averageScore
        }
    }

    public adaptPopularComunitiesForComunities(rawResponse: any): Comunity[] {
        const { categories }: { categories: any[] } = rawResponse;

        return categories.map((rawComunity) => {
            return {
                id: rawComunity.id,
                name: rawComunity.name,
                logo: `${CP.get(CP.COMUNITY_LOGOS_URL)}${rawComunity.img}`
            };
        });
    }

    public adaptSaveFacebookuser(facebookUser: Account, response: any): any {
        return Object.assign(
            {},
            response,
            {
                user: facebookUser
            }
        );
    }

    public adaptFacebookUserForAccount(rawFacebookData: any): Account {
        const {
            picture,
            email,
            first_name,
            id,
            last_name
        } = rawFacebookData;

        return {
            email,
            name: first_name,
            id,
            lastName: last_name,
            profileImage: utilService.isDefined(picture) ? picture.data.url : ""
        };
    }

}

export const responseAdapter = new ResponseAdapter();