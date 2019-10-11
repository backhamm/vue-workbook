export const todoListActions = {
    // 初始化todoList
    setTodoList({commit}, val) {
        commit('SET_STATE', ['todoList', val])
    },

    // 设置显示不同状态的todoList
    setVisibilityFilter({commit}, val = '全部') {
        commit('SET_STATE', ['visibilityFilter', val])
    },

    // 切换todo的状态
    toggleTodoList({commit, state}, val) {
        let value = state.todoList.map(el => (val === el.todo ? {...el, completed: !el.completed} : el));
        commit('SET_STATE', ['todoList', value])
    },

    // 添加todo
    addTodoList({commit}, todo) {
        let value = {todo, completed: false};
        commit('UNSHIFT_STATE', ['todoList', value])
    },

    // 删除todo
    spliceTodoList({commit}, val) {
        commit('SPLICE_STATE', ['todoList', val])
    }
};

