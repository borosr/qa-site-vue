import Vue from "vue"
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth: {
            namespaced: true,
            state: auth.state,
            actions: auth.actions,
            getters: auth.getters,
            mutations: auth.mutations
        },
    }
})
