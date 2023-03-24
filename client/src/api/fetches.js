import cookie from 'js-cookie';
import axios from 'axios';

const baseURL = 'http://localhost:3001';
let userCookie = cookie.get('zelp-cookie');

export const getUsers = () => {
    let user;
    axios.get(baseURL + '/api/users')
    .then(
        response => {
            for(let i = 0; i < response.data.length; i++) {
                if(response.data[i].randomString === userCookie) {
                    user = response.data[i];
                }
            }
        }
    );
    return user;
}