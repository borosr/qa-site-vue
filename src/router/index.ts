import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/profile/View.vue'
import Questions from '@/views/questions/List.vue'
import NewQuestion from '@/views/questions/New.vue'
import ViewQuestion from '@/views/questions/View.vue'
import CallbackProvider from '@/views/callback/Provider.vue'
import App from "@/App.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'App',
        component: App,
        redirect: 'home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: Home
            },
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
            },
            {
                path: 'questions/:id/view',
                name: 'View_question',
                component: ViewQuestion
            },
            {
                path: 'login/:provider/callback',
                name: 'Github_callback',
                component: CallbackProvider
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
