<template>
  <div class="cat-home-page__list__item__wrap">
    <img :src="cat.image" alt="cat image" />
    <router-link :to="{ name: 'singleCat', params: { breedId: cat.id } }">
      <button type="button" class="btn btn-outline-info">View details</button>
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

<style lang="scss">
.cat-home-page__list__item {
  width: 25%;
  padding-right: 10px;
  padding-left: 10px;
  margin-bottom: 20px;

  img {
    width: 100%;
    object-fit: fill;
    height: 200px;
    margin-bottom: 20px;
  }
}
</style>
