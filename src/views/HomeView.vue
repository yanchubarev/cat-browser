<template>
  <div id="cat-home-page" class="container cat-home-page">
    <h1>Cat browser</h1>
    <cat-breed-select :breeds="breeds" v-on:selectChange="handleSelectChange" />

    <div v-if="selectedBreed">
      <cats-list :cat-items="items" />
    </div>
    <div v-if="items.length < totalImages" class="cat-home-page__loadmore">
      <button type="button" class="btn btn-primary" @click="fetchImages(true)">
        Load more
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { CatService } from "@/services/CatService";
import { CatBreed, CatImage } from "@/types/cat";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import CatsList from "@/components/cat/CatsList.vue";
import CatBreedSelect from "@/components/cat/CatBreedSelect.vue";

const ITEMS_PER_PAGE = 5;

export default defineComponent({
  name: "Home-page",
  components: {
    CatsList,
    CatBreedSelect,
  },
  setup() {
    const breeds = ref<CatBreed[]>([]);
    let selectedBreed = ref<string>("");
    const items = ref<CatImage[]>([]);
    const totalImages = ref<number>(0);
    const limitPerPage = ref<number>(ITEMS_PER_PAGE);
    const page = ref<number>(0);
    const router = useRouter();
    const toast = useToast();
    const catService = new CatService();

    // Fetch cat images based on the selected breed and update the page
    // isLoadMore is used as a flag to load more images from one breed
    const fetchImages = async (isLoadMore = false) => {
      if (!isLoadMore) {
        page.value = 0;
        items.value = [];
      }
      try {
        const result = await catService.getCatItems(
          selectedBreed.value,
          page.value,
          limitPerPage.value
        );
        items.value = isLoadMore
          ? items.value.concat(result.items)
          : [...items.value, ...result.items];
        totalImages.value = result.totalImages;
        page.value++;
        await router.push({ query: { breedId: selectedBreed.value } });
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Unknown error occurred");
        }
      }
    };

    // Method to fetch the list of cat breeds
    const fetchBreeds = async () => {
      try {
        const result = await catService.getBreeds();
        breeds.value = result;
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Unknown error occurred");
        }
      }
    };

    // Fetch the list of cat breeds on component load
    watchEffect(fetchBreeds);

    // Handle the breed selection change to fetch new images
    const handleSelectChange = (selectedBreedId: string) => {
      selectedBreed.value = selectedBreedId;
      fetchImages();
    };

    return {
      breeds,
      selectedBreed,
      items,
      totalImages,
      fetchImages,
      handleSelectChange,
    };
  },
});
</script>

<style lang="scss">
#cat-home-page {
  .cat-home-page__loadmore {
    text-align: left;
    padding-top: 30px;
  }
}
</style>
