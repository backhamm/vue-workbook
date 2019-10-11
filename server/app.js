const app = require('express')();
const fs = require('fs');
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);

let chatInfo = JSON.parse(fs.readFileSync('./chatInfo.json'));

function updateChatInfo() {
    io.emit('setChatInfo', chatInfo);
    fs.writeFileSync('./chatInfo.json', JSON.stringify(chatInfo, null, 2));
}

io.on('connection', socket => {
    // 首次连接socket后触发vuex方法
    socket.emit('setIsConnect', 1);
    io.emit('setChatInfo', chatInfo);

    // 登录，由前端发送当前用户信息, 后端返回所有已登录用户列表及聊天记录
    socket.on('login', data => {
        let userList = JSON.parse(JSON.stringify(chatInfo.userList));
        // 没有重名时，直接添加进数组
        if (userList.every(el => el.name !== data.name)) {
            data.id = socket.id;
            userList.push(data);
            chatInfo.userList = userList;
            updateChatInfo();
            socket.emit('loginSuccess', {status: 1, message: '登录成功'})
        } else {        // 重名时，判断是否上线，未上线则更改online状态值，否则通知前端'用户已上线'
            let userIndex = chatInfo.userList.findIndex(el => el.name === data.name);
            chatInfo.userList[userIndex].id = socket.id;
            if (!chatInfo.userList[userIndex].online) {
                chatInfo.userList[userIndex].online = 1;
                updateChatInfo();
                socket.emit('loginSuccess', {status: 1, message: '登录成功'})
            } else {
                socket.emit('loginSuccess', {status: 0, message: '该用户已经上线!'})
            }
        }
    });

    // 发送群聊消息
    socket.on('sendMessage', data => {
        chatInfo.messageList.push(data);
        updateChatInfo()
        // 个人
        // io.to(socket).emit('xx', {})
    });

    // 登出
    socket.on('logout', data => {
        let userIndex = chatInfo.userList.findIndex(el => el.name === data);
        if (userIndex < 0) return;
        chatInfo.userList[userIndex].online = 0;
        updateChatInfo();
        socket.emit('loginSuccess', {status: 0, message: '退出成功!'})
    });

    // 清除未上线用户列表
    socket.on('clearLog', () => {
        if (chatInfo.userList.every(el => el.online)) return;
        chatInfo.userList = chatInfo.userList.filter(el => el.online);
        updateChatInfo();
        socket.emit('loginSuccess', {status: 1, message: '已清除未上线的用户!'})
    });

    // 清除聊天列表
    socket.on('clearMessage', () => {
        if (!chatInfo.messageList.length) return;
        chatInfo.messageList = [];
        updateChatInfo();
        socket.emit('loginSuccess', {status: 1, message: '已清除聊天记录!'})
    });

    // 断线触发
    socket.on('disconnect', () => {
        let userIndex = chatInfo.userList.findIndex(el => el.id === socket.id);
        if (userIndex < 0) return;
        chatInfo.userList[userIndex].online = 0;
        updateChatInfo();
    })
});

http.listen(3000);
