export const publicActions = {
    // 每个demo的描述信息（只在首次进入时显示）
    setIntroduces({commit}, val) {
        commit('SET_STATE', ['onceIntroduces', val])
    }
};
