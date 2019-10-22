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
        computed: mapState(['todoList']),
        methods: {
            ...mapActions(['addTodoList']),
            //添加Todo
            addTodo() {
                if (!this.inputVal.trim()) return;
                if (this.todoList.some(el => el.todo === this.inputVal)) {
                    return this.$q.notify({
                        message: '该事项已存在！',
                        color: 'amber-7',
                        position: 'top-left',
                        timeout: 1800
                    });
                }
                this.$emit('isChange');
                this.addTodoList(this.inputVal);
                this.inputVal = '';
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
