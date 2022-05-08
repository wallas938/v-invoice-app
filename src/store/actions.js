export default {
    handleFilters({ dispatch, commit, getters, rootGetters }, payload) {
        /* add a new filter or remove it if it was already added */
        const filters = [...getters.filters].includes(payload.filter)
            ? [...getters.filters].filter((f) => f !== payload.filter)
            : [...getters.filters, payload.filter];

        commit('UPDATE_FILTERS', { filters: filters });
    },
    removeInvoice({ dispatch, commit, getters, rootGetters }, payload) {
        /* add a new filter or remove it if it was already added */
        console.log(payload.invoiceCode);
        const invoices = [...getters.invoices]
            .filter(invoice => {
                return invoice.invoiceCode !== payload.invoiceCode;
            });

        commit('REMOVE_INVOICE', { invoices: invoices });
    },
    setCurrentInvoice({ dispatch, commit, getters, rootGetters }, payload) {
        const invoice = [...getters.invoices]
            .find(invoice => {
                return invoice.invoiceCode === payload.invoiceCode;
            });
        if (invoice) {
            commit('SET_INVOICE', { invoice: invoice });
            return;
        }
        commit('SET_INVOICE', { invoice: null });
    },
    markAsPaid({ dispatch, commit, getters, rootGetters }, payload) {
        const invoices = [...getters.invoices]
            .map(invoice => {
                if (invoice.invoiceCode === payload.invoiceCode) {
                    invoice.status = 'Paid'
                    return invoice
                }

                return invoice;
            });

        commit('MARK_AS_PAID', { invoices: invoices });
    },
    addInvoice({ dispatch, commit, getters, rootGetters }, payload) {
        let invoices = [...getters.invoices];

        if (getters['layout/form_mode_is_edit']) {
            invoices = [...getters.invoices].filter((invoice) => invoice.invoiceCode !== payload.invoice.invoiceCode);
        }
        invoices = [...invoices, payload.invoice];
        commit('ADD_NEW_INVOICE', { invoices: invoices });
        commit('SET_INVOICE', { invoice: payload.invoice });
    }
}