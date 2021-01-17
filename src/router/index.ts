import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/profile/View.vue'
import Questions from '@/views/questions/List.vue'
import NewQuestion from '@/views/questions/New.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'profile',
                name: 'Profile',
                component: Profile
            },
            {
                path: 'questions',
                name: 'Questions',
                component: Questions,
            },
            {
                path: 'questions/new',
                name: 'New_question',
                component: NewQuestion,
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
