<template>
    <div class="p-grid largeMarginTop" v-if="loading == false">
        <div class="p-col-12">
            <p>Username</p>
            <InputText type="text" v-model="username" @click="focus('username')" />
        </div>
        <div class="p-col-12">
            <p>Password</p>
            <InputText type="password" v-model="password" @click="focus('password')" />
        </div>
        <div class="p-col-12">
            <Button label="Login" class="RightMargin" @click="onClick" />
            <register />
        </div>
        <div v-if="scannerDomain" class="keyboard">
            <keyboard @onChange="onKeyboardChange" ref="keyboard" />
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
import { defineAsyncComponent } from 'vue';
import register from '@/components/registerDialog';

export default {
    emits: ['setNavbar'],
    components: {
        keyboard: defineAsyncComponent(() => import(/* webpackChunkName: "Keyboard" */ '@/components/keyboard')),
        register,
    },
    data() {
        return {
            username: '',
            password: '',
            selectedTextbox: '',
            loading: false,
            keyboardInput: '',
            scannerDomain: false,
        };
    },
    created() {
        this.$emit('setNavbar', false);
        let subDomian = window.location.hostname.split('.')[0];
        console.log('subDomian', subDomian);
        if (subDomian === 'scanner') {
            this.scannerDomain = true;
        }
    },
    methods: {
        focus(textbox) {
            if (this.scannerDomain) {
                this.selectedTextbox = textbox;
                console.log('Selected', textbox);
                this.$refs.keyboard.setText('');
            }
        },
        onKeyboardChange(value) {
            if (this.selectedTextbox === 'username') {
                this.username = value;
            } else if (this.selectedTextbox === 'password') {
                this.password = value;
            }
        },
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

                this.$toast.add({ severity: 'success', summary: 'Logged in', detail: 'You are logged in as ' + store.get('user')['FullName'], life: 3000 });
                if (this.scannerDomain) {
                    this.$router.push('Scan');
                } else {
                    this.$emit('setNavbar', true);
                    this.$router.push('Items');
                }
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
.keyboard {
    width: 100%;
    position: absolute;
    bottom: 0;
}
.RightMargin {
    margin-right: 10px !important;
}

.largeMarginTop {
    margin-top: 150px !important;
}
</style>
