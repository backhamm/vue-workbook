<template>
    <div>
        <q-item clickable v-ripple v-for="(val, i) in chatInfo.userList" :key="i" :class="val.online && 'is-online'" @click="alertMsg">
            <q-item-section avatar>
                <q-icon :name="val.online ? 'sentiment_satisfied_alt' : 'wifi_off'"/>
            </q-item-section>
            <q-item-section>
                {{val.name}}
            </q-item-section>
        </q-item>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        data() {
            return {
                count: 0
            }
        },
        computed: mapState(['chatInfo']),
        methods: {
            alertMsg() {
                this.count++;
                this.count > 2 && this.$q.notify({
                    message: '别点了，没有其他功能了',
                    color: 'amber-7',
                    position: 'top-left',
                    timeout: 1800
                });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/quasar.variables.styl"
    .is-online
        color $secondary
</style>
