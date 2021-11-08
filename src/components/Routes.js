import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './Home'
import PageNotFound from './PageNotFound'
import AuthRouter from "./auth/AuthRouter";

const Routes = () => {
    return (
        <Switch>
            <Route path="/auth">
                <AuthRouter/>
            </Route>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route>
                <PageNotFound/>
            </Route>
        </Switch>
    );
};

export default Routes;
