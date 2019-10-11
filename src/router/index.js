import Vue from 'vue';
import Router from 'vue-router';
import todoList from '../components/todoList';
import chatApp from '../components/chatApp';

const routes = [
    {
        path: '',
        redirect: '/chatApp'
    },
    {
        path: '/chatApp',
        component: chatApp
    },
    {
        path: '/todoList',
        component: todoList
    }
];

Vue.use(Router);
export default new Router({
    mode: 'history',
    routes
})
