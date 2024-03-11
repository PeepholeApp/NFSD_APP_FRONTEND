import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

export const getRequest = async (url) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error('Error in getRequest:', error);
    return { error: true, message: 'Failed to fetch data' };
  }
};

export const postRequest = async (url, body) => {
  console.log("body: ", body, baseUrl, url)
  try {
    const response = await axios.post(`${baseUrl}${url}`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("Post: ", response)
    return response.data;
  } catch (error) {
    console.error('Error in postRequest:', error);
    return { error: true, message: 'Failed to post data' };
  }
};
