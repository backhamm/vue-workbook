<template>
    <div class="q-pa-md bounceInLeft animated">
        <q-btn-group push>
            <q-btn
                    v-for="val in visibilityBtn"
                    :key="val.name"
                    :color="visibilityFilter === val.name ? 'amber' : 'white'"
                    glossy
                    text-color="black"
                    push
                    :label="val.name"
                    :icon="val.icon"
                    @click="changeTodos(val.name)"
            />
        </q-btn-group>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                visibilityBtn: [
                    {name: '全部', icon: 'visibility'},
                    {name: '进行中', icon: 'alarm'},
                    {name: '已完成', icon: 'alarm_on'}
                ]
            }
        },
        computed: mapState(['visibilityFilter']),
        methods: {
            ...mapActions(['setVisibilityFilter']),

            // 改变当前显示Todo类型（全部 || 进行中 || 已完成）
            changeTodos(val) {
                this.setVisibilityFilter(val);
                this.$emit('isChange');
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
