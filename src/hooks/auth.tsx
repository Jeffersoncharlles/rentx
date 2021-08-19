import React, {
    createContext,
    useState,
    useContext
} from "react";

interface User {
    id:string;
    email:string;
    name:string;
    driver_license: string;
    avatar: string;
}

interface AuthState {
    token: string;
    user: User;
}
