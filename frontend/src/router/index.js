import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "About" */ '../views/About.vue'),
    },
    {
        path: '/Items',
        name: 'Items',
        component: () => import(/* webpackChunkName: "Items" */ '../views/Items.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
