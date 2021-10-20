import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import store from '@/store';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "About" */ '@/views/About.vue'),
    },
    {
        path: '/Items',
        name: 'Items',
        component: () => import(/* webpackChunkName: "Items" */ '@/views/Items.vue'),
    },
    {
        path: '/Scan',
        name: 'Scan',
        component: () => import(/* webpackChunkName: "Items" */ '@/views/ScanItem.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    let unProtectedRoutes = ['Login'];
    if (!unProtectedRoutes.includes(to.name) && !store.get('user')) next({ name: 'Login' });
    else next();
});

export default router;
