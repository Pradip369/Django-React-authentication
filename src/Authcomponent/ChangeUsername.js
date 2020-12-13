import { Button, LinearProgress, Snackbar, TextField } from '@material-ui/core'
import Axios from 'axios';
import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ALert, useStyles } from "./Utility";
import { Authcontext } from '../context_api(redux)/create_context/authcontext';
import { Link } from 'react-router-dom';
import { CHANGE_USERNAME } from './Axios_auth';
import { Helmet } from 'react-helmet'


const ChangeUsername = () => {

    const classes = useStyles();
    const [ivalue, setValue] = useState({});
    const { state, } = useContext(Authcontext);
    const [error, setError] = useState({});
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = React.useState({ act: false, msg: "" });
    const history = useHistory();

    const onChange = (e) => {
        setError({})
        setValue({
            ...ivalue,
            [e.target.name]: e.target.value,
        });
    };

    const changeUsernameClick = (e) => {
        e.preventDefault();
        setLoader(true);
        const access_token = localStorage.getItem('access');
        const config = {
            headers: {
                'Authorization': `JWT ${access_token}`
            }
        };
        Axios.post(CHANGE_USERNAME, {
            new_username: ivalue.username,
            current_password: ivalue.password,
        }, config)
            .then((res) => {
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

            });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <Fragment>

            <Helmet>
                <title>Change Username</title>
            </Helmet>

            { !localStorage.getItem('access') && history.push('/login')}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="changeUsername_form">
                            <h4>Change Username</h4>
                            <hr />
                            {state.uDetail.user_name && <small>Current Username : {state.uDetail.user_name}</small>}

                            <form
                                method="POST"
                                className={classes.root}
                                onSubmit={changeUsernameClick}
                                noValidate
                            >
                                <TextField
                                    label="New Username"
                                    placeholder="Enter New Username"
                                    name="username"
                                    onChange={onChange}
                                    value={ivalue.username}
                                    error={error?.new_username && true}
                                    id="outlined-size-small"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    className={classes.margin}
                                />
                                <TextField
                                    label="Current Password"
                                    placeholder="Enter Current password"
                                    name="password"
                                    onChange={onChange}
                                    value={ivalue.password}
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
                                    disabled={!ivalue.username || !(ivalue.password?.length > 8) || loader}
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
                        {error?.current_password && <small>Password : {error.current_password}<br /></small>}
                        {error?.new_username && <small>Username : {error.new_username}</small>}
                        {open.msg === 'success' && <small>Username successfully changed...</small>}
                    </ALert>
                </Snackbar>
            </div>


        </Fragment>
    )
}

export default ChangeUsername;
