import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import './registerServiceWorker';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
// Primevue components
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
app.component('Button', Button);
app.component('InputText', InputText);

app.mount('#app');
