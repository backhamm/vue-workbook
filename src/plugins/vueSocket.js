import Vue from 'vue';
import store from '../store';
import VueSocketIo from 'vue-socket.io';

Vue.use(new VueSocketIo({
    debug: true,  // 在控制台显示输出
    connection: 'ws://192.168.20.96:3000',
    vuex: {
        store,
        actionPrefix: 'socket_'
    },
    options: {}
}));
