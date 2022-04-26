export default {
    namespaced: true,
    state: () => ({
        currentMode: 'light',
        showModals: false,
        currentView: ''
    }),
    getters: {
        currentMode(state) {
            return state.currentMode
        },
        currentView(state) {
            return state.currentView;
        },
        showModals(state) {
            return state.showModals;
        },
    },
    mutations: {
        SWITCH_MODE(state, payload) {
            state.currentMode = payload.currentMode;
        },
        DISPLAY_MODAL(state, payload) {
            state.showModals = true;
        },
        SET_CURRENT_VIEW(state, payload) {
            state.currentView = payload.currentView;
        }

    },
    actions: {
        changeMode(context, payload) {
            context.commit('SWITCH_MODE', { currentMode: payload.currentMode })
        },
        showModals(context, payload) {
            context.commit('DISPLAY_MODAL');
            context.commit('SET_CURRENT_VIEW', { currentView: payload.currentView });

        }
    },
};
