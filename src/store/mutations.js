export default {
    UPDATE_FILTERS(state, payload) {
        state.filters = payload.filters
    },
    REMOVE_INVOICE(state, payload) {
        state.invoices = payload.invoices;
    },
    SET_INVOICE(state, payload) {
        state.invoice = payload.invoice;
    },
    MARK_AS_PAID(state, payload) {
        state.invoices = payload.invoices;
    },
    ADD_NEW_INVOICE(state, payload) {
        state.invoices = payload.invoices;
        console.log(state);
    }
}