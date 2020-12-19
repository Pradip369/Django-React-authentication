import { Button, LinearProgress, Snackbar, TextField } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { ALert, useStyles } from './Utility';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom'
import { CHANGE_PASSWORD } from './Axios_auth';
import { Helmet } from 'react-helmet'
import { CheckAuthLocaly, HardLogout } from '../appcomponent/Isauthenticated';



const ChangePassword = () => {

    const classes = useStyles();
    const [ivalue, setValue] = useState({});
    const [error, setError] = useState({});
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = React.useState({ act: false, msg: "" });
    const history = useHistory();

    CheckAuthLocaly()

    const onChange = (e) => {
        setError({})
        setValue({
            ...ivalue,
            [e.target.name]: e.target.value,
        });
    };

    const handleClose = (_, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const changePasswordClick = (e) => {
        e.preventDefault();
        setLoader(true);

        Axios.post(CHANGE_PASSWORD, {
            new_password: ivalue.new_password,
            re_new_password: ivalue.re_new_password,
            current_password: ivalue.current_password,

        })
            .then(() => {
                setLoader(false);
                setOpen({ act: true, msg: "success" });

                const Redirect = () => {
                    history.push("/my_profile");
                }
                setTimeout(Redirect, 1800);

            })
            .catch((err) => {
                setLoader(false);
                setOpen({ act: true, msg: "error" });
                setError(err.response.data);

                if (err.response.status === 401) {
                    HardLogout();
                }

            });
    };

    return (
        <Fragment>

            <Helmet>
                <title>Change Password</title>
            </Helmet>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="changepassword_form">
                            <h4>Change Password</h4>
                            <hr />

                            <form
                                method="POST"
                                className={classes.root}
                                onSubmit={changePasswordClick}
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
                                <TextField
                                    label="Current Password"
                                    placeholder="Enter Current Password"
                                    name="current_password"
                                    onChange={onChange}
                                    value={ivalue.current_password}
                                    error={error?.current_password && true}
                                    id="outlined-size-small"
                                    variant="outlined"
                                    size="small"
                                    type="password"
                                    fullWidth
                                    required
                                    className={classes.margin}
                                />
                                <p className="ml-auto">
                                    <Link to="/reset_password">Forgot Current Password?</Link>
                                </p>
                                <Button
                                    className="ml-2"
                                    disabled={!ivalue.new_password || !ivalue.current_password || !(ivalue.new_password?.length > 8) || ivalue.re_new_password !== ivalue.new_password || loader}
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
                        {error?.new_password && <small>New Password : {error.new_password}<br /></small>}
                        {error?.re_new_password && <small>Confirm Username : {error.re_new_password}<br /></small>}
                        {error?.current_password && <small>Current Password : {error.current_password}</small>}
                        {open.msg === 'success' && <small>Password successfully changed...</small>}
                    </ALert>
                </Snackbar>
            </div>


        </Fragment>
    )
}

export default ChangePassword;
