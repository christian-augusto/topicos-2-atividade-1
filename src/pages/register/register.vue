<template>
  <main class="register">
    <vRegisterForm />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import vRegisterForm from "./register-form/register-form.vue";

import "./register.scss";

export default defineComponent({
  components: {
    vRegisterForm,
  },
});
</script>
