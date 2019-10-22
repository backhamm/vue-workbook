<template>
    <q-list class="search-list" bordered separator>
        <q-item clickable v-for="val in todoList" :key="val.todo" @click="searchTodos(val.todo)">
            <q-item-section>{{val.todo}}</q-item-section>
        </q-item>
        <q-item v-show="!todoList.length">
            <q-item-section>暂无搜索结果</q-item-section>
        </q-item>
    </q-list>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        props: ['inputVal'],
        computed: {
            ...mapGetters(['doneTodoList']),
            todoList() {
                // 为了更好的体验，搜索栏默认值从最先加入的todo开始排序，因此需要将数组翻转，翻转数组会影响原数组，因此使用克隆。
                let todos = JSON.parse(JSON.stringify(this.doneTodoList)).reverse();
                todos = !this.inputVal.trim() ? todos : todos.filter(el => el.todo.indexOf(this.inputVal.trim()) > -1);
                // 显示前6条数据
                return todos.slice(0, 6)
            }
        },
        methods: {
            ...mapActions(['setSearchTodo']),
            searchTodos(val) {
                this.$emit('searchTodos', val);
                this.$emit('showSearchList');
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .search-list
        width 100%
        position absolute
        z-index 9
        background-color rgba(255, 255, 255, .8)
    .animated
        animation-duration .3s
</style>
