import { Component } from "react";
import { fetchMyNominations } from "../../services/elections/electionService";
import { Toast, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "./table.css"

export default class MyNominations extends Component {
    constructor(props) {
        super(props);
        this.addCampaign = this.addCampaign.bind(this);
        this.state = {
            candidates: [],
            user: {},
            showToast: false,
            toastMessage: "",
            redirect: false,
            nominationId: null
        }
    }

    componentDidMount() {
        this.fetchCandidates();
    }

    async fetchCandidates() {
        const candidates = await fetchMyNominations();
        if (candidates && typeof candidates !== 'string') {
            this.setState({
                candidates: candidates.nominations,
                user: candidates.nominations[0].user
            });
        } else {
            this.setState({
                showToast: true,
                toastMessage: candidates
            });
        }
    }

    setShowToast(param) {
        this.setState({
            showToast: param
        });
    }

    addCampaign(e) {
        this.setState({
            redirect: true,
            nominationId: e.target.value
        });
    }

    render() {
        const { candidates, user } = this.state;
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/elections/campaigns/addCampaign',
                state: { 'nominationId': this.state.nominationId }
            }} />       
        }
        return (
            <><div>
                <Toast onClose={() => this.setShowToast(false)} show={this.state.showToast} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Info</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.state.toastMessage instanceof Array ? this.state.toastMessage.map(line => (<p>{line}</p>)) : this.state.toastMessage}
                    </Toast.Body>
                </Toast>
            </div><div className="card">
                    <div className="card-header text-center">
                        {user.username}
                    </div>
                    <div className="card-body">
                        <div>
                            <h4 className="text-center">Candidates</h4>
                            <br />
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr className="elec-header">
                                        <th className="elec-info" scope="col">Name</th>
                                        <th className="elec-info" scope="col">Email</th>
                                        <th className="elec-info" scope="col">Vote Count</th>
                                        <th className="elec-info" scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidates.map((candidate, i) => (
                                        <tr className="elec-row" key={i}>
                                            <th className="elec-element" scope="row">
                                                <Link to={`/elections/campaigns/${candidate.id}`}>{candidate.user.username}</Link>
                                            </th>
                                            <td className="elec-element">{candidate.user.email}</td>
                                            <td className="elec-element">{candidate.election.vote_count[candidate.user.id]}</td>
                                            <td className="elec-element"><Button variant="primary" value={candidate.id} onClick={this.addCampaign}>Add Campaign</Button>{' '}</td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div></>
        );
    }
}
