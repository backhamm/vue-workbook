<template>
    <div class="todo-wrapper">
        <DemoInfo v-if="showIntroduces" :textList="todoInfoText" />
        <div v-else>
            <AddTodo @isChange="isChange" />
            <VisibilityFilter @isChange="isChange" />
            <Todos class="q-pa-md animated" :class="changeTab && 'fadeIn'" @isChange="isChange" />
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import DemoInfo from '../public/demoInfo';
    import AddTodo from './addTodo';
    import Todos from './todos';
    import VisibilityFilter from './visibilityFilter';

    export default {
        data() {
            return {
                changeTab: false,
                todoInfoText: {
                    title: '一个vuex实现的待办事项列表',
                    technology: '主要技术： vuex、父子组件通信、组件化开发、stylus、ES6、Material Icons、动画衔接'
                }
            }
        },
        mounted() {
            this.isChange()
        },
        computed: {
            ...mapState(['onceIntroduces']),
            showIntroduces() {
                return this.onceIntroduces[this.$route.path.slice(1)]
            }
        },
        methods: {
            // 每次列表发生变化时添加过渡效果
            isChange() {
                this.changeTab = true;
                this.timer = setTimeout(() => {
                    this.changeTab = false;
                    clearTimeout(this.timer)
                }, 400)
            }
        },
        beforeDestroy() {
            clearTimeout(this.timer)
        },
        components: {
            DemoInfo,
            AddTodo,
            Todos,
            VisibilityFilter
        }
    }
</script>

<style lang="stylus" scoped>

</style>
