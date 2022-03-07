<template>
  <main class="home">
    <vMainBanner />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import vMainBanner from "./main-banner/main-banner.vue";

export default defineComponent({
  components: {
    vMainBanner,
  },
});
</script>
