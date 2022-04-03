import articleApi from "@/api/article";
// import { setItem } from "@/helpers/persistanceStorage";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getArticleStart: "[article] getArticleStart",
  getArticleSucces: "[article] getArticleSucces",
  getArticleFailure: "[article] getArticleFailure",
};

export const actionTypes = {
  getArticle: "[article] getArticle",
};

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },

  [mutationTypes.getArticleSucces](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },

  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart);
      articleApi
        .getArticle(slug)
        .then(article => {
          context.commit(mutationTypes.getArticleSucces, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
