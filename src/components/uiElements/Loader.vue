<template>
  <div class="spinner-grow text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoaderComponent",
});
</script>
