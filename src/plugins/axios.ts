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

export const setupInterceptors = (store: Store<any>, router: VueRouter) => {
    _axios.interceptors.request.use(
        async (config) => {
            if (localStorage.getItem('accessToken')) {
                await store.dispatch('auth/checkAndRevokeToken').catch((err: Error) => {
                    console.error(err)
                    router.replace('/')
                })
                config.headers.Authorization = `${localStorage.getItem('accessToken')}`
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
        async function (response) {
            if (response.status === 403) {
                await store.dispatch('auth/forceLogout')
                await router.replace('/')
            }
            return response;
        },
        function (error) {
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

export default _axios;
