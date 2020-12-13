import Axios from "axios";
import { USER_DETAIL } from '../Authcomponent/Axios_auth'
import { AFTER_LOGIN, LOGIN_ERROR } from '../context_api(redux)/type/authType';

export const IsAuthenticated = (dispatch) => {

    if (localStorage.getItem('access')) {
        const access_token = localStorage.getItem('access');
        const config = {
            headers: {
                'Authorization': `JWT ${access_token}`
            }
        };
        Axios.get(USER_DETAIL, config)
            .then((res) => {
                dispatch({
                    type: AFTER_LOGIN,
                    payload: res.data
                });
            })
            .catch((err) => {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                dispatch({
                    type: LOGIN_ERROR,
                });
            });
    }
    else {
        localStorage.removeItem('refresh');
    }
}