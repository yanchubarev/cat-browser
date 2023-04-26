<template>
  <div class="cat-info-panel container">
    <h1 v-if="cat.name">{{ cat.name }}</h1>
    <div class="cat-info-panel__img-holder" v-if="cat.image">
      <img :src="cat.image" :alt="cat.name" />
    </div>
    <div class="cat-info-panel__description">
      <div v-if="cat.origin">
        <h2>Origin</h2>
        <p>{{ cat.origin }}</p>
      </div>
      <div v-if="cat.temperament">
        <h2>Temperament</h2>
        <p>{{ cat.temperament }}</p>
      </div>
      <div v-if="cat.description">
        <h2>Description</h2>
        <p>{{ cat.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CatInfo } from "@/types/cat";

export default defineComponent({
  name: "CatInfoPanel",
  props: {
    cat: {
      type: Object as PropType<CatInfo>,
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
