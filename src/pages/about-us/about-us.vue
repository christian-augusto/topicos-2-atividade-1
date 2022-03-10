<template>
  <main role="main" class="about-us">
    <vInstitutionalText />
    <vLocation />
  </main>
</template>

<script>
import vInstitutionalText from "./institutional-text/institutional-text.vue";
import vLocation from "./location/location.vue";

import "./about-us.scss";

export default {
  components: {
    vInstitutionalText,
    vLocation,
  },
};
</script>
