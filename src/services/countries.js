import axios from 'axios';

// API URL
const countriesAPI = "https://restcountries.com/v3.1/all";

// The getAll function is an asynchronous function that makes a GET request to the countriesAPI and returns the response data.
const getAll = async () => {
    const response = await axios.get(countriesAPI);
    return response.data;
}

export default { getAll }