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
        getOne(_, id) {
            return _axios.get(`/api/questions/${id}`)
        },
        getAnswers(_, id) {
            return _axios.get(`/api/questions/${id}/answers`)
        },
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
        },
        update(_, {id, title, description}: { id: string; title: string; description: string }) {
            return _axios.put(`/api/questions/${id}`, {
                title: title,
                description: description
            })
        }
    },
    modules: {}
} as Module<Questions, {}>
