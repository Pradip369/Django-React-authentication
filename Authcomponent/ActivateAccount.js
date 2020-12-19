import { Button, LinearProgress, Snackbar } from '@material-ui/core';
import Axios from 'axios';
import React, { Fragment, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';
import { ALert } from './Utility';
import { ACCOUNT_ACTIVATION_URL } from './Axios_auth'
import { Helmet } from 'react-helmet'



const ActivateAccount = () => {

    const { uid, token } = useParams();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState();
    const [open, setOpen] = React.useState({ act: false, msg: "" });
    const history = useHistory();

    const activeClick = (e) => {
        setLoader(true)
        Axios.post(ACCOUNT_ACTIVATION_URL, { uid: uid, token: token })
            .then(() => {
                setOpen({ act: true, msg: "success" })
                localStorage.removeItem('u_email')
                setLoader(false);
                history.push('/login')
            })
            .catch(err => {
                setLoader(false);
                setError(err.response.data);
                setOpen({ act: true, msg: "error" });

            })
    };

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    if (localStorage.getItem("auth_id")) {
        history.push('/')
    }

    return (
        <Fragment>

            <Helmet>
                <title>ActivateAccount</title>
            </Helmet>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-8 offset-md-2'>
                        <div className='activate_Account_form'>
                            <h4>Activate your account..</h4>
                            <hr />
                            {error?.uid && <Alert variant="outlined" severity="error"><b>Account veryfication failed : </b>This activation link is invalid or expired!!</Alert>}
                            {error?.token && <Alert variant="outlined" severity="error"><b>Account veryfication failed : </b>This activation link is invalid or expired!!</Alert>}
                            {error?.detail && <Alert variant="outlined" severity="error">This account is already activated!!</Alert>}<br />
                            <Button className='ml-2' disabled={loader} onClick={activeClick} variant="contained" color="primary">
                                Activate Now
                            </Button>

                            <Snackbar open={open.act} autoHideDuration={8000} onClose={handleClose}>
                                <ALert onClose={handleClose} severity={open.msg}>
                                    {error?.uid && <small>{error.uid}</small>}
                                    {error?.token && <small>{error.token}</small>}
                                    {error?.detail && <small>{error.detail}</small>}
                                    {open.msg === "success" && 'Account successfully activated..'}
                                </ALert>
                            </Snackbar>

                        </div>
                        {loader && <LinearProgress color="secondary" />}
                        {loader && <LinearProgress color="secondary" />}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ActivateAccount;
