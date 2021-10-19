<template>
    <div class="p-grid">
        <div class="p-col-12">
            <InputText type="username" v-model="username" />
        </div>
        <div class="p-col-12">
            <InputText type="password" v-model="password" />
        </div>
        <div class="p-col-12">
            <Button label="Login" class="RightMargin" @click="onClick" />
            <Button label="Register" @click="onClick" />
        </div>
    </div>
</template>

<script async setup>
import { ref } from 'vue';
import axios from 'axios';
import store from '@/store';
import { useRouter } from 'vue-router';

const router = useRouter();
let username = ref('');
let password = ref('');

const onClick = async () => {
    let response = await axios.post(process.env.VUE_APP_API_URL + '/Auth', { Username: username.value, Password: password.value });
    let user = response.data;
    store.commit('user', user);
    router.push('Items');
};
</script>

<style>
.RightMargin {
    margin-right: 10px !important;
}
</style>
