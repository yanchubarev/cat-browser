<template>
  <div>
    <div class="cat-home-page__select-wrap mb-3" v-if="breeds">
      <p>Choose the breed:</p>
      <select
        class="form-select"
        v-model="selectedBreed"
        @change="onSelectChange"
      >
        <option value="">Select a breed</option>
        <option v-for="breed in breeds" :key="breed.id" :value="breed.id">
          {{ breed.name }}
        </option>
      </select>
    </div>
    <div v-else>Sorry! There is no breeds to show...</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watchEffect } from "vue";
import { CatBreed } from "@/types/cat";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "CatBreedSelect",
  props: {
    breeds: {
      type: Object as PropType<CatBreed[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectedBreed = ref<string>("");
    const route = useRoute();
    const breeds = computed(() => props.breeds);

    const onSelectChange = () => {
      emit("selectChange", selectedBreed.value);
    };

    const selectBreed = () => {
      // Synchronisation between route and select
      if (
        route.query.breedId &&
        breeds.value.some((breed: CatBreed) => breed.id === route.query.breedId)
      ) {
        selectedBreed.value = route.query.breedId as string;
      }
    };

    watchEffect(() => {
      if (breeds.value.length) {
        selectBreed();
      }
    });

    return {
      selectedBreed,
      onSelectChange,
    };
  },
});
</script>

<style lang="scss">
.cat-home-page__select-wrap {
  text-align: left;
}
</style>
