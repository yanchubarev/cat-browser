<template>
  <div class="cat-home-page__list" v-if="catItems">
    <div class="row">
      <div
        v-for="(item, index) in catItems"
        :key="index"
        class="col-lg-3 col-md-6 col-xs-12 cat-home-page__list__item"
      >
        <cat-teaser :cat="item" />
      </div>
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
