import axios from "axios";
import { SERVER_URL } from "./config";

const baseUrl = `${SERVER_URL}/api/auth`;

const authLogin = async ({ username, password }) => {
    try {
        const auth = await axios.post(baseUrl + "/token", { "username": username, "password": password });
        return auth.data;
    } catch (e) {
        if (e.response) {
            if (e.response.data.messages && e.response.data.messages[0].message) {
                return e.response.data.messages[0].message;
            }
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

const totpAuth = async({ totp }) => {
    try {
        const auth = await axios.post(baseUrl + "/totp/login/" + totp, {}, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
        return auth.data;
    } catch (e) {
        if (e.response) {
            if (e.response.data.messages && e.response.data.messages[0].message) {
                return e.response.data.messages[0].message;
            }
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

const fetchTotpUrl = async() => {
    try {
        const url = await axios.get(baseUrl + "/totp/create", { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
        return url.data;
    } catch (e) {
        if (e.response) {
            if (e.response.data.messages && e.response.data.messages[0].message) {
                return e.response.data.messages[0].message;
            }
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

const fetchUser = async () => {
    try {
        const user = await axios.get(baseUrl + "/user", { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
        return user.data;
    } catch (e) {
        if (e.response) {
            if (e.response.data.messages && e.response.data.messages[0].message) {
                return e.response.data.messages[0].message;
            }
        }
        return "Encountered an exception! Please try again after sometime!"
    }
}

export { authLogin, totpAuth, fetchTotpUrl, fetchUser };
