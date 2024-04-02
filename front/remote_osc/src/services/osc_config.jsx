import axios from 'axios';

const baseUrl = 'http://localhost:3002/osc_config';

const getAll = () => {
    return axios.get(baseUrl)
  }

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default { 
  getAll,   
  update 
};