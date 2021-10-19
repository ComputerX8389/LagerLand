<template>
    <div>
        <Menubar :model="items">
            <template #start>
                <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40" class="p-mr-2" />
            </template>

            <template #item="{item}">
                <router-link :to="item.to" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <a :href="href" @click="navigate" :class="{ 'active-link': isActive, 'active-link-exact': isExactActive }">{{ route.fullPath }}</a>
                </router-link>
            </template>

            <template #end> </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';

console.log(router.getRoutes());

let items = ref(
    router.getRoutes().map((route) => {
        return {
            label: route.name,
            to: route.path,
        };
    })
);

//let items = ref([
//    {
//        label: 'Items',
//        icon: 'pi pi-fw pi-power-off',
//    },
//    {
//        label: 'About',
//        icon: 'pi pi-fw pi-power-off',
//    },
//]);
</script>

<style></style>
