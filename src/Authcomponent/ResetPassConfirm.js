import React, { Fragment, useState } from 'react'
import { ALert, useStyles } from './Utility';
import { useHistory, useParams } from 'react-router-dom';
import { Button, LinearProgress, Snackbar, TextField } from '@material-ui/core';
import Axios from 'axios';
import { RESET_PASSWORD_CONFIRM_URL } from './Axios_auth';
import { Helmet } from 'react-helmet'


const ResetPassConfirm = () => {

    const classes = useStyles();
    const [ivalue, setValue] = useState({});
    const [error, setError] = useState({});
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = React.useState({ act: false, msg: "" });
    const history = useHistory();
    const { uid, token } = useParams();


    const onChange = (e) => {
        setError({})
        setValue({
            ...ivalue,
            [e.target.name]: e.target.value,
        });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const resetPasswordClick = (e) => {
        e.preventDefault();
        setLoader(true);

        Axios.post(RESET_PASSWORD_CONFIRM_URL, {
            uid: uid,
            token: token,
            new_password: ivalue.new_password,
            re_new_password: ivalue.re_new_password,
        })
            .then((res) => {
                setLoader(false);
                setOpen({ act: true, msg: "success" });

                const Redirect = () => {
                    history.push("/login");
                }
                setTimeout(Redirect, 2000);

            })
            .catch((err) => {
                setLoader(false);
                console.log(err.response.data)
                setOpen({ act: true, msg: "error" });
                setError(err.response.data);
            });
    };


    return (
        <Fragment>

            <Helmet>
                <title>Reset Password Conform</title>
            </Helmet>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="resetPassword_form">
                            <h4>Reset Password</h4>
                            <hr />

                            <form
                                method="POST"
                                className={classes.root}
                                onSubmit={resetPasswordClick}
                                noValidate
                            >
                                <TextField
                                    label="New Password"
                                    name="new_password"
                                    onChange={onChange}
                                    value={ivalue.new_password}
                                    error={error?.new_password && true}
                                    id="outlined-size-small"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    placeholder='Format : Example@123'
                                    type="password"
                                    className={classes.margin}
                                />
                                {ivalue.new_password?.length < 8 && <small className='pb-2' style={{ color: 'red' }}> • Password must be greater than 8 character..</small>}
                                <TextField
                                    label="Confirm New Password"
                                    placeholder="Enter Above Password"
                                    name="re_new_password"
                                    onChange={onChange}
                                    value={ivalue.re_new_password}
                                    error={error?.re_new_password && true}
                                    id="outlined-size-small"
                                    variant="outlined"
                                    size="small"
                                    type="password"
                                    fullWidth
                                    helperText={ivalue.re_new_password !== ivalue.new_password && <small className='pb-2' style={{ color: 'red' }}>• Confirm password must same as above!!</small>}
                                    required
                                    className={classes.margin}
                                />
                                <Button
                                    className="ml-2"
                                    disabled={!ivalue.new_password || !(ivalue.new_password?.length > 8) || ivalue.re_new_password !== ivalue.new_password || loader}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                        {loader && <LinearProgress color="secondary" />}
                        {loader && <LinearProgress color="secondary" />}
                    </div>
                </div>
                <Snackbar open={open.act} autoHideDuration={9000} onClose={handleClose}>
                    <ALert onClose={handleClose} severity={open.msg}>
                        {error?.new_password && <small>New Password : {error.new_password}(Format : Example@123)<br /></small>}
                        {error?.re_new_password && <small>Confirm Username : {error.re_new_password}<br /></small>}
                        {error?.uid && 'This password reset link is invalid or expired!!'}
                        {error?.token && 'This password reset link is invalid or expired!!'}
                        {open.msg === 'success' && <small>Password successfully changed...</small>}
                    </ALert>
                </Snackbar>
            </div>


        </Fragment>
    )
}

export default ResetPassConfirm
