import Vue from "vue"
import Vuex from 'vuex'
import auth from './auth'
import questions from './questions'
import answers from './answers'
import rating from './rating'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        questions,
        answers,
        rating,
        info
    }
})
