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
                <Route path={`${match.path}/login`}>
                    <Login />
                </Route>
                <Route path={`${match.path}/totpAuth`}>
                    <TOTPAuth />
                </Route>
                <Route path={`${match.path}/addDevice`}>
                    <AddDevice />
                </Route>
                <Route path={`${match.path}/logout`}>
                    <Logout />
                </Route>
                <Route path={`${match.path}/profile`}>
                    <Profile new={false} />
                </Route>
            </Switch>
        </Router>
    )
}

export default AuthRouter;
