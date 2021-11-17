<template>
    <Button label="Register" type="button" @click="display = true" class="p-button-secondary"></Button>
    <Dialog header="Register" v-model:visible="display">
        <div class="p-grid width300" v-if="loading == false">
            <div class="p-col-12">
                <span class="p-float-label marigenTop20">
                    <InputText id="fullname" type="text" v-model="fullname" />
                    <label for="fullname">Fullname</label>
                </span>
            </div>
            <div class="p-col-12">
                <span class="p-float-label marigenTop10">
                    <InputText id="email" type="text" v-model="email" />
                    <label for="email">Email</label>
                </span>
            </div>
            <div class="p-col-12">
                <span class="p-float-label marigenTop10">
                    <InputText id="username" type="text" v-model="username" />
                    <label for="username">Username</label>
                </span>
            </div>
            <div class="p-col-12">
                <span class="p-float-label marigenTop10">
                    <InputText id="password1" type="password" v-model="password1" />
                    <label for="password1">Password</label>
                </span>
            </div>
            <div class="p-col-12">
                <span class="p-float-label marigenTop10">
                    <InputText id="password2" type="password" v-model="password2" />
                    <label for="password2">Password</label>
                </span>
            </div>
            <div class="p-col-12">
                <Button label="Create account" @click="register" />
            </div>
        </div>
        <div class="p-grid" v-else>
            <ProgressSpinner />
        </div>
    </Dialog>
</template>

<script>
import axios from '@/apiClient';

export default {
    name: 'registerDialog',
    data() {
        return {
            display: false,
            loading: false,
            fullname: '',
            email: '',
            username: '',
            password1: '',
            password2: '',
        };
    },
    methods: {
        async register() {
            if (this.password1 !== this.password2) {
                this.$toast.add({ severity: 'warn', summary: 'Passwords do not match', detail: 'You need to type the same password twice', life: 3000 });
                return;
            }
            this.loading = true;
            try {
                await axios.post('register', {
                    FullName: this.fullname,
                    Email: this.email,
                    Username: this.username,
                    Password: this.password1,
                });
                this.$toast.add({ severity: 'success', summary: 'Account created', detail: 'You can now log in', life: 3000 });
                this.loading = false;
                this.display = false;
            } catch (error) {
                console.log(error);
                if (error.response.status === 409) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Username already exists!', life: 3000 });
                } else if (error.response.status === 406) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Field is missing', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Unknown error', detail: 'thrown error', life: 3000 });
                }
                this.loading = false;
                this.display = false;
            }
        },
    },
};
</script>

<style scoped>
.width300 {
    width: 300px;
}
.marigenTop20 {
    margin-top: 20px;
}
.marigenTop10 {
    margin-top: 10px;
}
</style>
