import tagsApi from "@/api/tags";
// import { setItem } from "@/helpers/persistanceStorage";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getTagsStart: "[tags] getTagsStart",
  getTagsSucces: "[tags] getTagsSucces",
  getTagsFailure: "[tags] getTagsFailure",
};

export const actionTypes = {
  getTags: "[tags] getTags",
};

const mutations = {
  [mutationTypes.getTagsStart](state) {
    state.isLoading = true;
    state.data = null;
  },

  [mutationTypes.getTagsSucces](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },

  [mutationTypes.getTagsFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getTags](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getTagsStart);
      tagsApi
        .getTags()
        .then((tags) => {
          context.commit(mutationTypes.getTagsSucces, tags);
          resolve(tags);
        })
        .catch(() => {
          context.commit(mutationTypes.getTagsFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
