<template>
    <div>
        <q-layout view="lHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
            <q-header elevated class="bg-cyan-8">
                <q-toolbar>
                    <q-toolbar-title>{{title}}</q-toolbar-title>
                    <q-btn flat @click="drawer = !drawer" round dense icon="menu"/>
                </q-toolbar>
            </q-header>

            <q-drawer
                    v-model="drawer"
                    show-if-above
                    :width="200"
                    :breakpoint="400"
                    :content-style="{paddingBottom: '100px'}"
            >
                <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                    <q-list padding>

                        <DemoList v-show="!showUserList"  class="animated fadeIn" :sidebarList="sidebarList"/>

                        <UserList v-show="showUserList" class="animated fadeInUpBig" />

                    </q-list>
                </q-scroll-area>

                <Logout :isLogin="isLogin.status" :showUserList="showUserList" @changeSideBar="changeSideBar"/>

                <q-img class="absolute-top" style="height: 150px;">
                    <div class="absolute-bottom bg-transparent">
                        <q-avatar size="56px" class="q-mb-sm">
                            <img src="./assets/icon.png">
                        </q-avatar>
                        <div class="text-weight-bold">Ping WanNiJiuShi</div>
                        <div>@Da niu</div>
                    </div>
                </q-img>
            </q-drawer>

            <q-page-container>
                <router-view></router-view>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import DemoList from './components/public/demoList';
    import UserList from './components/chatApp/userList';
    import Logout from './components/chatApp/logout';
    export default {

        data() {
            return {
                drawer: false,
                // 侧边栏列表
                sidebarList: [
                    {link: '/chatApp', icon: 'star', title: 'chatApp'},
                    {link: '/todoList', icon: 'inbox', title: 'todoList'}
                ],
            }
        },
        created() {
            this.initState();
            this.autoLogin();
        },
        sockets: {
            loginSuccess(data) {
                this.$q.notify({
                    message: data.message,
                    color: data.status ? 'secondary' : 'deep-orange',
                    position: 'top-left',
                    timeout: 1800
                });
                this.setIsLogin(data);
                this.setShowUserList(data.status)
            }
        },
        computed: {
            ...mapState(['isLogin', 'showUserList']),
            title() {
                return this.$route.path.slice(1)
            }
        },
        methods: {
            ...mapActions(['setTodoList', 'setVisibilityFilter', 'setIntroduces', 'setShowUserList', 'setIsLogin', 'setUserName']),

            // 当localStorage中有用户信息时，自动登录到聊天室, 并将用户名存入vuex中
            autoLogin() {
                if (localStorage.getItem('userInfo')) {
                    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    this.$socket.emit('login', userInfo);
                    this.setUserName(userInfo.name);
                }
            },
            // 初始化vuex中todoList的state值(可省略)以及将每个demo的描述信息设置为显示
            initState() {
                let arr = {};
                this.sidebarList.forEach(el => arr[el.title] = 1);
                // 每个demo的描述信息（只在首次进入时显示）
                this.setIntroduces(arr);
                let initTodoList = [
                    {todo: '吃饭', completed: false},
                    {todo: '睡觉', completed: true},
                    {todo: '敲代码', completed: false},
                ];
                this.setTodoList(initTodoList);
                this.setVisibilityFilter();
            },
            // 登录后显示切换按钮，用于切换demo列表和聊天用户列表
            changeSideBar() {
                this.setShowUserList(!this.showUserList)
            }
        },

        components: {
            DemoList,
            UserList,
            Logout
        }

    }
</script>

<style lang="stylus" scoped>
    .q-layout-container
        background url('../public/bg.jpg') no-repeat center / cover

        >>>
            .q-drawer
                background rgba(255, 255, 255, .6)

    >>>
        .q-img__content
            border-right: 1px solid rgb(221, 221, 221)

            div
                color #333

    .q-page-container
        min-height 100vh
        text-align center
        background rgba(255, 255, 255, .8)
</style>
