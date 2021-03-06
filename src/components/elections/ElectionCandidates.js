import { Component } from "react";
import { castVote, fetchElectionCandidates } from "../../services/elections/electionService";
import { Toast, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./table.css"

export default class ElectionCandidates extends Component {
    constructor(props) {
        super(props);
        this.castVote = this.castVote.bind(this);
        this.state = {
            candidates: [],
            election: {},
            showToast: false,
            toastMessage: ""
        }
    }

    componentDidMount() {
        this.fetchCandidates(this.props.match.params.id);
    }

    async fetchCandidates(query) {
        const candidates = await fetchElectionCandidates(query);
        if (candidates && typeof candidates !== 'string') {
            this.setState({
                candidates: candidates.nominations,
                election: candidates.nominations[0].election
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

    async castVote(e) {
        const response = await castVote(e.target.value);
        const { election } = this.state;
        if (response && typeof response !== 'string') {
            this.setState({
                showToast: true,
                toastMessage: response.success,
                election: {
                    ...election,
                    vote_count: response.vote_count
                }
            });
        } else {
            this.setState({
                showToast: true,
                toastMessage: response
            });
        }
    }

    render() {
        const { candidates, election } = this.state;
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
                        {election.position}
                    </div>
                    <div className="card-body">
                        <p>
                            <strong>Registration Deadline: </strong>
                            {election.deadline}
                        </p>
                        <p>
                            <strong>Start Date: </strong>
                            {election.start_date}
                        </p>
                        <p>
                            <strong>End Date: </strong>
                            {election.end_date}
                        </p>
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
                                            <td className="elec-element">{election.vote_count[candidate.user.id]}</td>
                                            <td className="elec-element"><Button variant="primary" value={candidate.id} onClick={this.castVote}>Vote</Button>{' '}</td>
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
