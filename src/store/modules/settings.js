import { mutationTypes as authMutationTypes } from "@/store/modules/auth";

const state = {
  isSubmiting: false,
  validationErrors: null,
};

const mutations = {
  [authMutationTypes.updateCurrentUserStart](state) {
    state.isSubmiting = true;
    state.validationErrors = null;
  },

  [authMutationTypes.updateCurrentUserSucces](state) {
    state.isSubmiting = false;
  },

  [authMutationTypes.updateCurrentUserFailure](state, payload) {
    state.isSubmiting = false;
    state.validationErrors = payload;
  },
};

export default {
  state,
  mutations,
};
