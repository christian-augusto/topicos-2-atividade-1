<template>
  <main class="register">
    <register-form />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegisterForm from "./RegisterForm/RegisterForm.vue";

import "./Register.scss";

export default defineComponent({
  components: {
    "register-form": RegisterForm,
  },
});
</script>
