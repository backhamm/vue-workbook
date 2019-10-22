<template>
    <div class="change-sidebar">

        <q-btn class="animated bounce" v-show="isLogin && !showUserList" @click="changeSideBar" round color="secondary" icon="keyboard_arrow_up" />

        <q-btn-group class="animated fadeIn" push  v-show="isLogin && showUserList">
            <q-btn push icon="power_settings_new" @click="logout">
                <q-tooltip
                        transition-show="scale"
                        transition-hide="scale"
                >
                    退出聊天
                </q-tooltip>
            </q-btn>
            <q-btn push icon="replay" @click="changeSideBar">
                <q-tooltip
                        transition-show="scale"
                        transition-hide="scale"
                >
                    返回demo列表
                </q-tooltip>
            </q-btn>
            <q-btn push icon="highlight_off" @click="clearList">
                <q-tooltip
                        transition-show="scale"
                        transition-hide="scale"
                >
                    单击清空未上线用户，双击清空聊天信息
                </q-tooltip>
            </q-btn>
        </q-btn-group>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    let timer = null;
    let count = 0;
    export default {
        props: ['showUserList', 'isLogin'],
        computed: mapState(['userName']),
        methods: {
            changeSideBar() {
                this.$emit('changeSideBar')
            },
            logout() {
                let userName = this.userName || JSON.parse(localStorage.getItem('userInfo')).name;
                this.$socket.emit('logout', userName);
                localStorage.removeItem('userInfo')
            },
            // 单击清空未上线用户列表，双击清空聊天记录列表
            clearList() {
                count++;
                if (!timer) {
                    timer = setTimeout(() => {
                        if (count > 1) {
                            this.$socket.emit('clearMessage');
                        } else {
                            this.$socket.emit('clearLog');
                        }
                        clearTimeout(timer);
                        timer = null;
                        count = 0
                    }, 300)
                }
            }

        }
    }
</script>

<style lang="stylus" scoped>
    .change-sidebar
        position absolute
        bottom 30px
        left 50%
        transform translateX(-50%)
</style>
