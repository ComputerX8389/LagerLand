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

<script>
import axios from 'axios';
import store from '../store';

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async onClick() {
            console.log('username', this.username);
            console.log('password', this.password);

            let response = await axios.post('http://localhost:3000/Auth', {
                Username: this.username,
                Password: this.password,
            });
            let user = response.data;
            store.commit('user', user);
            this.$router.push('Items');
        },
    },
};
</script>

<style>
.RightMargin {
    margin-right: 10px !important;
}
</style>
