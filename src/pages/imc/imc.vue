<template>
  <main role="main" class="imc">
    <vImcDefinition />
    <vImcTable />
    <vImcCalc />
  </main>
</template>

<script>
import vImcDefinition from "./imc-definition/imc-definition.vue";
import vImcTable from "./imc-table/imc-table.vue";
import vImcCalc from "./imc-calc/imc-calc.vue";

import "./imc.scss";

export default {
  components: {
    vImcDefinition,
    vImcTable,
    vImcCalc,
  },
};
</script>
