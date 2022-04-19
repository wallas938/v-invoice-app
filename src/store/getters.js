export default {
    invoices(state) {
        if (state.filters.length <= 0) {
            return state.invoices;
        }
        return state.invoices.filter(invoice => state.filters.includes(invoice.status.toLowerCase()));
    },
    invoice(state) {
        return state.invoice;
    },
    filters(state) {
        return state.filters;
    }
}