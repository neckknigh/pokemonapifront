class RequestAdapter {


    getBodyDataForSaveFacebookUser(
        facebookUserData: any
    ): string {
        const {
            email,
            id,
            last_name,
            first_name,
            gender,
            birthday
        } = facebookUserData;
        let body = {
            user: {
                email,
                name: first_name,
                lastName: last_name,
                userName: this.buildDooUserName(
                    id,
                    first_name,
                    last_name
                ),
                facebookId: id,
                profileImage: facebookUserData.picture.data.url,
                birth: birthday,
                sex: gender
            }
        };

        return JSON.stringify(body);
    }

    private buildDooUserName(
        id: string,
        firstName: string = "",
        lastName: string = ""
    ): string {
        let dooUserName: string = [
            this.removeWhiteSpaces(firstName),
            this.removeWhiteSpaces(lastName),
            id.substring(0, 5)
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