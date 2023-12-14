import * as Vue from 'vue';
import router from '../router/index.mjs';
import { createApp } from 'vue';
import { loadModule } from 'Vue3SfcLoader';
import { serve } from 'http.mjs';
import axios from 'axios';

const options = {
    moduleCache: {
        vue: Vue,
        axios: axios,
        'http.mjs': { serve }
    },
    async getFile(url) {

        const res = await fetch(url);
        if (!res.ok)
            throw Object.assign(new Error(res.statusText + ' ' + url), { res });
        return {
            getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
        }
    },
    addStyle(textContent) {

        const style = Object.assign(document.createElement('style'), { textContent });
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    },
};

const App = await loadModule(`${location.origin}/App.vue`, options);

const app = createApp(App).use(router);

// app.component('my-component', Vue.defineAsyncComponent(() => loadModule('./components/myComponent.vue', options)));

app.mount('#app');