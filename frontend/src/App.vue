<template>
    <!-- Needs to exit somewhere for toast to function -->
    <Toast />
    <navbar :showNavbar="navbar"></navbar>
    <router-view @setNavbar="setNavbar" />
</template>

<script>
import navbar from './components/navbar.vue';

export default {
    components: {
        navbar,
    },
    data() {
        return {
            navbar: false,
        };
    },
    methods: {
        setNavbar(state) {
            console.log('Navbar', state);
            this.navbar = state;
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
