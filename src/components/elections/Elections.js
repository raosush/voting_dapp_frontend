import { Component } from "react";
import { fetchElections } from "../../services/elections/electionService";
import { Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./table.css"

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
        // let elections = [{
        //     position: "president",
        //     id:1,
        //     deadline: "23/4/12",
        //     start_date: "30/4/12",
        //     end_date: "5/5/12"
        // },
        // {
        //     position: "president",
        //     id:1,
        //     deadline: "23/4/12",
        //     start_date: "30/4/12",
        //     end_date: "5/5/12"
        // },
        // {
        //     position: "president",
        //     id:1,
        //     deadline: "23/4/12",
        //     start_date: "30/4/12",
        //     end_date: "5/5/12"
        // },
        // {
        //     position: "president",
        //     id:1,
        //     deadline: "23/4/12",
        //     start_date: "30/4/12",
        //     end_date: "5/5/12"
        // }
        // ]
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
                <table>
                    <thead className="thead-dark">
                        <tr className="elec-header">
                            <th className="elec-info" scope="col">Position</th>
                            <th className="elec-info" scope="col">Registration Deadline</th>
                            <th className="elec-info" scope="col">Voting Start Time</th>
                            <th className="elec-info" scope="col">Voting End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elections.map((election, i) => (
                            <tr className="elec-row" key={i}>
                                <th className="elec-element" scope="row">
                                    <Link to={`/elections/${election.id}`}>{election.position}</Link>
                                </th>
                                <td className="elec-element">{election.deadline}</td>
                                <td className="elec-element">{election.start_date}</td>
                                <td className="elec-element">{election.end_date}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
