import Vue from "vue"
import {Module} from 'vuex'
import defaultAxios, {AxiosResponse} from "axios"

interface Info {
    visibility: string;
    oauth_providers: {
        [key: string]: boolean;
    };
}

export default {
    namespaced: true,
    state: {
        visibility: '',
        oauth_providers: {}
    },
    getters: {
        visible: state => state.visibility === 'public',
        invisible: state => state.visibility === 'private',
    },
    mutations: {
        setInfo(state, i: Info) {
            Vue.set(state, 'visibility', i.visibility)
            Vue.set(state, 'oauth_providers', i.oauth_providers)
        }
    },
    actions: {
        fetch({commit}) {
            return defaultAxios.get<Info>('/api/info').then((resp: AxiosResponse<Info>) => {
                commit('setInfo', {...resp.data})
                return resp.data
            })
        }
    },
    modules: {}
} as Module<Info, {}>
