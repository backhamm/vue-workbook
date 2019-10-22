<template>
    <div class="search-wrapper" @click="hideSearchList">
        <q-input v-model="inputVal" :input-style="{padding: '0 10px'}" dense color="secondary" @keyup.13="searchTodos" @focus="showSearchList(1)">
            <template v-slot:append>
                <q-btn round dense flat icon="search" @click="searchTodos"/>
            </template>
        </q-input>
        <SearchList class="animated" :class="enterAnimated ? 'zoomIn' : 'zoomOut'" v-show="isShow" :inputVal="inputVal" @showSearchList="showSearchList" @searchTodos="searchTodos" />
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import SearchList from './searchList'

    export default {
        data() {
            return {
                inputVal: '',
                isShow: false,
                enterAnimated: true
            }
        },
        computed: mapState(['searchTodo']),
        mounted() {
            this.inputVal = this.searchTodo;
        },
        methods: {
            ...mapActions(['setSearchTodo']),

            // 点击搜索组件以外的地方调用showSearchList方法，隐藏搜索列表组件
            hideSearchList() {
                document.addEventListener('click', (e) => {
                    !this.$el.contains(e.target) && this.showSearchList()
                });
            },
            // 搜索函数
            searchTodos(val = '') {
                if (val) {
                    this.inputVal = val;
                }
                this.setSearchTodo(this.inputVal);
                this.$emit('isChange');
            },
            // 输入框选中时第一层判断为显示搜索列表，并在添加退场动画
            showSearchList(type) {
                if (type) {
                    this.enterAnimated = true;      // 将搜索列表的动画设置为进场动画(zoomIn)
                    this.isShow = true
                } else {
                    this.$nextTick(() => {
                        this.enterAnimated = false;     // 将搜索列表的动画设置为退场动画(zoomOut)
                        this.timer2 = setTimeout(() => {    // 等待搜索列表退场动画结束，隐藏搜索列表DOM
                            this.isShow = false;
                            clearTimeout(this.timer2)
                        }, 300);
                    })
                }
            }
        },
        watch: {
            // 当输入框的新值与旧值不等时(避免重复搜索)，判断监听到搜索框的值是否重新为空，为空则通过vuex告诉todos组件渲染当前状态下的全部todos，并调用fade过渡动画，否则不为空表示监听到搜索框的值在变化，则显示相匹配的搜索列表
            inputVal(val, oldVal) {
                val !== oldVal && (!val ? this.setSearchTodo(val) && this.$emit('isChange') : this.showSearchList(1))
            }
        },
        beforeDestroy() {
            clearTimeout(this.timer);
            clearTimeout(this.timer2)
        },
        components: {
            SearchList
        }
    }
</script>

<style lang="stylus" scoped>
    .search-wrapper
        position relative
        padding 20px 0
        width 240px
        margin 0 auto
</style>
