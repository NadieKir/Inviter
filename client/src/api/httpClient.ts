import axios, { InternalAxiosRequestConfig } from 'axios';

import { history } from 'common/router';

export const httpClient = axios.create({
  baseURL: "http://localhost:8080",
});

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  config.headers.Authorization = window.localStorage.getItem('user');

  return config;
})

httpClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
      if (error.response?.status === 404) {
        history.replace("/not-found");
      } else {
        return Promise.reject(error);
      }
    }
)