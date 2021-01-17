import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {setupInterceptors} from './plugins/axios'
import moment from 'moment'

Vue.config.productionTip = false

setupInterceptors(store, router)


Vue.filter('formatDate', function(value: Date | string) {
    if (value) {
        return moment(String(value)).format('YYYY-MM-DD HH:mm')
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
