import { Button } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet'


const Logout = () => {

    const history = useHistory();

    if (!(localStorage.getItem("access"))) {
        history.push("/login");
    };
    const logoutMe = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("u_name");
        history.push("/login")
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
