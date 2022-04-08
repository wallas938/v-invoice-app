import { createStore } from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';


// Create a new store instance.
export default createStore({
    state() {
        return {
            invoices: []
        }
    },
    mutations: mutations,
    actions: actions,
    getters: getters
})