import {Module} from 'vuex'
import _axios from "@/plugins/axios";

export interface Rating {
    id: string;
    kind: string;
    record_id: string;
    rated_by: string;
    rated_at: string;
    value: number;
}

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        rate(_, {kind, id}: {kind: string; id: string}) {
            return _axios.put(`/api/${kind}/${id}/rate`)
        },
        unrate(_, {kind, id}: {kind: string; id: string}) {
            return _axios.put(`/api/${kind}/${id}/unrate`)
        },
        dismissRate(_, {kind, id}: {kind: string; id: string}) {
            return _axios.put(`/api/${kind}/${id}/rate/dismiss`)
        },
    },
    modules: {}
} as Module<{}, {}>
