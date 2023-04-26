<template>
  <div class="cat-info-panel container">
    <h1>{{ cat.name }}</h1>
    <div class="cat-info-panel__img-holder">
      <img :src="cat.image" :alt="cat.name" />
    </div>
    <div class="cat-info-panel__description">
      <h2>Origin</h2>
      <p>{{ cat.origin }}</p>
      <h2>Temperament</h2>
      <p>{{ cat.temperament }}</p>
      <h2>Description</h2>
      <p>{{ cat.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CatImage } from "@/types/cat";

export default defineComponent({
  name: "CatInfoPanel",
  props: {
    cat: {
      type: Object as PropType<CatImage>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.cat-info-panel {
  &__img-holder {
    img {
      width: 100%;
    }
  }
}
</style>
