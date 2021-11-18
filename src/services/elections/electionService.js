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

export { fetchElections, fetchElectionCandidates };
