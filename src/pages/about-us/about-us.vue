<template>
  <main role="main" class="about-us">
    <vInstitutionalText />
  </main>
</template>

<script>
import vInstitutionalText from "./institutional-text/institutional-text.vue";

import "./about-us.scss";

export default {
  components: {
    vInstitutionalText,
  },
};
</script>
