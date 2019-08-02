import { Account } from "../../models/account.model";

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
        return rawResponse.data;
    }

    public adaptUserForAccount(rawResponse: any): Account {
        const { user } = rawResponse.data;
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            lastName: user.lastName
        }
    }
}

export const responseAdapter = new ResponseAdapter();