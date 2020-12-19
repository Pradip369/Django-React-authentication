import { Button } from '@material-ui/core'
import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet';
import { HardLogout } from '../appcomponent/Isauthenticated'


const Logout = () => {

    const logoutMe = () => {

        HardLogout();

    }

    return (
        <Fragment>
            <Helmet>
                <title>Logout</title>
            </Helmet>

            <div className="container-fluid">
                <h3 className='m-3'>Are you sure you want to logout?</h3>
                <Button variant="contained" color="secondary" onClick={logoutMe}>Yes, Logout</Button>
            </div>
        </Fragment>
    )
}

export default Logout
