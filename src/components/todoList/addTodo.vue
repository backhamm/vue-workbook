<template>
    <div class="q-pa-md">
        <q-input color="secondary" v-model="inputVal" label="Todo" @keyup.13="addTodo">
            <template v-slot:prepend>
                <q-icon name="event"/>
            </template>
            <template v-slot:append>
                <div class="q-gutter-lg">
                    <q-btn push color="white" text-color="secondary" label="Add" @click="addTodo"/>
                    <q-btn push color="white" text-color="deep-orange" round icon="clear" @click="inputVal = ''"/>
                </div>
            </template>
        </q-input>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        data() {
            return {
                inputVal: ''
            }
        },
        computed: {
            ...mapState(['todoList'])
        },
        methods: {
            ...mapActions(['addTodoList']),
            //添加Todo
            addTodo() {
                if (this.inputVal.trim()) {
                    if (this.todoList.every(el => el.todo !== this.inputVal)) {
                        this.$emit('isChange');
                        this.addTodoList(this.inputVal);
                    } else {
                        this.$q.notify({
                            message: '该事项已存在！',
                            color: 'amber',
                            position: 'top-left',
                            timeout: 1800
                        });
                    }
                    this.inputVal = '';
                } else {
                    this.$q.notify({
                        message: '添加不能为空！',
                        color: 'amber',
                        position: 'top-left',
                        timeout: 1800
                    });
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
