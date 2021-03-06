import axios from "axios";
import { SERVER_URL } from "../auth/config";

const baseUrl = `${SERVER_URL}/api/elections`;

const fetchElections = async () => {
    try {
        const response = await axios.get(baseUrl + "/");
        return response.data;
    } catch (e) {
        if (e.response) {
            if (e.response.data.error) {
                return e.response.data.error[0];
            }
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

const fetchElectionCandidates = async (query) => {
    try {
        const response = await axios.get(baseUrl + `/nominations?q=${query}`);
        return response.data;
    } catch (e) {
        if (e.response) {
            if (e.response.data.error) {
                return e.response.data.error[0];
            }
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

const fetchMyNominations = async () => {
    try {
        const response = await axios.get(baseUrl + `/my_nominations`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
        return response.data;
    } catch (e) {
        if (e.response) {
            if (e.response.data.error) {
                return e.response.data.error[0];
            }
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

const castVote = async (nomination) => {
    try {
        const response = await axios.post(baseUrl + '/vote', { 'nomination_id': `${nomination}` }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
        return response.data;
    } catch(e) {
        if (e.response) {
            if (e.response.data.error) {
                return e.response.data.error;
            }
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

const fetchCampaigns = async (type, id) => {
    try {
        const response = await axios.get(baseUrl + `/campaigns/fetch?type=${type}&q=${id}`);
        return response.data;
    } catch (e) {
        if (e.response) {
            if (e.response.data.error) {
                return e.response.data.error;
            }
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

const addCampaign = async (data) => {
    try {
        const response = await axios.post(baseUrl + `/campaigns`, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
        return response.data;
    } catch (e) {
        if (e.response) {
            if (e.response.data.error) {
                return e.response.data.error;
            }
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

export { fetchElections, fetchElectionCandidates, fetchMyNominations, castVote, fetchCampaigns, addCampaign };
