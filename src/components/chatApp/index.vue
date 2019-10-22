<template>
    <div>
        <DemoInfo v-if="showIntroduces" :textList="todoInfoText" />
        <div v-else>
            <Login v-if="!isLogin.status"/>
            <Chat v-else/>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import DemoInfo from '../public/demoInfo';
    import Login from './login';
    import Chat from './chat';

    export default {
        data() {
            return {
                todoInfoText: {
                    title: '一个简单的群聊页面',
                    technology: '主要技术： socket.io、node.js、fs模块读写文件、vuex、组件化开发、动画衔接、stylus、ES6、ES7、localStorage、Material Icons，页面设计',
                    description: `项目描述：服务端代码放在server目录下，支持断线重连(如刷新页面)，登录成功后左侧demo列表会自动切换为在线用户列表和一些功能按钮(登出、返回demo列表、单击清空用户列表双击清空聊天信息)，并显示用户在线/离线的状态。当聊天列表长度超出页面可视区时，会自动滚动到最底部，以及消息发送时间有一些细节处理。`
                }
            }
        },
        computed: {
            ...mapState(['onceIntroduces', 'isLogin']),
            showIntroduces() {
                return this.onceIntroduces[this.$route.path.slice(1)]
            }
        },
        methods: {
        },
        components: {
            DemoInfo,
            Login,
            Chat
        }
    }
</script>

<style lang="stylus" scoped>

</style>
