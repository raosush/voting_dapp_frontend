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
            </Switch>
        </Router>
    )
}

export default AuthRouter;
