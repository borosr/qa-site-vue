import {Module} from 'vuex'
import _axios from "@/plugins/axios";

export interface Question {
    id: string;
    title: string;
    description: string;
    created_by: string;
    created_at: string;
    status: string;
    rating: string;
}

interface Questions {
    questions: any;
}

export default {
    namespaced: true,
    state: {
        questions: {}
    },
    getters: {},
    mutations: {},
    actions: {
        getAll(_, {limit, offset}) {
            return _axios.get('/api/questions', {
                params: {
                    limit: limit,
                    offset: offset
                }
            })
        },
        save(_, {title, description}: { title: string; description: string }) {
            return _axios.post('/api/questions', {
                title: title,
                description: description
            })
        }
    },
    modules: {}
} as Module<Questions, {}>
