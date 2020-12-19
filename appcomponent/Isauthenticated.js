import Axios from "axios";
import { LOGOUT_URL, USER_DETAIL } from '../Authcomponent/Axios_auth'
import { AFTER_LOGIN, LOGIN_ERROR } from '../context_api(redux)/type/authType';


export const IsAuthenticated = (dispatch) => {

    Axios.get(USER_DETAIL)
        .then((res) => {
            dispatch({
                type: AFTER_LOGIN,
                payload: res.data
            });
        })
        .catch(() => {

            dispatch({
                type: LOGIN_ERROR,
            });
        });
}

export const HardLogout = () => {

    Axios.post(LOGOUT_URL)
        .then(() => {
            localStorage.removeItem('auth_id')
            alert('✔✔You Logged out.....Login again!!!')
            window.location = 'http://localhost:3000/login';
        })
        .catch((err) => {
            alert(err)
        })
}

export const CheckAuthLocaly = () => {
    if (localStorage.getItem("auth_id")) return true
    else {
        HardLogout();
    }
}