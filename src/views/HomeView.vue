<template>
  <div id="cat-home-page" class="container cat-home-page mt-5 mb-5">
    <h1>Cat browser</h1>
    <cat-breed-select :breeds="breeds" v-on:selectChange="handleSelectChange" />
    <loader v-if="isLoading" />
    <div v-show="selectedBreed && !isLoading">
      <cats-list :cat-items="items" />
    </div>
    <div
      v-if="items.length < totalImages && !isLoading && selectedBreed"
      class="cat-home-page__loadmore pt-5"
    >
      <button
        type="button"
        class="btn btn-primary col-sm-2 col-xs-12"
        @click="fetchCatItems(true)"
      >
        Load more
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import CatsList from "@/components/cat/CatsList.vue";
import CatBreedSelect from "@/components/cat/CatBreedSelect.vue";
import Loader from "@/components/uiElements/Loader.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Home-page",
  components: {
    CatsList,
    CatBreedSelect,
    Loader,
  },
  setup() {
    const store = useStore();
    const breeds = computed(() => store.getters.breeds);
    const selectedBreed = computed(() => store.getters.selectedBreed);
    const items = computed(() => store.getters.items);
    const totalImages = computed(() => store.getters.totalImages);
    const isLoading = computed(() => store.getters.isLoading);
    const router = useRouter();
    const toast = useToast();
    const route = useRoute();

    const fetchCatItems = async (isLoadMore = false) => {
      try {
        await store.dispatch("fetchCatItems", {
          isLoadMore,
        });
        await router.push({ query: { breedId: selectedBreed.value } });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Unknown error occurred");
        }
      }
    };

    const handleSelectChange = (selectedBreedId: string) => {
      store.dispatch("selectBreed", selectedBreedId);
      fetchCatItems();
    };

    const checkRoute = () => {
      if (route.query.breedId !== selectedBreed.value) {
        handleSelectChange(route.query.breedId as string);
      }
    };

    const fetchBreeds = async () => {
      try {
        await store.dispatch("fetchBreeds");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Unknown error occurred");
        }
      }
    };

    watchEffect(() => {
      if (!breeds.value.length) {
        fetchBreeds();
      }
    });

    onMounted(() => {
      checkRoute();
    });

    return {
      breeds,
      selectedBreed,
      items,
      totalImages,
      isLoading,
      fetchCatItems,
      handleSelectChange,
    };
  },
});
</script>

<style lang="scss">
#cat-home-page {
  .cat-home-page__loadmore {
    text-align: center;
  }
}
</style>
