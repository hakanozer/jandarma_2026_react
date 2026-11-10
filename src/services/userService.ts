import type { UserModel } from "../models/userModel";
import config from "./config";

export const userLogin = (email:string, password:string) => {
    const sendData = { email, password }
    return config.post<UserModel>("auth/login", sendData)
}

export const profileMe = () => {
    return config.get("profile/me")
}


