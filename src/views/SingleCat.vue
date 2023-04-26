<template>
  <div v-if="cat">
    <router-link :to="{ name: 'home', query: { breedId: cat.breed } }">
      <button>Back</button>
    </router-link>
    <CatInfoPanel :cat="cat" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { CatImage } from "@/types/cat";
import { CatService } from "@/services/CatService";
import CatInfoPanel from "@/components/cat/CatInfoPanel.vue";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "SingleCat",
  components: {
    CatInfoPanel,
  },
  setup() {
    const route = useRoute();
    const cat = ref<CatImage | null>(null);
    const catService = new CatService();
    const toast = useToast();

    // Fetch the cat info
    const getCatInfo = async () => {
      if (!route.params.breedId) {
        return;
      }
      try {
        const result = await catService.getCatById(route.params.breedId);
        cat.value = result;
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          console.log("Unknown error occurred:", error);
        }
      }
    };

    onMounted(() => {
      getCatInfo();
    });

    return { cat };
  },
});
</script>
