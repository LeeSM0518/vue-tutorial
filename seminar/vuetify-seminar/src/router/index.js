import VueRouter from "vue-router";
import Vue from 'vue'
import AxiosComponent from "../components/AxiosComponent";
import WebSocket from "../components/WebSocket";

Vue.use(VueRouter);

const routes = [
    {
        path: '/axios', component:AxiosComponent
    },
    {
        path: '/websocket', component: WebSocket
    }
];

const router = new VueRouter({
    routes: routes,
    mode: 'history',
});

export default router;
