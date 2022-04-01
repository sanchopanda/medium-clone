<template>
  <mcv-loading v-if="isLoading" />
  <mcv-error-message v-if="error"/>
  <div class="sidebar" v-if="tags">
    <p>Popular Tags</p>
    <div class="tag-list">
      <router-link
        v-for="(tag, index) in tags"
        :key="index"
        :to="{ name: 'tag', params: { slug: tag } }"
        class="tag-default tag-pill"
      >
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/tags";
import McvLoading from "@/components/Loading";
import McvErrorMessage from "@/components/ErrorMessage";

export default {
  name: "McvPopularTags",
  computed: {
    ...mapState({
      isLoading: (state) => state.tags.isLoading,
      tags: (state) => state.tags.data,
      error: (state) => state.tags.error,
    }),
  },
  components: {
    McvLoading,
    McvErrorMessage 
  },
  mounted() {
    this.fetchTags();
  },
  methods: {
    fetchTags() {
      this.$store.dispatch(actionTypes.getTags);
    },
  },
};
</script>
