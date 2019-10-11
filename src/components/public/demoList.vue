<template>
    <div>
        <router-link v-for="val of sidebarList" :to="val.link" :key="val.title">
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon :name="val.icon"/>
                </q-item-section>

                <q-item-section>
                    {{val.title}}
                </q-item-section>
            </q-item>
        </router-link>
    </div>
</template>

<script>
    export default {
        props: ['sidebarList']
    }
</script>

<style lang="stylus" scoped>

</style>
