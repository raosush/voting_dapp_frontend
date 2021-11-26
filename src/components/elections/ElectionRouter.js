import React from "react";

import {
    HashRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import Campaign from "./Campaign";
import ElectionCandidates from "./ElectionCandidates";
import Elections from "./Elections";
import AddCampaign from "./AddCampaign";
import MyNominations from "./MyNominations";

const ElectionRouter = () => {
    let match = useRouteMatch();
    return(
        <Router>
            <Switch>
                <Route path={`${match.path}/campaigns/addCampaign`} component={AddCampaign} />
                <Route path={`${match.path}/campaigns/:nominationId`} component={Campaign} />
                <Route path={`${match.path}/myNominations`} component={MyNominations} />
                <Route path={`${match.path}/:id`} component={ElectionCandidates} />
                <Route path={`${match.path}/`} component={Elections} />
            </Switch>
        </Router>
    )
}

export default ElectionRouter;
