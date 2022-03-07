<template>
  <vHeader />
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

import vHeader from "@components/header/header.vue";
import "./app.scss";

export default defineComponent({
  components: {
    vHeader,
  },
});
</script>
