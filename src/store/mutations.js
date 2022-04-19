export default {
    UPDATE_FILTERS(state, payload) {
        state.filters = payload.filters
    },
    REMOVE_INVOICE(state, payload) {
        state.invoices = payload.invoices;
    },
    SET_INVOICE_CODE(state, payload) {
        state.invoice = payload.invoice;
    }
}