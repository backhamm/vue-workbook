export const getters = {
    // 点击'进行中'、'已完成'、'全部'按钮时visibilityFilter的值改变，vue的响应机制会自动重新过滤出不同的todo列表
    doneTodoList(state) {
        switch (state.visibilityFilter) {
            case '进行中':
                return state.todoList.filter(el => !el.completed);
            case '已完成':
                return state.todoList.filter(el => el.completed);
            case '全部':
            default:
                return state.todoList.map(el => el);
        }
    }
};
