import {createApp} from 'vue';

import App from './App.vue';
import axios from 'axios';
import router from './router';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import '../css/index.scss';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.withCredentials = true;

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(vuetify);
app.use(router);
app.mount('#app');
