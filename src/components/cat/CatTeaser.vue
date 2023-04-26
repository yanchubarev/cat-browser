<template>
  <div class="cat-home-page__list__item__wrap">
    <img :src="cat.image" alt="cat image" />
    <router-link :to="{ name: 'singleCat', params: { breedId: cat.id } }">
      View details
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CatImage } from "@/types/cat";

export default defineComponent({
  name: "CatsTeaser",
  props: {
    cat: {
      type: Object as PropType<CatImage>,
      required: true,
    },
  },
});
</script>
