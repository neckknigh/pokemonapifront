interface IAccountPhone {
    number: number,
    country_prefix: string,
    national_number: string
}

export class Account {
    id: string;
    name?: string;
    lastName?: string;
    email?: string;
    phone?: IAccountPhone;
    profileImage?: string;
    gender?: string;
    birthday?: string;

    constructor(
        id: string,
        phone: IAccountPhone,
        name: string = "",
        lastName: string = "",
        email: string = "",
        gender: string = "",
        birthday: string = ""
    ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.birthday = birthday;
    }
}