<template>
  <main role="main" class="imc">
    <vImcTable />
  </main>
</template>

<script>
import vImcTable from "./imc-table/imc-table.vue";

import "./imc.scss";

export default {
  components: {
    vImcTable,
  },
};
</script>
