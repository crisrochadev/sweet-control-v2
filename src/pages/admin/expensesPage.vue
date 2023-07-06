<template>
  <div class="w-full flex justify-center mb-4">
    <div class="inline-flex rounded-md shadow-sm" role="group">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        <span class="material-icons-outlined"> chevron_left </span>
        Julho
      </button>
      <button
        type="button"
        class="first-letter:text-red inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        {{expenses.currentMonth}}
      </button>
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        Agosto
      <span class="material-icons-outlined"> chevron_right </span>
      </button>
    </div>
  </div>
  <values-view />
</template>

<script>
import SweetBox from "@/components/admin/sweetBox.vue";
import { useExpenses } from "@/store/expenses";
import ValuesView from "@/components/admin/ValuesView.vue";
export default {
  components: {
    SweetBox,
    ValuesView,
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