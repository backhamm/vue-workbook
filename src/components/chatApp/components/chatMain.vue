<template>
    <div class="chat-main">
        <q-scroll-area class="chat-wrapper" ref="scrollArea">
            <div class="q-pa-md row justify-center">
                <div style="width: 100%;" class="chat-scroll-wrapper">
                    <q-chat-message
                            label="hello world"
                    />

                    <q-chat-message
                            v-for="(val, i) in chatInfo.messageList"
                            :key="i"
                            text-sanitize
                            :name="val.name"
                            :avatar="`http://flathash.com/${val.name}`"
                            :text="val.textArr"
                            :sent="val.name === userName"
                            :bg-color="val.name === userName ? 'amber-7' : ''"
                            :stamp="sendTime(val.sendTime)"
                    />
                </div>
            </div>
        </q-scroll-area>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        data() {
            return {}
        },
        methods: {
            betterTime(val) {
                return val < 10 ? '0' + val : val
            },
            sendTime(val) {
                let sendTime = new Date(val);
                let now = new Date();
                if (sendTime.getFullYear() !== now.getFullYear() && sendTime.getMonth() !== now.getMonth() && sendTime.getDate() !== now.getDate()) {
                    return `${sendTime.getFullYear()}/${this.betterTime(sendTime.getMonth() + 1)}/${this.betterTime(sendTime.getDate())}`
                } else {
                    return `${this.betterTime(sendTime.getHours())}:${this.betterTime(sendTime.getMinutes())}:${this.betterTime(sendTime.getSeconds())}`
                }
            }
        },
        computed: {
            ...mapState(['chatInfo', 'userName']),
        },
        watch: {
            'chatInfo.messageList'() {
                this.$nextTick(() => {
                    let listHeight = document.getElementsByClassName('chat-scroll-wrapper')[0].offsetHeight;
                    this.$refs.scrollArea.setScrollPosition(listHeight, 300);
                });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .chat-main
        height: calc(100vh - 50px)
        padding-bottom 80px
        text-align left

        .chat-wrapper
            height 100%
</style>
