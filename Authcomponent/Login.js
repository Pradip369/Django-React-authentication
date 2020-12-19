import { Button, LinearProgress, Snackbar, TextField } from "@material-ui/core";
import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ALert, useStyles } from "./Utility";
import { Link } from "react-router-dom";
import { Authcontext } from "../context_api(redux)/create_context/authcontext";
import {
    LOGIN_ERROR,
    LOGIN_SUCCESS,
} from "../context_api(redux)/type/authType";
import Alert from "@material-ui/lab/Alert";
import { LOGIN_URL } from "./Axios_auth";
import { Helmet } from 'react-helmet';

const Login = () => {
    const classes = useStyles();
    const [ivalue, setValue] = useState({});
    const { dispatch } = useContext(Authcontext);
    const [error, setError] = useState({});
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = React.useState({ act: false, msg: "" });
    const history = useHistory();

    const loginClick = (e) => {
        e.preventDefault();
        setLoader(true);

        axios.post(LOGIN_URL, {
            username: ivalue.username,
            password: ivalue.password,
        })
            .then(() => {
                setValue({ password: "" });
                localStorage.removeItem("u_name");
                localStorage.setItem('auth_id', '98989501&2568745549820@445455$7894412*45480025468')
                dispatch({
                    type: LOGIN_SUCCESS,
                });

                setLoader(false);
                history.push("/my_profile");
            })
            .catch((err) => {
                setLoader(false);
                setOpen({ act: true, msg: "error" });

                dispatch({
                    type: LOGIN_ERROR,
                });

                setError(err.response.data);

            });
    };

    const onChange = (e) => {
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

    if (localStorage.getItem("auth_id")) {
        history.push('/')
    }

    return (
        <Fragment>

            <Helmet>
                <title>Login</title>
            </Helmet>

            <div className="container-fluid">
                {localStorage.getItem("u_name") && <Alert className='m-2' variant="filled" severity="success">Welcome, <b>{localStorage.getItem("u_name")}</b> your account has been successfully Activated...Now you must login once for authentication purpose.</Alert>}
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="login_form">
                            <h4>Login</h4>
                            <hr />

                            <form
                                method="POST"
                                className={classes.root}
                                onSubmit={loginClick}
                                noValidate
                            >
                                {error?.detail && (
                                    <small className="mb-2 text-danger">
                                        <b>• Incorrect Username or Password!!</b>
                                    </small>
                                )}

                                <TextField
                                    label="Username"
                                    placeholder="Enter username"
                                    name="username"
                                    onChange={onChange}
                                    value={ivalue.username}
                                    error={error?.detail && true}
                                    id="outlined-size-small"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    required
                                    className={classes.margin}
                                />
                                <TextField
                                    label="Password"
                                    placeholder="Enter password"
                                    name="password"
                                    onChange={onChange}
                                    value={ivalue.password}
                                    error={error?.detail && true}
                                    id="outlined-size-small"
                                    variant="outlined"
                                    size="small"
                                    type="password"
                                    fullWidth
                                    required
                                    className={classes.margin}
                                />
                                <p className="ml-auto">
                                    <Link to="/reset_password">Forgot Password?</Link>
                                </p>
                                <Button
                                    className="ml-2"
                                    disabled={!ivalue.username || !(ivalue.password?.length > 8)}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </form>
                        </div>

                        {loader && <LinearProgress color="secondary" />}
                        {loader && <LinearProgress color="secondary" />}
                        <div className="login__createacc">
                            Create New Account?
                            <Link exact to="/register">
                                Register
                            </Link>
                        </div>
                        <br />
                        <br />
                    </div>
                </div>

                <Snackbar open={open.act} autoHideDuration={9000} onClose={handleClose}>
                    <ALert onClose={handleClose} severity={open.msg}>
                        {error?.detail && <small>{error.detail}</small>}
                        {error?.username && (
                            <small>
                                Username : {error.username}
                                <br />
                            </small>
                        )}
                        {error?.password && <small>Password : {error.password}</small>}
                    </ALert>
                </Snackbar>
            </div>
        </Fragment>
    );
};

export default Login;
