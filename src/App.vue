<template>
  <app-header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@components/Header/Header.vue";

export default defineComponent({
  components: {
    "app-header": Header,
  },
});
</script>

<style src="./App.scss" lang="scss"></style>
