import React, { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ArticleList from './ArticleList';
import { Authcontext } from '../context_api(redux)/create_context/authcontext';

const Home = () => {

    const { state, } = useContext(Authcontext);

    return (
        <Fragment>

            <Helmet>
                <title>Home Page</title>
            </Helmet>

            {!state.uDetail.isAuthenticated ?
                <div className='text-right m-2'>
                    <NavLink className='navbar__btn' to="/register" exact activeClassName="mylink">Register</NavLink>
                    <NavLink className='navbar__btn' to="/login" exact activeClassName="mylink">Login</NavLink>
                </div>
                :
                <div className='text-right m-2'>
                    <NavLink className='navbar__btn' to="/logout" exact activeClassName="mylink">Logout</NavLink>
                    <NavLink className='navbar__btn' to="/change_password" exact activeClassName="mylink">Change Password</NavLink>
                    <NavLink className='navbar__btn' to="/my_profile" exact activeClassName="mylink">My Profile</NavLink>
                </div>
            }

            <ArticleList />

        </Fragment>
    )
}

export default Home
