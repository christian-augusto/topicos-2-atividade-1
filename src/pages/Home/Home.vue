<template>
  <main class="home">
    <main-banner />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainBanner from "./MainBanner/MainBanner.vue";

export default defineComponent({
  components: {
    "main-banner": MainBanner,
  },
});
</script>
