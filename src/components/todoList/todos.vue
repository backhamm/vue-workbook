<template>
    <div>
        <!--特殊处理key值，既要保证唯一性，又要在每次todos列表改变时而改变(保证唯一性是为了在非'全部'状态下，向右滑动区块后，区块能正常显示，保持可变性是为了每次todos列表改变时，保证每个todo的视差背景图能够重新正确的渲染)-->
        <div class="q-pa-md" v-for="(val, i) of todoList" :key="val.todo + i">
            <q-card>
                <q-parallax src="bg.jpg" :height="150"/>
                <q-slide-item @left="(params) => onLeft(params, val.todo)" @right="onRight(val.todo)">
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
                            <q-tooltip
                                    transition-show="scale"
                                    transition-hide="scale"
                            >
                                点击修改
                            </q-tooltip>
                            <q-popup-edit v-model="newTodo" color="secondary" @save="updateTodo(val.todo)" buttons label-set="确定" label-cancel="取消">
                                <q-input v-model="newTodo" color="secondary" dense autofocus />
                            </q-popup-edit>
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
    import {mapState, mapGetters, mapActions} from 'vuex';

    export default {
        data() {
            return {
                newTodo: ''
            }
        },
        computed: {
            ...mapState(['visibilityFilter', 'searchTodo', 'todoList']),
            ...mapGetters(['doneTodoList']),
            todoList() {
                let searchTodo = this.searchTodo.trim();
                // 当搜索框有值时，将todos列表进行过滤
                return searchTodo ? this.doneTodoList.filter(el => el.todo.indexOf(searchTodo) > -1) : this.doneTodoList;
            }
        },
        mounted() {
            this.$emit('isChange');
        },
        methods: {
            ...mapActions(['addTodoList', 'toggleTodoList', 'spliceTodoList', 'updateTodoList']),

            updateTodo(oldTodo) {
                // 当修改框不为空时继续判断修改的值是否已经存在于todoList里
                this.newTodo && (this.todoList.some(el => el.todo === this.newTodo) ? this.$q.notify({
                    message: '该事项已存在！',
                    color: 'deep-orange',
                    position: 'top-left',
                    timeout: 1800
                }) : this.updateTodoList([oldTodo, this.newTodo]));
                this.newTodo = ''
            },
            // 点击左侧按钮或向右滑动区块来改变Todo的状态(进行中/已完成)
            onLeft(reset, todo) {
                // 当前没有选中显示全部时，切换状态将触发fade过渡动画
                this.visibilityFilter !== '全部' && this.$emit('isChange');
                if (typeof reset === 'string') {
                    // 点击左侧按钮时触发
                    this.toggleTodoList(reset);
                } else {
                    // 向右滑动区块时触发
                    this.toggleTodoList(todo);
                    // 当前选中显示'全部'时向右滑动区块将触发区块回弹
                    this.visibilityFilter === '全部' && this.finalize(reset.reset)
                }
            },

            // 删除Todo（向左滑动区块）
            onRight(todo) {
                this.$emit('isChange');
                this.spliceTodoList(todo);
            },

            // Todo详情区块滑动后复原
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
