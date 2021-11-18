import { Component } from "react";
import { fetchElections } from "../../services/elections/electionService";
import { Toast } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Elections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elections: [],
            showToast: false,
            toastMessage: ""
        }
    }

    componentDidMount() {
        this.fetchElections();
    }

    async fetchElections() {
        const elections = await fetchElections();
        if (elections && typeof elections !== 'string') {
            this.setState({
                elections: elections.elections
            });
        } else {
            this.setState({
                showToast: true,
                toastMessage: elections
            });
        }
    }

    setShowToast(param) {
        this.setState({
            showToast: param
        });
    }

    render() {
        const { elections } = this.state;
        return (
            <div>
                <Toast onClose={() => this.setShowToast(false)} show={this.state.showToast} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Info</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.state.toastMessage instanceof Array ? this.state.toastMessage.map(line => (<p>{line}</p>)) : this.state.toastMessage}
                    </Toast.Body>
                </Toast>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Position</th>
                            <th scope="col">Registration Deadline</th>
                            <th scope="col">Voting Start Time</th>
                            <th scope="col">Voting End Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {elections.map((election, i) => (
                            <tr key={i}>
                                <th scope="row">
                                    <Link to={`/elections/${election.id}`}>{election.position}</Link>
                                </th>
                                <td>{election.deadline}</td>
                                <td>{election.start_date}</td>
                                <td>{election.end_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
