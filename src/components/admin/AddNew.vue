<template>
  <SweeModal>
    <div class="px-6 py-6 lg:px-8">
      <div class="w-11/12 flex gap-4">
        <div class="inline-flex rounded-md shadow-sm" role="group">
          <button
            @click="active = 'expense'"
            :class="[
              active === 'expense'
                ? 'z-10 ring-2 ring-blue-700 text-blue-700 dark:ring-blue-500 dark:text-white'
                : '',
            ]"
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Despesa
          </button>
          <button
            @click="active = 'incoming'"
            type="button"
            :class="[
              active === 'incoming'
                ? 'z-10 ring-2 ring-blue-700 text-blue-700 dark:ring-blue-500 dark:text-white'
                : '',
            ]"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Receita
          </button>
        </div>
      </div>
      <form class="space-y-4 mt-4" action="#">
        <sweet-input label="Titulo" />
        <div class="flex justify-between items-center gap-4">
          <sweet-input label="Vencimento" />
          <sweet-input label="Valor" />
        </div>
        <div class="flex justify-start items-center gap-4">
          <div class="flex-1 flex gap-4">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-600 dark:focus:ring-offset-gray-600"
                  required
                />
              </div>
              <label
                for="remember"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Repetir ?</label
              >
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-600 dark:focus:ring-offset-gray-600"
                  required
                />
              </div>
              <label
                for="remember"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Fixar ?</label
              >
            </div>
          </div>
          <sweet-input placeholder="1" type="number" class="flex-1" />
        </div>
        <button
          type="submit"
          class="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-600"
        >
          Salvar {{ active === "expense" ? "Despesa" : "Receita" }}
        </button>
      </form>
    </div>
  </SweeModal>
</template>

<script>
import SweetInput from "../defaults/SweetInput.vue";
import SweeModal from "./SweeModal.vue";
export default {
  components: { SweeModal, SweetInput },
  data() {
    return {
      active: "expense",
    };
  },
};
</script>

<style>
</style>

