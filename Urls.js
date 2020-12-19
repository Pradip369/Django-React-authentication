import React from 'react'
import { Route, Switch } from 'react-router-dom';
import ActivateAccount from './Authcomponent/ActivateAccount';
import ChangePassword from './Authcomponent/ChangePassword';
import ChangeUsername from './Authcomponent/ChangeUsername';
import Error from './Authcomponent/Error';
import Home from './appcomponent/Home';
import Login from './Authcomponent/Login';
import Logout from './Authcomponent/Logout';
import MyProfile from './Authcomponent/MyProfile';
import Register from './Authcomponent/Register';
import ResendActivation from './Authcomponent/ResendActivation';
import ResetPassConfirm from './Authcomponent/ResetPassConfirm';
import ResetPassword from './Authcomponent/ResetPassword';
import Axios from 'axios';


Axios.defaults.withCredentials = true
Axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
Axios.defaults.xsrfCookieName = "csrftoken";

const Urls = () => {

    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />

                <Route exact path="/login" component={Login} />
                <Route path="/logout" component={Logout} />

                <Route path="/register" component={Register} />
                <Route path="/user_activation/:uid/:token" component={ActivateAccount} />
                <Route path="/resend_activation_link" component={ResendActivation} />

                <Route path="/reset_password" component={ResetPassword} />
                <Route path="/reset_password_confirm/:uid/:token" component={ResetPassConfirm} />

                <Route path="/change_password" component={ChangePassword} />

                <Route path="/change_username" component={ChangeUsername} />
                <Route path="/my_profile" component={MyProfile} />

                <Route component={Error} />
            </Switch>
        </div>
    )
}

export default Urls;
