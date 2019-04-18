// https://vuex.vuejs.org/en/mutations.html

export default {
  updateUser: (state, payload) => {
    state.user = { ...payload };
  },

  updateData: (state, payload) => {
    state.data = { ...payload };
  },

  updateEvaluations: (state, payload) => {
    state.evaluations = payload;
  }
}
