import React from "react";

import {
    HashRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import ElectionCandidates from "./ElectionCandidates";
import Elections from "./Elections";

const ElectionRouter = () => {
    let match = useRouteMatch();
    return(
        <Router>
            <Switch>
                <Route path={`${match.path}/:id`} component={ElectionCandidates} />
                <Route path={`${match.path}/`} component={Elections} />
            </Switch>
        </Router>
    )
}

export default ElectionRouter;
