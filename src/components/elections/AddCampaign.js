import { React, Component } from 'react';
import { Toast } from 'react-bootstrap';
import { addCampaign, fetchCampaigns } from '../../services/elections/electionService';

export default class AddCampaign extends Component {
    constructor(props) {
        super(props);
        this.onChangeCampaign = this.onChangeCampaign.bind(this);
        this.submitCampaign = this.submitCampaign.bind(this);
        this.state = {
            campaign: {
                campaign: '',
                nomination: {}
            },
            showToast: false,
            toastMessage: ""
        };
    }

    componentDidMount() {
        if (this.props.location.state.nominationId) {
            this.setState({
                campaign: {
                    nomination: {
                        id: this.props.location.state.nominationId
                    }
                }
            });
        }
        if (this.props.location.state.campaignId) {
            this.retreiveCampaign();
        }
    }

    async retreiveCampaign() {
        const campaign = await fetchCampaigns('', this.props.campaignId);
        this.setState({
            campaign: campaign.campaigns[0]
        });
    }

    onChangeCampaign(e) {
        const campaign = e.target.value;

        this.setState(prevState => ({
            campaign: {
                ...prevState.campaign,
                campaign: campaign
            }
        }));
    }

    setShowToast(param) {
        this.setState({
            showToast: param
        });
    }

    async submitCampaign() {
        const c = await addCampaign({"campaign": this.state.campaign.campaign, "nomination_id": this.state.campaign.nomination.id});
        if (c && typeof c !== 'string' && !(c instanceof Array)) {
            this.setState({
                campaign: c.campaign,
                showToast: true,
                toastMessage: "Campaign updated successfully!"
            });
        } else {
            this.setState({
                showToast: true,
                toastMessage: c
            });
        }
    }

    render() {
        const { campaign } = this.state;
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
                <h4>Campaign</h4>
                <form>
                    <div className="form-group" style={{ padding: "20px" }}>
                        <label htmlFor="name">Campaign</label>
                        <textarea
                            className="form-control"
                            id="name"
                            required
                            value={campaign.campaign}
                            placeholder="Enter campaign details"
                            onChange={this.onChangeCampaign}
                            name="campaign"
                        />
                    </div>
                </form>
                <button
                    type="submit"
                    className="btn btn-success" style={{ padding: "10px" }}
                    onClick={this.submitCampaign}
                >
                    Submit
                </button>
            </div>
        )
    }
}
