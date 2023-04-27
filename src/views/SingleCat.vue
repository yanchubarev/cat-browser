<template>
  <div>
    <loader v-if="isLoading" />
    <div v-if="cat && !isLoading">
      <CatInfoPanel :cat="cat" />
    </div>

    <div class="mt-5" v-if="!cat && !isLoading">
      <h2>It seems like there is an error while loading cat :(</h2>
      <router-link :to="{ path: '/' }">
        <button type="button" class="btn btn-outline-primary">Back</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import CatInfoPanel from "@/components/cat/CatInfoPanel.vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import Loader from "@/components/uiElements/Loader.vue";

export default defineComponent({
  name: "SingleCat",
  components: {
    CatInfoPanel,
    Loader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const cat = computed(() => store.getters.loadedCatItem);
    const toast = useToast();
    const isLoading = computed(() => store.getters.isLoading);

    // Fetch the cat info
    const getCatInfo = async () => {
      if (!route.params.breedId) {
        return;
      }
      // Remove unnecessary fetching
      if (route.params.breedId === cat.value?.id) {
        return;
      }
      try {
        await store.dispatch("fetchCatById", route.params.breedId);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          console.log("Unknown error occurred:", error);
        }
      }
    };

    onMounted(() => {
      getCatInfo();
    });

    return { cat, isLoading };
  },
});
</script>
