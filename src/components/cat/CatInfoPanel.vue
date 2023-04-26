<template>
  <div class="cat-info-panel container">
    <div class="cat-info-panel__heading row">
      <div class="col-md-auto">
        <router-link :to="{ name: 'home', query: { breedId: cat.breed } }">
          <button type="button" class="btn btn-outline-primary">Back</button>
        </router-link>
      </div>
      <div class="col-11">
        <h1 v-if="cat.name">{{ cat.name }}</h1>
      </div>
    </div>
    <div class="row">
      <div
        class="cat-info-panel__img-holder col-md-6 col-xs-1"
        v-if="cat.image"
      >
        <img :src="cat.image" :alt="cat.name" />
      </div>

      <div class="cat-info-panel__description col-md-6 col-xs-1">
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
  margin-top: 50px;
  &__heading {
    align-items: center;
    margin-bottom: 50px;
  }
  &__img-holder {
    img {
      width: 100%;
    }
  }
}
</style>
