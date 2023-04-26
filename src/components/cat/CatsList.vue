<template>
  <div class="cat-home-page__list" v-if="catItems">
    <div
      v-for="(item, index) in catItems"
      :key="index"
      class="cat-home-page__list__item"
    >
      <cat-teaser :cat="item" />
    </div>
  </div>
  <div v-else>Sorry! Nothing to show :(</div>
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
}
</style>
