import Vue from 'vue';
import store from '../store';
import VueSocketIo from 'vue-socket.io';

Vue.use(new VueSocketIo({
    debug: false,  // 是否在控制台显示数据流
    // 用户名存在localStorage中，为避免断线重连时冲突(如：刷新页面)，在本地打开网页需分别访问localhost:8080、127.0.0.1:8080或者本机IP:8080进行测试，
    connection: 'ws://127.0.0.1:3000',  // 服务端地址，若在两台或多台电脑测试，127.0.0.1需改为本机ip
    vuex: {
        store,
        actionPrefix: 'socket_'  // 服务端会触发vuex中带有socket_字段的actions方法
    },
    options: {}
}));
