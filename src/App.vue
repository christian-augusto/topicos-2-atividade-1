<template>
  <Header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@components/Header/Header.vue";

export default defineComponent({
  components: {
    Header,
  },
});
</script>

<style src="./App.scss" lang="scss"></style>
