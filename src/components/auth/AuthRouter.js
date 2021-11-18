import React from "react";

import {
    HashRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";

import Login from './Login'
import TOTPAuth from "./TOTPAuth";
import AddDevice from "./AddDevice";
import Logout from "./Logout";
import Profile from "./Profile";

const AuthRouter = () => {
    let match = useRouteMatch();
    return(
        <Router>
            <Switch>
                <Route path={`${match.path}/login`} component={Login} />
                <Route path={`${match.path}/totpAuth`} component={TOTPAuth} />
                <Route path={`${match.path}/addDevice`} component={AddDevice} />
                <Route path={`${match.path}/logout`} component={Logout} />
                <Route path={`${match.path}/profile`} new={false} component={Profile} />
            </Switch>
        </Router>
    )
}

export default AuthRouter;
