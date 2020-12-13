import React, { useContext, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Button, LinearProgress, Snackbar } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom'
import { useState } from "react";
import axios from 'axios';
import { Authcontext } from "../context_api(redux)/create_context/authcontext";
import { REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS } from "../context_api(redux)/type/authType";
import { ALert, useStyles } from "./Utility";
import { REGISTER_URL } from "./Axios_auth";
import { Helmet } from 'react-helmet';


const ValidationTextField = withStyles({
    root: {
        "& input:valid + fieldset": {
            borderColor: "green",
            borderWidth: 2,
        },
        "& input:invalid + fieldset": {
            borderColor: "#6b6b6b",
            borderWidth: 2,
        },
        "& input:valid:focus + fieldset": {
            borderLeftWidth: 6,
            padding: "4px !important",
        },
    },
})(TextField);


const Register = () => {
    const classes = useStyles();
    const [ivalue, setValue] = useState({});
    const { state, dispatch } = useContext(Authcontext);
    const [error, setError] = useState({});
    const [open, setOpen] = React.useState({ act: false, msg: "" });
    const history = useHistory()

    const onChange = (e) => {
        setError({})
        setValue({
            ...ivalue,
            [e.target.name]: e.target.value
        })
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const submitData = (e) => {
        e.preventDefault();
        setError({})
        const user_data = {
            username: ivalue.username,
            email: ivalue.email,
            password: ivalue.password,
            re_password: ivalue.re_password
        }
        dispatch({ type: REGISTER_LOADING })

        axios.post(REGISTER_URL, user_data)
            .then(res => {

                setOpen({ act: true, msg: "success" })

                setValue({ password: "", re_password: "" })

                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res
                });


                localStorage.setItem("u_name", res.data.username);
                localStorage.setItem("u_email", res.data.email);

                const Timerepeat = () => {
                    localStorage.removeItem("u_name");
                    localStorage.removeItem("u_email");
                }
                setTimeout(Timerepeat, 1728000);

                history.push('/resend_activation_link')

            })
            .catch(err => {
                setOpen({ act: true, msg: "error" });
                setError(err.response.data);

                dispatch({
                    type: REGISTER_ERROR,
                    payload: err.response.data
                })
            })
    }

    return (
        <Fragment>

            <Helmet>
                <title>Register</title>
            </Helmet>

            { localStorage.getItem('access') && history.push('/')}

            <div className="container-fluid">
                <br />
                <div className="row">

                    <div className="col-md-4 offset-md-4">

                        <div className="register__form">
                            <h3>Register</h3>
                            <hr />
                            <form method='POST' onSubmit={submitData} className={classes.root} noValidate>
                                <ValidationTextField
                                    name="username"
                                    placeholder='Enter Username'
                                    error={error.username && true}
                                    helperText={error.username && error.username}
                                    value={ivalue.username}
                                    onChange={onChange}
                                    className={classes.margin}
                                    label="Username"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    id="validation-outlined-input"
                                    size="small"
                                />

                                <ValidationTextField
                                    name="email"
                                    placeholder='example@domain.com'
                                    error={(ivalue.email?.search('@')) === -1 || (error.email && true)}
                                    helperText={error?.email && error.email}
                                    onChange={onChange}
                                    className={classes.margin}
                                    value={ivalue.email}
                                    fullWidth
                                    label="Email"
                                    required
                                    variant="outlined"
                                    id="validation-outlined-input"
                                    type="email"
                                    size="small"
                                />
                                {(ivalue.email?.search('@')) === -1 && <small className='mb-2' style={{ color: 'red' }}>• Invalid Email(Email must contain '@')</small>}
                                <ValidationTextField
                                    name="password"
                                    error={(ivalue.password?.length) < 8 || (error.password && true)}
                                    helperText={error.password && `${error.password} (Format : Example@123)`}
                                    onChange={onChange}
                                    placeholder='Format : Example@123'
                                    className={classes.margin}
                                    value={ivalue.password}
                                    fullWidth
                                    label="Password"
                                    required
                                    variant="outlined"
                                    id="validation-outlined-input"
                                    type="password"
                                    size="small"
                                />
                                {(ivalue.password?.length) < 8 && <small className='pb-2' style={{ color: 'red' }}>• Password must be greater than 8 character..</small>}
                                <ValidationTextField
                                    name="re_password"
                                    error={(ivalue.re_password?.length) < 8}
                                    onChange={onChange}
                                    className={classes.margin}
                                    value={ivalue.re_password}
                                    label="Confirm Password"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    id="validation-outlined-input"
                                    type="password"
                                    size="small"
                                    placeholder='Enter above password'
                                />
                                {(ivalue.password !== ivalue.re_password) && <small className='pb-2' style={{ color: 'red' }}>• Confirm password must same as above!!</small>}
                                <Button disabled={state.auth.loader || (ivalue.email?.search('@')) === -1 || (ivalue.password?.length < 8) || !ivalue.username || !ivalue.email || !ivalue.password || !ivalue.re_password || (ivalue.password !== ivalue.re_password)} type='submit' variant="contained" fullWidth color="primary">
                                    Submit
                                </Button>
                            </form>

                        </div>
                        {state.auth.loader && <LinearProgress color="secondary" />}
                        {state.auth.loader && <LinearProgress color="secondary" />}

                        <div className='register__already'>
                            Already have an account? <Link exact to="/login"> Login</Link>
                        </div><br /><br />
                    </div>

                </div>
                <Snackbar open={open.act} autoHideDuration={5000} onClose={handleClose}>
                    <ALert onClose={handleClose} severity={open.msg}>
                        {error?.email && <small>{error.email}</small>}
                        {error?.username && <small>{error.username}</small>}
                        {error?.password && <small>{error.password}</small>}
                        {error?.re_password && <small>{error.re_password}</small>}
                        {open.msg === "success" && 'Account activation link successfully sent..'}
                    </ALert>
                </Snackbar>
            </div>
        </Fragment>
    );
};

export default Register;
