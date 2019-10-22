<template>
    <div class="todo-wrapper">
        <DemoInfo v-if="showIntroduces" :textList="todoInfoText" />
        <div v-else>
            <AddTodo @isChange="isChange" />
            <VisibilityFilter @isChange="isChange" />
            <SearchTodo @isChange="isChange"/>
            <Todos class="q-pa-md animated" :class="changeTab && 'fadeIn'" @isChange="isChange" />
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import DemoInfo from '../public/demoInfo';
    import AddTodo from './addTodo';
    import VisibilityFilter from './visibilityFilter';
    import SearchTodo from './searchTodo';
    import Todos from './todos';

    export default {
        data() {
            return {
                changeTab: false,
                todoInfoText: {
                    title: '一个用vuex实现的待办事项列表',
                    technology: '主要技术： vuex、组件化开发、stylus、ES6、Material Icons、动画衔接、页面设计',
                    description : '项目描述：demo总共分为了5个组件，支持增删改查四个操作，交互时运用了大量的动效衔接，所有的增删改查操作都通过定义在todoListActions.js中的actions方法完成，充分利用了vuex的特性，并且在定义mutations时使用了优化写法， 定义actions时使用了模块化写法，让整个vuex中的代码变得简洁以及便于维护。'
                }
            }
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
                }, 500)
            }
        },
        beforeDestroy() {
            clearTimeout(this.timer)
        },
        components: {
            DemoInfo,
            AddTodo,
            VisibilityFilter,
            SearchTodo,
            Todos
        }
    }
</script>

<style lang="stylus" scoped>

</style>
