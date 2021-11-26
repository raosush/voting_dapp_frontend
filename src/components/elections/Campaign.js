import React, { Component } from 'react'
import { fetchCampaigns } from "../../services/elections/electionService";
import { Toast } from "react-bootstrap";
import './campaign-style.css';
import pic from "./placeholder-img.jpg"

export default class Campaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaigns: [],
            showToast: false,
            toastMessage: ""
        }
    }

    componentDidMount() {
        this.fetchCampaigns(this.props.match.params.nominationId);
    }

    async fetchCampaigns(nominationId) {
        const campaigns = await fetchCampaigns('nomination', nominationId);
        if (campaigns && typeof campaigns !== 'string') {
            this.setState({
                campaigns: campaigns.campaigns
            });
        } else {
            this.setState({
                showToast: true,
                toastMessage: campaigns
            });
        }
    }

    setShowToast(param) {
        this.setState({
            showToast: param
        });
    }

    render() {
        const { campaigns } = this.state;
        return (
            <><Toast onClose={() => this.setShowToast(false)} show={this.state.showToast} delay={5000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Info</strong>
                </Toast.Header>
                <Toast.Body>
                    {this.state.toastMessage instanceof Array ? this.state.toastMessage.map(line => (<p>{line}</p>)) : this.state.toastMessage}
                </Toast.Body>
            </Toast><div className='card-container'>
                    {campaigns.map((campaign, i) => (
                        <section className="campaign-card" key={i}>
                            <img className='profile-pic' src={pic} alt="" />
                            <h1 style={{'backgroundColor': 'white', color: 'black'}}>{campaign.nomination.user.username}</h1>
                            <h2>Description</h2>

                            <p>
                                {campaign.campaign}
                            </p>
                        </section>
                    ))}
                </div></>
        )
    }
}
