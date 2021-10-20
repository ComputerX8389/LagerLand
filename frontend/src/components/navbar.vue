<template>
    <div>
        <Menubar :model="items">
            <template #item="{item}">
                <router-link :to="item.to" custom v-slot="{ href, navigate, isActive }">
                    <a :href="href" @click="navigate" :class="{ 'active-link': isActive, 'p-menuitem-link': true }">{{ item.label }}</a>
                </router-link>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
//import { ref } from 'vue';
//import store from '@/store';

let items = [
    {
        label: 'Items',
        to: '/items',
        icon: 'pi pi-fw pi-power-off',
    },
    {
        label: 'About',
        to: '/about',
        icon: 'pi pi-fw pi-power-off',
    },
];
</script>

<style scoped>
.active-link {
    color: rgb(0, 119, 255) !important;
}
</style>
