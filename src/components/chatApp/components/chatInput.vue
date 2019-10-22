<template>
    <div class="chat-input">
        <q-input bottom-slots v-model="inputVal" @keyup.13="sendMessage" autofocus color="secondary">
            <template v-slot:append>
                <q-icon name="send" @click="sendMessage" class="cursor-pointer" />
            </template>
        </q-input>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        data() {
            return {
                inputVal: ''
            }
        },
        computed: mapState(['userName']),
        methods: {
            sendMessage() {
                if (!this.inputVal) return;
                let message = {name: this.userName, textArr: [this.inputVal], sendTime: new Date().getTime()};
                this.$socket.emit('sendMessage', message);
                this.inputVal = ''
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .chat-input
        width 90%
        margin -80px auto 0
</style>
