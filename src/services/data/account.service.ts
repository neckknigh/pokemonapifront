import { Account } from "../../models/account.model";

class AccountService {
    private account: Account;

    constructor() {
        // @ts-ignore
        this.account = null;
    }

    getAccount(): string {
        return "";
    }
}

export const accountService = new AccountService();