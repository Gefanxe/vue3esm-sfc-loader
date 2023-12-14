import * as Vue from 'vue';
import { loadModule } from 'Vue3SfcLoader';
import { createRouter, createWebHashHistory } from 'vue-router'

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
};

const routes = [
    {
        path: '/',
        name: 'Home',
        component: await loadModule(`${location.origin}/views/Home.vue`, options)
    },
    {
        path: '/about',
        name: 'About',
        component: await loadModule(`${location.origin}/views/About.vue`, options)
    },
    // {
    //     path: '/legal',
    //     name: 'Legal',
    //     component: AppLegal
    // },
    // {
    //     path: '/users/:username',
    //     name: "Users",
    //     component: AppUser,
    //     children: [
    //         {
    //             path: "/user/:username/info",
    //             name: "Info",
    //             component: UserInfo
    //         }
    //     ]
    // }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;