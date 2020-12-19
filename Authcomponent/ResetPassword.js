import Axios from 'axios';
import React, { Fragment, useState } from 'react'
import { Button, LinearProgress, Snackbar, TextField } from '@material-ui/core';
import { ALert } from './Utility';
import { RESET_PASSWORD_URL } from './Axios_auth';
import Alert from '@material-ui/lab/Alert';
import { Helmet } from 'react-helmet'



const ResetPassword = () => {

    const [ivalue, setIvalue] = useState({})
    const [error, setError] = useState()
    const [loader, setLoader] = useState(false)
    const [open, setOpen] = React.useState({ act: false, msg: "" });



    const sendClick = (e) => {
        e.preventDefault();
        setLoader(true)
        Axios.post(RESET_PASSWORD_URL, { email: ivalue.email })
            .then(() => {
                setLoader(false);
                setOpen({ act: true, msg: "success" })
            })
            .catch(err => {
                setLoader(false);
                setError(err.response.data);
                setOpen({ act: true, msg: "error" });

            })
    }

    const onChange = (e) => {
        setError()
        setIvalue({
            ...ivalue,
            [e.target.name]: e.target.value
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Fragment>

            <Helmet>
                <title>Reset Password</title>
            </Helmet>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-8 offset-md-2'>
                        <div className='resetPassEmail_form'>
                            <h5>Enter email address for reset password</h5>
                            <hr />
                            {open.msg === 'success' && <Alert className='m-4' variant="filled" severity="success">Password reset link successfully sent to <b>{ivalue.email}</b>.Open it up to reset your password.</Alert>}
                            <TextField
                                label="E-mail"
                                placeholder="example@domain.com"
                                name="email"
                                onChange={onChange}
                                value={ivalue.email}
                                error={(ivalue.email?.search('@')) === -1 || (error && true)}
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                            />
                            <Button className='ml-2' disabled={(ivalue.email?.search('@')) === -1 || !ivalue.email || loader || open.msg === "success"} onClick={sendClick} variant="contained" color="primary">
                                Send
                            </Button>
                            <br />
                            {error?.email ? <small className='text-danger'>{error.email}</small> : <small className='text-danger'>{error}</small>}
                            {(ivalue.email?.search('@')) === -1 && <small className='mb-2' style={{ color: 'red' }}>• Invalid Email(Email must contain '@')</small>}
                            {open.msg === "success" && <small className='text-success'>Password reset link successfully sent..</small>}

                        </div>
                        {loader && <LinearProgress color="secondary" />}
                        {loader && <LinearProgress color="secondary" />}
                    </div>
                </div>

                <Snackbar open={open.act} autoHideDuration={open.msg === 'success' ? 25000 : 9000} onClose={handleClose}>
                    <ALert onClose={handleClose} severity={open.msg}>
                        {error?.email ? <small>{error.email}</small> : <small>{error}</small>}
                        {open.msg === "success" && 'Password reset link successfully sent..'}
                    </ALert>
                </Snackbar>

            </div>
        </Fragment>
    )
}

export default ResetPassword;
