import Vue from "vue"
import Vuex, {Module} from 'vuex'
import jwtDecode from "jwt-decode"
import moment from "moment";
import axios from "axios";

Vue.use(Vuex)

interface Auth {
    auth: {
        id: string;
        kind: string;
        username: string;
        expr: Date | null;
    };
}

export default {
    state: {
        auth: {
            id: '',
            kind: '',
            username: '',
            expr: null
        }
    },
    getters: {
        loggedIn: state => localStorage.getItem('accessToken')
            && state.auth.id && state.auth.username && state.auth.expr
    },
    mutations: {
        setAuthData(state, token) {
            const data: { sub: string; sid: string; exp: number } = jwtDecode(token);
            Vue.set(state, 'auth', {
                username: data.sub,
                id: data.sid,
                expr: new Date(data.exp),
            })
        }
    },
    actions: {
        loginDefault({commit, state}, {username, password}: { username: string; password: string }) {
            return axios.post('/api/login', {
                username: username,
                password: password,
            }).then((resp) => {
                localStorage.setItem('accessToken', resp.data.token)
                localStorage.setItem('revokeToken', resp.data.revoke_token)
                state.auth.kind = resp.data.auth_kind
                commit('setAuthData', resp.data.token)
            })
        },
        checkAndRevokeToken({commit, state}) {
            if (!state.auth.expr) {
                // logout
                return Promise.reject('token expiration missing')
            } else if (
                moment(new Date().getUTCMilliseconds()).add(5, 'm').toDate().getUTCMilliseconds() >
                state.auth.expr.getUTCMilliseconds()) {
                return axios.post('/api/revoke', {
                    'revoke_token': localStorage.getItem('revokeToken')
                }, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken')
                    }
                }).then((resp: any) => {
                    localStorage.setItem('accessToken', resp.data.token)
                    localStorage.setItem('revokeToken', resp.data.revoke_token)
                    commit('setAuthData', resp.data.token)
                })
            }
        }
    },
    modules: {}
} as Module<Auth, {}>
