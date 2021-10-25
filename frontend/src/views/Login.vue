<template>
    <div class="p-grid largeMarginTop" v-if="loading == false">
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
    <div class="p-grid largeMarginTop" v-else>
        <ProgressSpinner />
    </div>
</template>

<script>
// Avoid apiClient.js here to avoid redirect for wrong password
import axios from 'axios';
import store from '@/store';
export default {
    data() {
        return {
            username: '',
            password: '',
            loading: false,
        };
    },
    created() {
        this.$emit('setNavbar', false);
    },
    methods: {
        async onClick() {
            this.loading = true;
            console.log('username', this.username);
            console.log('password', this.password);
            try {
                let response = await axios.post(process.env.VUE_APP_API_URL + '/Auth', {
                    Username: this.username,
                    Password: this.password,
                });

                console.log('response', response);

                let user = response.data;
                store.commit('user', user);
                console.log('Setting token:', user.Token);

                // Set default header for all requests
                axios.defaults.headers.common['x-access-token'] = user.Token;

                this.$emit('setNavbar', true);
                this.$toast.add({ severity: 'success', summary: 'Logged in', detail: 'You are logged in as ' + store.get('user')['FullName'], life: 3000 });
                this.$router.push('Items');
            } catch (error) {
                console.log(error);
                if (error.response.status === 401) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Username or password is incorrect', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Unknown error', detail: 'thrown error', life: 3000 });
                }
            } finally {
                this.loading = false;
            }
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
