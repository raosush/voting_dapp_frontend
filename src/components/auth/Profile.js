import { React, Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchProfile, syncProfile } from '../../services/auth/loginService';
import { Toast } from 'react-bootstrap';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAboutMe = this.onChangeAboutMe.bind(this);
        this.onChangeExperience = this.onChangeExperience.bind(this);
        this.onChangeSocialProfile = this.onChangeSocialProfile.bind(this);
        this.submitProfile = this.submitProfile.bind(this);
        this.state = {
            profile: {
                name: "",
                about_me: "",
                experience: "",
                social_profile: "",
                user: {}
            },
            verified: localStorage.getItem('verified') === 'true',
            showToast: false,
            toastMessage: ""
        };
    }

    componentDidMount() {
        if (!this.state.verified) {
            return <Redirect to={{ pathname: '/auth/login' }} />
        }
        if (!this.props.new) {
            this.retrieveProfile();
        }
    }

    async retrieveProfile() {
        const profile = await fetchProfile();
        this.setState({
            profile: profile.profile
        });
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(prevState => ({
            profile: {
                ...prevState.profile,
                name: name
            }
        }));
    }

    onChangeAboutMe(e) {
        const aboutMe = e.target.value;

        this.setState(prevState => ({
            profile: {
                ...prevState.profile,
                about_me: aboutMe
            }
        }));
    }

    onChangeExperience(e) {
        const experience = e.target.value;

        this.setState(prevState => ({
            profile: {
                ...prevState.profile,
                experience: experience
            }
        }));
    }

    onChangeSocialProfile(e) {
        const socialProfile = e.target.value;

        this.setState(prevState => ({
            profile: {
                ...prevState.profile,
                social_profile: socialProfile
            }
        }));
    }

    setShowToast(param) {
        this.setState({
            showToast: param
        });
    }

    async submitProfile() {
        const profile = await syncProfile({ profile: this.state.profile, add: this.props.new ? true : false });
        if (profile && typeof profile !== 'string' && !(profile instanceof Array)) {
            this.setState({
                profile: profile,
                showToast: true,
                toastMessage: "Profile updated successfully!"
            });
        } else {
            this.setState({
                showToast: true,
                toastMessage: profile
            });
        }
    }

    render() {
        const { profile } = this.state;
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
                <h4>Profile Details</h4>
                <form>
                    <div className="form-group" style={{ padding: "20px" }}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={profile.name}
                            placeholder="Enter your name"
                            onChange={this.onChangeName}
                            name="name"
                        />
                    </div>

                    <div className="form-group" style={{ padding: "20px" }}>
                        <label htmlFor="aboutMe">About Me</label>
                        <textarea
                            className="form-control"
                            id="aboutMe"
                            required
                            value={profile.about_me}
                            placeholder="Introduce yourself"
                            onChange={this.onChangeAboutMe}
                            name="aboutMe"
                        />
                    </div>

                    <div className="form-group" style={{ padding: "20px" }}>
                        <label htmlFor="experience">Experience</label>
                        <textarea
                            className="form-control"
                            id="experience"
                            required
                            value={profile.experience}
                            placeholder="Enter relevant experience"
                            onChange={this.onChangeExperience}
                            name="experience"
                        />
                    </div>

                    <div className="form-group" style={{ padding: "20px" }}>
                        <label htmlFor="socialProfile">Social Profile</label>
                        <input
                            type="url"
                            className="form-control"
                            id="socialProfile"
                            required
                            value={profile.social_profile}
                            placeholder="Enter your social profile"
                            onChange={this.onChangeSocialProfile}
                            name="socialProfile"
                        />
                    </div>
                </form>
                <button
                    type="submit"
                    className="btn btn-success" style={{ padding: "10px" }}
                    onClick={this.submitProfile}
                >
                    Submit
                </button>
            </div>
        )
    }
}
