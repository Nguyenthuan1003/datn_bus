import { jwtDecode } from "jwt-decode";

export const getDecodedAccessToken = () => {
    const storedData = localStorage.getItem('token');
    if (storedData) {
        const  accessToken  = JSON.parse(storedData);
        if (accessToken) {
            return jwtDecode(accessToken);
        }
    }
    return null;
};