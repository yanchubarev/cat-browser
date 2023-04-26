<template>
  <div>
    <div class="cat-home-page__select-wrap" v-if="breeds">
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
import { defineComponent, PropType, ref } from "vue";
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

    const onSelectChange = () => {
      emit("selectChange", selectedBreed.value);
    };

    // Check if the query already have a breed id
    if (route.query.breedId) {
      selectedBreed.value = route.query.breedId as string;
    }

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
  margin-bottom: 20px;
}
</style>
