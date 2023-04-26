<template>
  <div id="cat-home-page" class="container cat-home-page">
    <cat-breed-select :breeds="breeds" v-on:selectChange="handleSelectChange" />

    <div v-if="selectedBreed">
      <cats-list :cat-items="items" />
    </div>
    <div v-if="items.length < totalImages" class="cat-home-page__loadmore">
      <button @click="loadMore">Load more</button>
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
    const fetchImages = async () => {
      page.value = 0;
      items.value = [];
      try {
        const result = await catService.getCatItems(
          selectedBreed.value,
          page.value,
          limitPerPage.value
        );
        items.value = [...items.value, ...result.items];
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

    // Fetch more cat images for the current breed
    const loadMore = async () => {
      if (!selectedBreed.value) {
        return;
      }
      try {
        const result = await catService.getCatItems(
          selectedBreed.value,
          page.value,
          limitPerPage.value
        );
        items.value = items.value.concat(result.items);
        page.value++;
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Unknown error occurred");
        }
      }
    };

    // Fetch the list of cat breeds on component load
    watchEffect(async () => {
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
    });

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
      loadMore,
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
