export default {
    handleFilters(context, payload) {
        /* add a new filter or remove it if it was already added */
        const filters = [...context.getters.filters].includes(payload.filter)
            ? [...context.getters.filters].filter((f) => f !== payload.filter)
            : [...context.getters.filters, payload.filter];

        context.commit('UPDATE_FILTERS', { filters: filters });
    }
}