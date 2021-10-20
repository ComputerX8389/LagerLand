<template>
    <div class="p-grid largeMarginTop">
        <div class="p-col-12">
            <InputText type="text" v-model="username" />
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
import store from '@/store';
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
            let response = await axios.post(process.env.VUE_APP_API_URL + '/Auth', {
                Username: this.username,
                Password: this.password,
            });
            let user = response.data;
            store.commit('user', user);
            console.log('Setting token:', user.Token);

            // Set default header for all requests
            axios.defaults.headers.common['x-access-token'] = user.Token;

            this.$emit('setNavbar', true);
            this.$router.push('Items');
        },
    },
};
</script>

<style scoped>
.RightMargin {
    margin-right: 10px !important;
}

.largeMarginTop {
    margin-top: 150px !important;
}
</style>
