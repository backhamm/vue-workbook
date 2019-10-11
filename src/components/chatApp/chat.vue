<template>
    <div class="animated fadeIn">
        <ChatMain/>
        <ChatInput/>
    </div>
</template>

<script>
    import ChatMain from './components/chatMain';
    import ChatInput from './components/chatInput';

    export default {
        components: {
            ChatMain,
            ChatInput
        }
    }
</script>

<style lang="stylus" scoped>

</style>
