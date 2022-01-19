import { User } from "types/User";

export const setToken = (token: string) => {
    if (!token) throw new Error("No token provided");
    if (window === undefined)
        throw new Error("You must be in client side to set token");
    window.localStorage.setItem("token", token);
};

export const getToken = () => {
    if (window === undefined)
        throw new Error("You must be in client side to get the token");
    const token = window.localStorage.getItem("token");
    if (token === null)
        throw new Error("You must be logged in to perform this operation");

    return token;
};

export const removeToken = () => {
    if (window === undefined)
        throw new Error("You must be in client side to remove the token");
    window.localStorage.removeItem("token");
};

export const mapUser = (user?: User): User => {
    return {
        id: user?.id || "",
        username: user?.username || "",
        email: user?.email || "",
        admin: user?.admin || false
    };
};
