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
        path: '/items',
        name: 'Items',
        component: () => import(/* webpackChunkName: "Items" */ '@/views/Items.vue'),
    },
    {
        path: '/categories',
        name: 'Categories',
        component: () => import(/* webpackChunkName: "Categories" */ '@/views/Categories.vue'),
    },
    {
        path: '/scan',
        name: 'Scan',
        component: () => import(/* webpackChunkName: "Items" */ '@/views/Scan.vue'),
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
