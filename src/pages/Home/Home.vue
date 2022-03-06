<template>
  <main class="home">
    <MainBanner />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainBanner from "./MainBanner/MainBanner.vue";

export default defineComponent({
  components: {
    MainBanner,
  },
});
</script>
