<template>
    <div>
        <div class="todo-item q-pa-md" v-for="(val, i) of todos" :key="val.todo">
            <q-card class="my-card">
                <q-parallax src="bg.jpg" :height="150"/>
                <q-slide-item @left="(params) => onLeft(params, val.todo)" @right="onRight(i)">
                    <template v-slot:left>
                        <q-icon :name="val.completed ? 'alarm_on' : 'alarm'"/>
                        {{val.completed ? '已完成' : '进行中'}}
                    </template>
                    <template v-slot:right>
                        删除
                        <q-icon name="clear"/>
                    </template>

                    <q-card-section>
                        <q-btn class="left-icon" round :color="val.completed ? 'deep-orange' : 'secondary'" @click="onLeft(val.todo)" :icon="val.completed ? 'alarm_on' : 'alarm'">
                            <q-tooltip
                                    transition-show="flip-left"
                                    transition-hide="scale"
                            >
                                按住鼠标，左右滑动区块！
                            </q-tooltip>
                        </q-btn>
                        <div class="text-h6" :style="{textDecoration: val.completed ? 'line-through' : 'none'}">
                            {{val.todo}}
                        </div>
                        <div class="text-subtitle2">
                            <q-icon name="keyboard_arrow_left" />
                            可左右滑动区块
                            <q-icon name="keyboard_arrow_right" />
                        </div>
                        <q-btn class="right-icon" round color="deep-orange" icon="clear">
                            <q-tooltip
                                    transition-show="rotate"
                                    transition-hide="flip-left"
                            >
                                按住鼠标，左右滑动区块！
                            </q-tooltip>
                        </q-btn>
                    </q-card-section>
                </q-slide-item>
            </q-card>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    export default {
        computed: {
            ...mapState(['todoList', 'visibilityFilter']),
            todos() {
                switch (this.visibilityFilter) {
                    case '进行中':
                        return this.todoList.filter(el => !el.completed);
                    case '已完成':
                        return this.todoList.filter(el => el.completed);
                    case '全部':
                    default:
                        return this.todoList.map(el => el);
                }
            }
        },
        methods: {
            ...mapActions(['addTodoList', 'toggleTodoList', 'spliceTodoList']),

            // 改变Todo完成状态（点击左侧按钮或向右滑动区块）
            onLeft(reset, todo) {
                this.visibilityFilter !== '全部' && this.$emit('isChange');
                if (typeof reset === 'string') {
                    this.toggleTodoList(reset);
                } else {
                    this.toggleTodoList(todo);
                    this.visibilityFilter === '全部' && this.finalize(reset.reset)
                }
            },

            // 删除Todo（向左滑动区块）
            onRight(index) {
                this.$emit('isChange');
                this.spliceTodoList(index);
            },

            // Todo详情区块向右滑动后复原
            finalize(reset) {
                this.timer = setTimeout(() => {
                    reset();
                    clearTimeout(this.timer)
                }, 100)
            },
        },
        beforeDestroy() {
            clearTimeout(this.timer)
        }
    }
</script>

<style lang="stylus" scoped>
    offset = 20px
    .todo-wrapper
        padding 20px 10px 0

        .q-card__section
            padding 16px 75px

        .left-icon
            position absolute
            bottom offset
            left offset

        .right-icon
            position absolute
            bottom offset
            right offset
</style>
