<template>
    <div>
        <q-item clickable v-ripple v-for="(val, i) in chatInfo.userList" :key="i" :class="val.online && 'is-online'">
            <q-item-section avatar>
                <q-icon :name="val.online ? 'sentiment_satisfied_alt' : 'sentiment_very_dissatisfied'"/>
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
        computed: {
            ...mapState(['chatInfo'])
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../styles/quasar.variables.styl"
    .is-online
        color $secondary
</style>
