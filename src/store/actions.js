// https://vuex.vuejs.org/en/actions.html
import axios from "axios";
import { async } from "q";

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
    console.log(res.data); 
    commit("updateEvaluations", res.data);
    return;
  },

  submitEvaluation: async(_, payload) => {
    return await axios.post(API_URL + 'evaluation', {evaluation: payload});
  }
}
