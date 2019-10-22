export const state = {
    todoList: [],
    visibilityFilter: '',
    searchTodo: '',

    // 每个demo描述信息，只在首次加载显示
    onceIntroduces: {},

    // 是否连接socket
    isConnect: 0,

    // 登录信息
    isLogin: {
        status: 0,
        message: ''
    },

    // 用户姓名
    userName: '',

    // 聊天用户列表
    chatInfo: {
        userList: [],
        messageList: []
    },

    // 切换显示聊天用户/demo列表
    showUserList: false
};
