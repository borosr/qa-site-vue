import Vue from "vue"
import {Module} from 'vuex'
import jwtDecode from "jwt-decode"
import defaultAxios, {AxiosResponse} from "axios"
import _axios from '@/plugins/axios'

const defaultAuth = () => ({
    id: '',
    kind: '',
    username: '',
    expr: null
})

interface LoginResponse {
    token: string;
    revoke_token: string;
    auth_kind: string;
}

interface Auth {
    auth: {
        id: string;
        kind: string;
        username: string;
        expr: Date | null;
    };
}

function tokenExpired(expr: Date | null) {
    if (expr === null) {
        return true
    }
    return new Date().getTime() > expr.getTime();
}

export default {
    namespaced: true,
    state: {
        auth: defaultAuth()
    },
    getters: {
        loggedIn: state => state.auth.id && state.auth.username && state.auth.expr
            && localStorage.getItem('accessToken'),
        kind: state => state.auth?.kind
    },
    mutations: {
        setAuthData(state, {token, kind}) {
            const data: { sub: string; sid: string; exp: number } = jwtDecode(token);
            Vue.set(state.auth, 'id', data.sid)
            Vue.set(state.auth, 'username', data.sub)
            Vue.set(state.auth, 'expr', new Date(data.exp * 1000))
            Vue.set(state.auth, 'kind', kind)
        }
    },
    actions: {
        loginDefault({commit}, {username, password}: { username: string; password: string }) {
            return defaultAxios.post('/api/login', {
                username: username,
                password: password,
            }).then((resp) => {
                localStorage.setItem('accessToken', resp.data.token)
                localStorage.setItem('revokeToken', resp.data.revoke_token)
                localStorage.setItem('authKind', resp.data.auth_kind)
                commit('setAuthData', {
                    token: resp.data.token,
                    kind: resp.data.auth_kind
                })
            })
        },
        loginProvider({commit}, {provider, params}: { provider: string; params: any }) {
            defaultAxios.get<LoginResponse>(`/api/login/${provider}/callback`,
                {
                    params: {
                        ...params
                    }
                }).then((resp) => {
                localStorage.setItem('accessToken', resp.data.token)
                localStorage.setItem('revokeToken', resp.data.revoke_token)
                localStorage.setItem('authKind', resp.data.auth_kind)
                commit('setAuthData', {
                    token: resp.data.token,
                    kind: resp.data.auth_kind
                })
            })
        },
        checkAndRevokeToken({commit, state, dispatch}) {
            const token = localStorage.getItem('accessToken')
            if (token) {
                commit('setAuthData', {
                    token: token,
                    kind: localStorage.getItem('authKind')
                })
            }
            const expired = tokenExpired(state.auth.expr);
            if (!expired) {
                return Promise.resolve()
            } else if (expired && localStorage.getItem('revokeToken')) {
                return defaultAxios.post<LoginResponse>('/api/revoke', {
                    'revoke_token': localStorage.getItem('revokeToken')
                }, {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`
                    }
                })
                    .catch(async () => {
                        await dispatch('forceLogout')
                    })
                    .then((resp: AxiosResponse<LoginResponse> | void) => {
                        if (resp) {
                            localStorage.setItem('accessToken', resp.data.token)
                            localStorage.setItem('revokeToken', resp.data.revoke_token)
                            localStorage.setItem('authKind', resp.data.auth_kind)
                            commit('setAuthData', {
                                token: resp.data.token,
                                kind: resp.data.auth_kind
                            })
                        }
                    })
            }
            return dispatch('forceLogout')
        },
        logout({dispatch}) {
            return _axios.delete('/api/logout').then((value => {
                dispatch('forceLogout')
                return value
            })).catch(() => dispatch('forceLogout'))
        },
        forceLogout({state}) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('revokeToken')
            localStorage.removeItem('authKind')
            Vue.set(state.auth, 'id', '')
            Vue.set(state.auth, 'kind', '')
            Vue.set(state.auth, 'username', '')
            Vue.set(state.auth, 'expr', null)
        },
        getUserData({state}) {
            return _axios.get(`/api/users/${state.auth.id}`)
        },
        updateProfile({state}, user: { username: string; fullName: string; password: string }) {
            return _axios.put(`/api/users/${state.auth.id}`, {
                'username': user.username,
                'password': user.password,
                'full_name': user.fullName
            })
        },
        signup(_, user: { username: string; full_name: string; password: string }) {
            return defaultAxios.post('/api/users', user)
        }
    },
    modules: {}
} as Module<Auth, {}>
