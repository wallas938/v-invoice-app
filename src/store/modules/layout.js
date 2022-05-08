export default {
    namespaced: true,
    state: () => ({
        currentMode: 'light',
        showModals: false,
        currentView: '',
        currentViewHeight: '100%',
        form_mode_is_edit: false
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
        currentViewHeight(state) {
            return state.currentViewHeight;
        },
        form_mode_is_edit(state) {
            return state.form_mode_is_edit;
        }
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
        },
        SET_FORM_HEIGHT(state, payload) {
            state.currentViewHeight = payload.currentViewHeight;
        },
        SET_FORM_MODE(state, payload) {
            state.form_mode_is_edit = payload.form_mode_is_edit;
        },

    },
    actions: {
        changeMode(context, payload) {
            context.commit('SWITCH_MODE', { currentMode: payload.currentMode })
        },
        showModals(context, payload) {
            context.commit('DISPLAY_MODAL');
            context.commit('SET_CURRENT_VIEW', { currentView: payload.currentView });

        },
        setCurrentViewHeight(context, payload) {
            context.commit('SET_FORM_HEIGHT', { currentViewHeight: payload.currentViewHeight })
        },
        setFormMode(context, payload) {
            context.commit('SET_FORM_MODE', { form_mode_is_edit: payload.form_mode_is_edit })
        },

    },
};
