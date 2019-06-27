import { User } from "../models/user.model";

const login = (user: User) => {
    // TODO: Implementar lógica 

    localStorage.setItem("isLoggedIn", "true");

    return true;
}

// Se exporta la función del login
export const userService = {
    login
};