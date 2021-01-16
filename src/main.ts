import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {setupInterceptors} from './plugins/axios'

Vue.config.productionTip = false

setupInterceptors(store, router)

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
