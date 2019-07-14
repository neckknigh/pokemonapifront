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

    constructor(
        id: string,
        phone: IAccountPhone,
        name: string = "",
        lastName: string = "",
        email: string = ""
    ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }
}