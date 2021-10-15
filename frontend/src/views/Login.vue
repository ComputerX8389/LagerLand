<template>
    <InputText type="username" v-model="username" />
    <InputText type="password" v-model="password" />
    <Button label="Login" @click="onClick" />
</template>

<script>
import axios from 'axios';
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
            let token = response.data.Token;
            console.log('token', token);
        },
    },
};
</script>

<style></style>
