import {Module} from 'vuex'
import _axios from "@/plugins/axios";

export interface Answer {
    id: string;
    question_id: string;
    created_by: string;
    answer: string;
    created_at: string;
    answered: string;
    rating: string;
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
        }
    },
    modules: {}
} as Module<Answers, {}>
