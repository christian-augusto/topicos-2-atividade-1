<template>
  <vHeader />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import vHeader from "@components/header/header.vue";

export default defineComponent({
  components: {
    vHeader,
  },
});
</script>

<style src="./App.scss" lang="scss"></style>
