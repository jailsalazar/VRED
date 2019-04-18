// https://vuex.vuejs.org/en/actions.html
import axios from "axios";

const API_URL = "https://vred19.herokuapp.com/api/"

export default {
  getUser: async({commit}) => {
    let res = await axios.get(API_URL + 'users');
    commit("updateUser", res.data);
    return;
  },

  getData: async({commit}) => {
    let res = await axios.get(API_URL + 'data');
    commit("updateData", res.data);
    return;
  },

  getEvaluations: async({commit}) => {
    let res = await axios.get(API_URL + 'evaluation');
    commit("updateEvaluations", res.data);
    return;
  }
}
