import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";

const state = {
  isSubmiting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  registerStart: "[auth] registerStart",
  registerSucces: "[auth] registerSucces",
  registerFailure: "[auth] registerFailure",

  loginStart: "[auth] loginStart",
  loginSucces: "[auth] loginSucces",
  loginFailure: "[auth] loginFailure",

  getCurrentUserStart: "[auth]  getCurrentUserStart",
  getCurrentUserSucces: "[auth]  getCurrentUserSucces",
  getCurrentUserFailure: "[auth]  getCurrentUserFailure",

  updateCurrentUserStart: "[auth]  updateCurrentUserStart",
  updateCurrentUserSucces: "[auth]  updateCurrentUserSucces",
  updateCurrentUserFailure: "[auth]  updateCurrentUserFailure",

  logout: "[auth] logout",
};

export const actionTypes = {
  register: "[auth] register",
  login: "[auth] login",
  getCurrentUser: "[auth] getCurrentUser",
  updateCurrentUser: "[auth] updateCurrentUser",
  logout: "[auth] logout",
};

export const getterTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonymous: "[auth]  isAnonymous",
};

const getters = {
  [getterTypes.currentUser]: (state) => state.currentUser,
  [getterTypes.isLoggedIn]: (state) => Boolean(state.isLoggedIn),
  [getterTypes.isAnonymous]: (state) => state.isLoggedIn === false,
};

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

  [mutationTypes.loginStart](state) {
    state.isSubmiting = true;
    state.validationErrors = null;
  },

  [mutationTypes.loginSucces](state, payload) {
    state.isSubmiting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },

  [mutationTypes.loginFailure](state, payload) {
    state.isSubmiting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },

  [mutationTypes.getCurrentUserSucces](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },

  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },

  [mutationTypes.updateCurrentUserStart]() {},

  [mutationTypes.updateCurrentUserSucces](state, payload) {
    state.currentUser = payload;
  },

  [mutationTypes.updateCurrentUserFailure]() {},

  [mutationTypes.logout](state) {
    state.currentUser = null;
    state.isLoggedIn = false;
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
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.registerFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart);
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSucces, response.data.user);
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.loginFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSucces,
            response.data.user
          );
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure);
        });
    });
  },

  [actionTypes.updateCurrentUser](context, { currentUserInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateCurrentUserStart);
      authApi
        .updateCurrentUser(currentUserInput)
        .then((user) => {
          context.commit(mutationTypes.updateCurrentUserSucces, user);
          resolve(user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateCurrentUserFailure,
            result.response.data.errors
          );
        });
    });
  },

  [actionTypes.logout](context) {
    return new Promise((resolve) => {
      setItem("accessToken", "");
      context.commit(mutationTypes.logout);
      resolve()
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
