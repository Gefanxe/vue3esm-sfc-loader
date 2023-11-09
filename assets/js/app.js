import * as Vue from 'vue';
import { createApp, ref } from 'vue';

import { loadModule } from 'Vue3SfcLoader';

const options = {
    moduleCache: {
        vue: Vue
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
}

const app = createApp({
    // components: {
    //     'my-component': Vue.defineAsyncComponent(() => loadModule('./components/myComponent.vue', options))
    // },
    setup() {
        const message = ref('Hello Vue!');
        return {
            message
        };
    }
})

app.component('my-component', Vue.defineAsyncComponent(() => loadModule('./components/myComponent.vue', options)));

app.mount('#app');