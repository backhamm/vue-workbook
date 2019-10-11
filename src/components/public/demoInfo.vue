<template>
    <q-card class="my-card animated" :class="isNext ? 'bounceOutRight' : 'bounceInLeft'">
        <q-card-section>
            <div class="text-h6">{{textList.title}}</div>
            <br>
            <br>
            <div class="text-subtitle2">{{textList.technology}}</div>
            <br>
            <!--<div class="text-subtitle2">（部分写法只是为了让运用的技术更广泛才加入的，可能会显得有些多余）</div>-->
            <!--<br>-->
            <div class="text-subtitle2">注： 在控制台切换手机/PC模式时，需刷新页面</div>
            <br>
        </q-card-section>

        <q-card-actions vertical>
            <q-btn round :loading="loading" color="secondary" @click="nextStep" icon="forward" style="margin: 0 auto">
                <template v-slot:loading>
                    <q-spinner-gears />
                </template>
            </q-btn>
        </q-card-actions>
    </q-card>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    export default {
        data() {
            return {
                loading: false,
                isNext: false,
            }
        },
        props: ['textList'],
        computed: {
            ...mapState(['onceIntroduces'])
        },
        methods: {
            ...mapActions(['setIntroduces']),
            // 下一步，进入todoList主页面，点击后当前路由下不再显示该组件
            nextStep () {
                this.loading = true;
                this.timer = setTimeout(() => {
                    this.isNext = true;
                    clearTimeout(this.timer);
                    this.timer2 = setTimeout(() => {
                        let arr = {};
                        arr[this.$route.path.slice(1)] = 0;
                        // 点击后当前路由下不再显示该组件
                        this.setIntroduces({...this.onceIntroduces, ...arr});
                        this.loading = false;
                        clearTimeout(this.timer2);
                    }, 700);
                }, 700)
            }
        },
        beforeDestroy() {
            clearTimeout(this.timer);
            clearTimeout(this.timer2);
        }
    }
</script>

<style lang="stylus" scoped>
    .my-card
        max-width: 80%
        margin 50px auto 0
        font-size .2rem
</style>
