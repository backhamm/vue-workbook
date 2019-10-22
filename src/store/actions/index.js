// 公共的actions
import {publicActions} from "./publicActions";
// 代办事项列表的actions
import {todoListActions} from "./todoListActions";
// 聊天页面的actions
import {chatAppActions} from './chatAppActions';

export const actions = {
    ...publicActions,
    ...chatAppActions,
    ...todoListActions
};
