import React, { Fragment, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { AFTER_LOGIN } from '../context_api(redux)/type/authType';
import { Authcontext } from '../context_api(redux)/create_context/authcontext';
import { USER_DETAIL } from './Axios_auth';
import { Helmet } from 'react-helmet';
import { HardLogout } from '../appcomponent/Isauthenticated';

const MyProfile = () => {


    const { state, dispatch } = useContext(Authcontext);

    useEffect(() => {
        const auth_check = () => {

            axios.get(USER_DETAIL)
                .then((res) => {
                    dispatch({
                        type: AFTER_LOGIN,
                        payload: res.data
                    });
                })
                .catch(() => {
                    HardLogout();
                });

        };
        auth_check();
    }, [dispatch]);

    return (
        <Fragment>

            <Helmet>
                <title>My Profile</title>
            </Helmet>

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
