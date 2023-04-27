<template>
  <div class="cat-home-page__list__item__wrap mb-4">
    <img
      class="mb-3"
      width="311"
      height="200"
      :src="catOptimisedImageUrl"
      alt="cat image"
    />
    <router-link :to="{ name: 'singleCat', params: { breedId: cat.id } }">
      <button type="button" class="btn btn-outline-info">View details</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { CatImage } from "@/types/cat";
import spinner from "@/assets/spinner/spinner.gif";

export default defineComponent({
  name: "CatsTeaser",
  props: {
    cat: {
      type: Object as PropType<CatImage>,
      required: true,
    },
  },
  setup(props) {
    const catImageElement: HTMLImageElement = new Image();
    const catOptimisedImageUrl = ref<string>(spinner);
    const catImageUrl = computed(() => props.cat.image);

    catImageElement.src = catImageUrl.value;

    // Using new Image to control the image loading event
    catImageElement.onload = () => {
      catOptimisedImageUrl.value = catImageElement.src;
    };

    return {
      catOptimisedImageUrl,
    };
  },
});
</script>

<style lang="scss">
.cat-home-page__list__item__wrap {
  img {
    width: 100%;
    object-fit: cover;
    height: 200px;
    @media (max-width: 576px) {
      height: auto;
    }
  }
}
</style>
