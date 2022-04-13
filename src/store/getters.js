export default {
    invoices(state) {
        if (state.filters.length <= 0) {
            return state.invoices;
        }
        return state.invoices.filter((invoice) => state.filters.includes(invoice.status.toLowerCase()));
    },
    filters(state) {
        return state.filters;
    }
}