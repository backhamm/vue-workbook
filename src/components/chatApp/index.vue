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
                    technology: '主要技术： socket.io、vuex、组件化开发、动画衔接、stylus、ES6、localStorage、Material Icons'
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
