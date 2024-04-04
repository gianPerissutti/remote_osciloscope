import axios from "axios";

const baseUrl = "http://localhost:3002/osc_config";


const configJson = {
  timeDiv: 0.005,
  amplitudeDiv: 1
}

const getAll = () => {
  return axios.get(baseUrl);
};

const update = (timeDiv, ampDiv) => {
  configJson.timeDiv = timeDiv;
  configJson.amplitudeDiv = ampDiv;
  return axios.put(baseUrl, configJson)
};

export default {
  getAll,
  update
};
