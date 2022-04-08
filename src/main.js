import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';

/* 
    CSS IMPORTS
*/
import './sass/_reset.scss';
import './sass/_global.scss';
import './sass/_mixins.scss';
import './sass/_helpers.scss';

/* 
    SINGLE-INSTANCE COMPONENTS 
*/
import TheHeader from './components/layout/TheHeader.vue';

const app = createApp(App)

app.component('TheHeader', TheHeader);

app.use(router).use(store).mount('#app')
