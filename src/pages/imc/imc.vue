<template>
  <main role="main" class="imc">
    <vImcDefinition />
    <vImcTable />
    <vImcCalcForm />
  </main>
</template>

<script>
import vImcDefinition from "./imc-definition/imc-definition.vue";
import vImcTable from "./imc-table/imc-table.vue";
import vImcCalcForm from "./imc-calc-form/imc-calc-form.vue";

import "./imc.scss";

export default {
  components: {
    vImcDefinition,
    vImcTable,
    vImcCalcForm,
  },
};
</script>
