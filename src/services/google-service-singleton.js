import {GOOGLE_USER_INFO_URL} from "../constants";
import axios from 'axios';

export default class GoogleServiceSingleton {
    static getUserInfo = (access_token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        };
        return axios.get(GOOGLE_USER_INFO_URL, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}