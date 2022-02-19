import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";

const state = {
  isSubmiting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes= {
  registerStart: "[auth] registerStart",
  registerSucces: "[auth] registerSucces",
  registerFailure: "[auth] registerFailure"
}

export const actionTypes= {
  register: "[auth] register"
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmiting = true;
    state.validationErrors = null;
  },

  [mutationTypes.registerSucces](state, payload) {
    state.isSubmiting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },

  [mutationTypes.registerFailure](state, payload) {
    state.isSubmiting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart);
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerSucces, response.data.user);
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(mutationTypes.registerFailure, result.response.data.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
