import { Button, LinearProgress, Snackbar, TextField } from '@material-ui/core'
import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { ALert } from './Utility';
import { RESEND_ACTIVATION_URL } from './Axios_auth';
import Alert from '@material-ui/lab/Alert';
import { Helmet } from 'react-helmet';


const ResendActivation = () => {

    const [ivalue, setIvalue] = useState({})
    const [error, setError] = useState()
    const [loader, setLoader] = useState(false)
    const [open, setOpen] = React.useState({ act: false, msg: "" });

    const sendClick = (e) => {

        if (localStorage.getItem('auth_id')) {
            alert("Your account already activated!!")
        }

        e.preventDefault();
        setLoader(true)
        axios.post(RESEND_ACTIVATION_URL, { email: ivalue.email })
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
                <title>Resend Activation Link</title>
            </Helmet>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-8 offset-md-2'>
                        <div className='resendEmail_form'>
                            <h4>Almost Done...</h4>
                            <Alert className='m-4 border' severity="success">{localStorage.getItem("u_name") && <span>Hello <b>{localStorage.getItem("u_name")}</b>, </span>}We've sent an email to {localStorage.getItem("u_email") ? <span><b>{localStorage.getItem("u_email")}</b></span> : <span>your registered email</span>}. Open it up to activate your account.</Alert>
                            <hr />
                            <TextField
                                label="Resend Activation E-mail"
                                placeholder="Enter Email"
                                name="email"
                                onChange={onChange}
                                value={ivalue.email}
                                error={(ivalue.email?.search('@')) === -1 || (error && true)}
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                            />
                            <Button className='ml-2' disabled={open.msg === "success" || (ivalue.email?.search('@')) === -1 || !ivalue.email || loader} onClick={sendClick} variant="contained" color="primary">
                                Send
                            </Button>
                            <br />
                            {error?.email ? <small className='text-danger'>{error.email}</small> : <small className='text-danger'>{error}</small>}
                            {(ivalue.email?.search('@')) === -1 && <small className='mb-2' style={{ color: 'red' }}>• Invalid Email(Email must contain '@')</small>}
                            {open.msg === "success" && <small className='text-success'>Account activation link successfully sent..</small>}

                        </div>
                        {loader && <LinearProgress color="secondary" />}
                        {loader && <LinearProgress color="secondary" />}
                    </div>
                </div>

                <Snackbar open={open.act} autoHideDuration={open.msg === "success" ? 20000 : 8000} onClose={handleClose}>
                    <ALert onClose={handleClose} severity={open.msg}>
                        {error?.email ? <small>{error.email}</small> : <small>{error}</small>}
                        {open.msg === "success" && 'Account activation link successfully sent..'}
                    </ALert>
                </Snackbar>

            </div>
        </Fragment>
    )
}

export default ResendActivation
