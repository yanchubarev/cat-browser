<template>
  <div class="cat-home-page__list">
    <div
      v-for="(item, index) in catItems"
      :key="index"
      class="cat-home-page__list__item"
    >
      <cat-teaser :cat="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CatImage } from "@/types/cat";
import CatTeaser from "@/components/cat/CatTeaser.vue";

export default defineComponent({
  name: "CatsList",
  props: {
    catItems: {
      type: Object as PropType<CatImage[]>,
      required: true,
    },
  },
  components: {
    CatTeaser,
  },
});
</script>

<style lang="scss">
.cat-home-page__list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;

  &__item {
    width: 25%;
    padding-right: 10px;
    padding-left: 10px;
    margin-bottom: 20px;

    img {
      width: 100%;
      object-fit: contain;
      height: 200px;
    }
  }
}
</style>
