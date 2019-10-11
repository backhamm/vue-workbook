export const chatAppActions = {
    // 是否连接socket
    socket_setIsConnect({commit}, val) {
        commit('SET_STATE', ['isConnect', val])
    },
    // 设置聊天列表及聊天用户列表
    socket_setChatInfo({commit}, val) {
        commit('SET_STATE', ['chatInfo', val]);
    },
    setUserName({commit}, val) {
        commit('SET_STATE', ['userName', val]);
    },
    // 设置登录信息
    setIsLogin({commit}, val) {
        commit('SET_STATE', ['isLogin', val]);
    },

    // 登录后侧边栏显示用户列表
    setShowUserList({commit}, val) {
        commit('SET_STATE', ['showUserList', val])
    }
};
