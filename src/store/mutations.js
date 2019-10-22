export const mutations = {
    // 公用的mutations，可根据传入的key值，改变不同的state值
    SET_STATE(state, [key, val]) {
        state[key] = val
    },
    UNSHIFT_STATE(state, [key, val]) {
        state[key].unshift(val)
    },
    SPLICE_STATE(state, [key, val]) {
        state[key].splice(val, 1)
    }
};
