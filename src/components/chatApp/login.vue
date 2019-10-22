<template>
    <div class="login-wrapper animated fadeIn">
        <q-input v-model="userName" color="secondary" :input-style="{textAlign: 'center'}" placeholder="输入一个用户名" @keyup.13="login"/>
        <q-btn
                :loading="loading"
                :percentage="percentage"
                color="secondary"
                @click="login"
                style="width: 120px; margin-top: 30px"
        >
            登录
            <template v-slot:loading>
                <q-spinner-gears class="on-left" />
                登录中...
            </template>
        </q-btn>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        data() {
            return {
                userName: '',
                loading: false,
                percentage: 0
            }
        },
        computed: mapState(['isConnect']),
        methods: {
            ...mapActions(['setUserName']),
            // 点击登录后显示按钮的过渡效果
            isLoading() {
                return new Promise(resolve => {
                    this.loading = true;
                    this.percentage = 0;
                    this.interval = setInterval(() => {
                        this.percentage += Math.floor(Math.random() * 8 + 10);
                        if (this.percentage >= 100) {
                            this.loading = false;
                            this.percentage = 0;
                            clearInterval(this.interval);
                            resolve()
                        }
                    }, 120)
                })
            },
            // 登录(为了模拟异步加入了async await语法，可省略)
            async login () {
                if (!this.isConnect) {
                    return this.$q.notify({
                        message: '请先启动/server/app.js',
                        color: 'deep-orange',
                        position: 'top-left',
                        timeout: 1800
                    });
                } else if (!this.userName.trim()) {
                    return this.$q.notify({
                        message: '输入不能为空！',
                        color: 'deep-orange',
                        position: 'top-left',
                        timeout: 1800
                    });
                }
                await this.isLoading();

                let user = {name: this.userName, online: 1};
                this.$socket.emit('login', user);
                localStorage.setItem('userInfo', JSON.stringify(user));
                this.setUserName(this.userName);
                this.userName = ''
            }
        },
        beforeDestroy() {
            clearInterval(this.interval)
        }
    }
</script>

<style lang="stylus" scoped>
    .login-wrapper
        margin 200px auto 0
        width 200px
</style>
