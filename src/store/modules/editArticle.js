import articleApi from "@/api/article";

const state = {
  isSubmiting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
};

export const mutationTypes = {
  updateArticleStart: "[updateArticle] updateArticleStart",
  updateArticleSucces: "[updateArticle] updateArticleSucces",
  updateArticleFailure: "[updateArticle] updateArticleFailure",

  getArticleStart: "[updateArticle] getArticleStart",
  getArticleSucces: "[updateArticle] getArticleSucces",
  getArticleFailure: "[updateArticle] getArticleFailure",
};

export const actionTypes = {
  updateArticle: "[updateArticle] updateArticle",
  getArticle: "[updateArticle] getArticle",
};

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmiting = true;
  },

  [mutationTypes.updateArticleSucces](state) {
    state.isSubmiting = false;
  },

  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmiting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
  },

  [mutationTypes.getArticleSucces](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },

  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.updateArticle](context, { slug, articleInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateArticleStart);
      articleApi
        .updateArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationTypes.updateArticleSucces, article);
          resolve(article);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateArticleFailure,
            result.response.data.errors
          );
        });
    });
  },

  [actionTypes.getArticle](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart);
      articleApi
        .getArticle(slug)
        .then((article) => {
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
