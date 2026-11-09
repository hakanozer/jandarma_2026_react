import config from "./config";

export const userLogin = (email:string, password:string) => {
    const sendData = { email, password }
    return config.post("auth/login", sendData)
}


