import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import './registerServiceWorker';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
// Primevue css
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

// Primevue components
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Menubar', Menubar);

app.mount('#app');
