import articleApi from "@/api/article";

const state = {
  isSubmiting: false,
  validationErrors: null,
};

export const mutationTypes = {
  createArticleStart: "[createArticle] createArticleStart",
  createArticleSucces: "[createArticle] createArticleSucces",
  createArticleFailure: "[createArticle] createArticleFailure",
};

export const actionTypes = {
  createArticle: "[createArticle] createArticle",
};

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmiting = true;
  },

  [mutationTypes.createArticleSucces](state) {
    state.isSubmiting = false;
  },

  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmiting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.createArticle](context, { articleInput }) {
    console.log()
    return new Promise((resolve) => {
      context.commit(mutationTypes.createArticleStart);
      articleApi
        .createArticle(articleInput)
        .then((article) => {
          context.commit(mutationTypes.createArticleSucces, article);
          resolve(article);
        })
        .catch((result) => {
          console.log(result.response.data.errors.title)
          context.commit(
            mutationTypes.createArticleFailure,
            result.response.data.errors
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
