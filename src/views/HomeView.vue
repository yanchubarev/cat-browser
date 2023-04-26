<template>
  <div id="cat-home-page" class="container cat-home-page">
    <h1>Cat browser</h1>
    <cat-breed-select :breeds="breeds" v-on:selectChange="handleSelectChange" />
    <loader v-if="isLoading" />
    <div v-if="selectedBreed && !isLoading">
      <cats-list :cat-items="items" />
    </div>
    <div
      v-if="items.length < totalImages && !isLoading"
      class="cat-home-page__loadmore row"
    >
      <button
        type="button"
        class="btn btn-primary col-2"
        @click="fetchCatItems(true)"
      >
        Load more
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import CatsList from "@/components/cat/CatsList.vue";
import CatBreedSelect from "@/components/cat/CatBreedSelect.vue";
import Loader from "@/components/uiElements/Loader.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const ITEMS_PER_PAGE = 5;

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
    const limitPerPage = ITEMS_PER_PAGE;
    const route = useRoute();

    const fetchCatItems = async (isLoadMore = false) => {
      const nextPage: number =
        Math.floor(items.value.length / ITEMS_PER_PAGE) + 1;
      await store.dispatch("fetchCatItems", {
        isLoadMore,
        selectedBreedId: selectedBreed.value,
        page: nextPage,
        limit: limitPerPage,
      });
      await router.push({ query: { breedId: selectedBreed.value } });
    };

    const handleSelectChange = (selectedBreedId: string) => {
      store.dispatch("selectBreed", selectedBreedId);
      fetchCatItems();
    };

    watch(
      () => route.query.breedId,
      (breedId) => {
        if (breedId !== selectedBreed.value) {
          handleSelectChange(breedId as string);
        }
      }
    );

    onMounted(() => {
      if (!breeds.value.length) {
        fetchBreeds();
      }
    });

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
  margin-top: 50px;
  .cat-home-page__loadmore {
    text-align: left;
    padding-top: 30px;
  }
}
</style>
