import axios from 'axios';

const base_url: string = 'http://192.168.1.7:3000';

export const Request = async (url: string) => {
  try {
    console.log(`${base_url}${url}`);
    const response = await axios.get(`${base_url}${url}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};
