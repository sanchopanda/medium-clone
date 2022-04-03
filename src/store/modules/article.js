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

  deleteArticleStart: "[article] deleteArticleStart",
  deleteArticleSucces: "[article] deleteArticleSucces",
  deleteArticleFailure: "[article] deleteArticleFailure",
};

export const actionTypes = {
  getArticle: "[article] getArticle",
  deleteArticle: "[article] deleteArticle",
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

  [mutationTypes.deleteArticleStart]() {},

  [mutationTypes.deleteArticleSucces]() {},

  [mutationTypes.deleteArticleFailure]() {},
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

  [actionTypes.deleteArticle](context, {slug}) {
 
    return new Promise((resolve) => {      
      context.commit(mutationTypes.deleteArticleStart);
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.deleteArticleSucces);
          resolve();
        })
        .catch(() => {
          context.commit(mutationTypes.deleteArticleFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
