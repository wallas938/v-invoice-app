export default {
    handleFilters(context, payload) {
        /* add a new filter or remove it if it was already added */
        const filters = [...context.getters.filters].includes(payload.filter)
            ? [...context.getters.filters].filter((f) => f !== payload.filter)
            : [...context.getters.filters, payload.filter];

        context.commit('UPDATE_FILTERS', { filters: filters });
    },
    removeInvoice(context, payload) {
        /* add a new filter or remove it if it was already added */
        const invoices = [...context.getters.invoices]
            .filter(invoice => {
                return invoice.invoiceCode !== payload.invoiceCode;
            });

        context.commit('REMOVE_INVOICE', { invoices: invoices });
    },
    setCurrentInvoice(context, payload) {
        const invoice = [...context.getters.invoices]
            .find(invoice => {
                return invoice.invoiceCode === payload.invoiceCode;
            });
        if (invoice) {
            context.commit('SET_INVOICE', { invoice: invoice });
            return;
        }
        context.commit('SET_INVOICE', { invoice: null });
    },
    markAsPaid(context, payload) {
        const invoices = [...context.getters.invoices]
            .map(invoice => {
                if (invoice.invoiceCode === payload.invoiceCode) {
                    invoice.status = 'Paid'
                    return invoice
                }

                return invoice;
            });

        context.commit('MARK_AS_PAID', { invoices: invoices });
    }
}