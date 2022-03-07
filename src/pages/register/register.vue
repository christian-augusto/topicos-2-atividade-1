<template>
  <main class="register">
    <vRegisterForm />
  </main>
</template>

<script>
import vRegisterForm from "./register-form/register-form.vue";

import "./register.scss";

export default {
  components: {
    vRegisterForm,
  },
};
</script>
