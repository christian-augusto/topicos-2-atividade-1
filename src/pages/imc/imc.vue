<template>
  <main role="main" class="imc">
    <vImcTable />
    <vImcCalc />
  </main>
</template>

<script>
import vImcTable from "./imc-table/imc-table.vue";
import vImcCalc from "./imc-calc/imc-calc.vue";

import "./imc.scss";

export default {
  components: {
    vImcTable,
    vImcCalc,
  },
};
</script>
