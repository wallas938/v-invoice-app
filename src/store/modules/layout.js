export default {
    namespaced: true,
    state: () => ({
        currentMode: 'light'
    }),
    getters: {
        currentMode(state) {
            return state.currentMode
        }
    },
    mutations: {
        changeMode(state, payload) {
            state.currentMode = payload.currentMode;
        }
    },
    actions: {
        changeMode(context, payload) {
            context.commit('changeMode', { currentMode: payload.currentMode })
        }
    },
};
