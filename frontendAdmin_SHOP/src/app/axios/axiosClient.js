import axios from "axios";
import {
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage,
  saveRefreshToken,
  saveToken,
} from "../../utils/localStorage";

const StatusCode = {
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  TooManyRequests: 429,
  InternalServerError: 500,
};

export const CONFIG_DISABLE_PAGINATION = {
  headers: {
    "x-disable-pagination": true,
  },
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

const injectToken = (config) => {
  const token = getTokenFromLocalStorage();
  if (token !== null && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.withCredentials = true;
  return config;
};

class Http {
  constructor() {
    this.instance = null;
  }

  get http() {
    return this.instance !== null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: process.env.REACT_APP_URL,
      headers,
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );

    http.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error)
    );

    this.instance = http;
    return http;
  }

  async request(config) {
    return this.http.request(config);
  }

  async get(url, config) {
    return this.http.get(url, config);
  }

  async post(url, data, config) {
    return this.http.post(url, data, config);
  }

  async put(url, data, config) {
    return this.http.put(url, data, config);
  }

  async patch(url, data, config) {
    return this.http.patch(url, data, config);
  }

  async delete(url, config) {
    return this.http.delete(url, config);
  }

  async handleError(error) {
    const { response, config } = error;
    if (
      config.url !== "/auth" &&
      config.url !== "/auth/refresh-tokens" &&
      response
    ) {
      if (response.status === StatusCode.Unauthorized && !config._retry) {
        //   config._retry = true;
        //   try {
        //     const rs = await axios.post("/auth/refresh-tokens", {
        //       refreshToken: getRefreshTokenFromLocalStorage(),
        //     });
        //     saveToken(rs.data.tokens.access.token);
        //     saveRefreshToken(rs.data.tokens.refresh.token);
        //     return this.http(config);
        //   } catch (_error) {
        //     return Promise.reject(_error);
        //   }
      }
    }

    return Promise.reject(error);
  }
}

export const axiosClient = new Http();
