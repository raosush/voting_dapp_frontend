import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './Home'
import PageNotFound from './PageNotFound'
import AuthRouter from "./auth/AuthRouter";
import ElectionRouter from "./elections/ElectionRouter";

const Routes = () => {
    return (
        <Switch>
            <Route path="/auth">
                <AuthRouter/>
            </Route>
            <Route path="/elections">
                <ElectionRouter />
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
