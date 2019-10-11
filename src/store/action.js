// 公共的actions
import {publicActions} from "./actions/publicActions";
// 代办事项列表的actions
import {todoListActions} from "./actions/todoListActions";
// 聊天页面的actions
import {chatAppActions} from './actions/chatAppActions';

export const actions = {
    ...publicActions,
    ...chatAppActions,
    ...todoListActions
};
