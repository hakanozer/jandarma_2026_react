import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string | null) => {
    let status = true;
    try {
        if (token) {

            // JWT formatını ve payload bilgisini çöz
            const decoded = jwtDecode(token);

            const currentTime = (Date.now() / 1000); // 300 fazla sistem saati ekledik

            // Token henüz geçerli değilse
            if (decoded.nbf && currentTime < decoded.nbf) {
                status = false;
            }

            // Token süresi dolmuşsa
            if (!decoded.exp || currentTime >= decoded.exp) {
                status = false;
            }
        }else {
            status = false;
        }
    } catch (error) {
        status = false;
    }

    if (!status) {
        localStorage.removeItem('access_token')
    }
    return status;
};