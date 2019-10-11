export const mutations = {
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
