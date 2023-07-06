<template>
  <div class="grid grid-cols-3 grid-rows-1 gap-4 mb-4">
    <sweet-box>
      <template #header>
        <h2 class="uppercase font-hepta-bold text-gray-600">Receita</h2>
      </template>
      <template #content>
        <h2 class="uppercase font-hepta-black text-blue-600 text-2xl">
          <span class="text-xs text-gray-600">R$</span
          >{{ expenses.totalIncoming.toFixed(2).toLocaleString("pt-BR") }}
        </h2>
      </template>
    </sweet-box>
    <sweet-box>
      <template #header>
        <h2 class="uppercase font-hepta-bold text-gray-600">Despesas</h2>
      </template>
      <template #content>
        <h2 class="uppercase font-hepta-black text-purple-800 text-2xl">
          <span class="text-xs text-gray-600">R$</span
          >{{ expenses.totalExpenses.toFixed(2).toLocaleString("pt-BR") }}
        </h2>
      </template>
    </sweet-box>
    <sweet-box>
      <template #header>
        <h2 class="uppercase font-hepta-bold text-gray-600">Saldo</h2>
      </template>
      <template #content>
        <h2
          class="uppercase font-hepta-black text-2xl"
          :class="[expenses.totalDiff > 0 ? 'text-green-600' : 'text-red-600']"
        >
          <span class="text-xs text-gray-600">R$</span
          >{{ expenses.totalDiff.toFixed(2).toLocaleString("pt-BR") }}
        </h2>
      </template>
    </sweet-box>
  </div>
</template>

<script>
import SweetBox from "@/components/admin/sweetBox.vue";
import { useExpenses } from "@/store/expenses";
export default {
  components: {
    SweetBox,
  },
  data() {
    const expenses = useExpenses();
    return {
      expenses,
    };
  },
};
</script>

<style>
</style>