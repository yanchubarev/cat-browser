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
import { useRoute, useRouter } from "vue-router";
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
    const limit = ref<number>(ITEMS_PER_PAGE);
    const page = ref<number>(0);
    const router = useRouter();
    const toast = useToast();
    const catService = new CatService();

    const fetchImages = async () => {
      page.value = 0;
      items.value = [];
      try {
        const result = await catService.getCatItems(
          selectedBreed.value,
          page.value,
          limit.value
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

    const loadMore = async () => {
      if (!selectedBreed.value) {
        return;
      }
      try {
        const result = await catService.getCatItems(
          selectedBreed.value,
          page.value,
          limit.value
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
    button {
      background: #50aafd;
      border: none;
      width: 200px;
      height: 40px;
      border-radius: 6px;
      color: #fff;
      font-size: 18px;
    }
  }
}
</style>