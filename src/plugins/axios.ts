import Vue from 'vue';
import axios from "axios";
import {Store} from "vuex";
import VueRouter from "vue-router";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

const setupInterceptors = (store: Store<any>, router: VueRouter) => {
    _axios.interceptors.request.use(
        async (config) => {
            if (localStorage.getItem('accessToken')) {
                await store.dispatch('checkAndRevokeToken').catch((err: Error) => {
                    console.error(err)
                    router.push('/')
                })
                config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
            }
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

// Add a response interceptor
    _axios.interceptors.response.use(
        function (response) {
            // Do something with response data
            return response;
        },
        function (error) {
            // Do something with response error
            return Promise.reject(error);
        }
    );
}

Object.defineProperties(Vue.prototype, {
    axios: {
        get() {
            return _axios;
        }
    },
    $axios: {
        get() {
            return _axios;
        }
    },
});

export default {_axios, setupInterceptors};
