import React, { Fragment, useContext, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { AFTER_LOGIN } from '../context_api(redux)/type/authType';
import { Authcontext } from '../context_api(redux)/create_context/authcontext';
import { USER_DETAIL } from './Axios_auth';
import { Helmet } from 'react-helmet';


const MyProfile = () => {


    const history = useHistory();
    const { state, dispatch } = useContext(Authcontext);

    useEffect(() => {
        const auth_check = () => {
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
                        history.push('/login')
                    });
            }
            else {
                history.push('/login')
            };
        };
        auth_check();
    }, []);

    return (
        <Fragment>

            <Helmet>
                <title>My Profile</title>
            </Helmet>

            { !(localStorage.getItem('access')) && history.push('/login')}

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-8 offset-md-2'>
                        <div className='myProfile__layout'>
                            <h3>My Profile</h3><hr />
                            <h5>Username : <small>{state.uDetail.user_name}</small></h5>
                            <h5>Email ID : <small>{state.uDetail.user_email}</small></h5>
                            <h5>User ID : <small>{state.uDetail.id}</small></h5>

                            <NavLink style={{ textDecoration: 'none', color: 'Green' }} to="/change_username" exact>
                                <Button variant="outlined" color="secondary">
                                    Change Username
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}

export default MyProfile
