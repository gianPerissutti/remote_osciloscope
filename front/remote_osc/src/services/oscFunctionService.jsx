import axios from "axios";

const baseUrl = "http://192.168.0.179:3002/osc_functions";


const funcJSON = {
    offset: 0,
}

const getAll = () => {
    return axios.get(baseUrl);
};

const update = (offset) => {
    funcJSON.offset = offset;
    return axios.put(`${baseUrl}/offset`, funcJSON)
};

export default {
    getAll,
    update
};