import authApi from "@/api/auth";

const state = {
  isSubmiting: false,
};

const mutations = {
  registerStart(state) {
    state.isSubmiting = true;
  },

  registerSucces(state) {
    state.isSubmiting = false;
  },

  registerFailure(state) {
    state.isSubmiting = false;
  },
};

const actions = {
  register(context, credentials) {
      console.log(1)
    return new Promise((resolve) => {
      context.commit("registerStart");
      authApi
        .register(credentials)
        .then((response) => {
          context.commit("registerSucces", response.data.user);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit("registerFailure", result.response.data.errors);
          console.log(result.response.data);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
