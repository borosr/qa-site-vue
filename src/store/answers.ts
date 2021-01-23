import {Module} from 'vuex'
import _axios from "@/plugins/axios";

export interface Answer {
    id: string;
    question_id: string;
    created_by: string;
    answer: string;
    created_at: string;
    answered: boolean;
    rating: number;
}

interface Answers {
    answers: any;
}

export default {
    namespaced: true,
    state: {
        answers: {}
    },
    getters: {},
    mutations: {},
    actions: {
        save(_, {questionId, answer}: { questionId: string; answer: string }) {
            return _axios.post('/api/answers', {
                question_id: questionId,
                answer: answer
            })
        },
        update(_, {id, answer}: { id: string; answer: string }) {
            return _axios.put(`/api/answers/${id}`, {
                answer: answer
            })
        }
    },
    modules: {}
} as Module<Answers, {}>
