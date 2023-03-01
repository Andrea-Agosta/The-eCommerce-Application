import axios from 'axios';

export const restCall = (method: string, urlPath: string, data: {}, headers: {}) => {
  return axios({
    method: method,
    url: `http://localhost:8080/api/${urlPath}`,
    data: data,
    headers: { ...headers }
  })
};