import { createStore } from "vuex";

import auth from "@/store/modules/auth";
import feed from "@/store/modules/feed";
import tags from "@/store/modules/tags";
import article from "@/store/modules/article";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    tags,
    article
  },
});
