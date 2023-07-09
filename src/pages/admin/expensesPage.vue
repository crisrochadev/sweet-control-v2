<template>
  <div class="flex justify-between">
    <add-new />
    <change-dates />
  </div>
  <values-view />

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">
            {{ type === "expense" ? "Pago" : "Recebido" }}
          </th>
          <th scope="col" class="px-6 py-3">Titulo</th>
          <th scope="col" class="px-6 py-3">Valor</th>
          <th scope="col" class="py-3 text-center">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
          v-for="finance in finances"
          :key="finance.id"
        >
          <td class="px-6 py-4" v-if="Object.keys(finance).some">
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="finance.completed"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              ></div>
            </label>
          </td>
          <td class="px-6 py-4">
            {{ finance.title }}
          </td>
          <td class="px-6 py-4">
            {{
              finance.ammount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                currencyDisplay: "symbol",
                minimumFractionDigits: 2,
              })
            }}
          </td>
          <td class="text-center py-4" v-if="Object.keys(finance).some">
            <button
              @click="(e) => openMenu(e, finance)"
              class="text-black relative bg-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              <span class="material-icons-outlined"> more_horiz </span>

              <!-- Dropdown menu -->
              <transition>
                <button
                  v-if="currentMenu === finance.id"
                  :ref="`menu_${finance.id}`"
                  class="z-10 top-[calc(_100%_+_3px)] right-0 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDividerButton"
                  >
                    <li
                      class="w-full flex justify-start gap-4 items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <span class="material-icons-outlined">edit</span>
                      <span>Editar</span>
                    </li>
                     <li
                      class="w-full flex justify-start gap-4 items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <span class="material-icons-outlined">delete</span>
                      <span>Excluir</span>
                    </li>
                  </ul>
                </button>
              </transition>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SweetBox from "@/components/admin/sweetBox.vue";
import ChangeDates from "@/components/admin/DateButtons.vue";
import { useExpenses } from "@/store/expenses";
import ValuesView from "@/components/admin/ValuesView.vue";
import AddNew from "@/components/admin/AddNew.vue";
export default {
  components: {
    SweetBox,
    ValuesView,
    ChangeDates,
    AddNew,
  },
  data() {
    const expenses = useExpenses();
    return {
      expenses,
      type: "expense",
      currentMenu: null,
    };
  },
  computed: {
    finances: {
      get() {
        return this.expenses.finances;
      },
      set(newfinance) {
        this.expenses.finances = newfinance;
      },
    },
  },
  async mounted() {
    await this.expenses.getExpenses();
    console.log(this.expenses.finances);
  },
  methods: {
    openMenu(e, item) {
      this.currentMenu = this.currentMenu === item.id ? null : item.id;
      if (
        this.$refs[`menu_${item.id}`] &&
        this.$refs[`menu_${item.id}`][0] &&
        !this.$refs[`menu_${item.id}`][0].contains(e.target)
      ) {
        console.log(this.$refs[`menu_${item.id}`][0]);
        this.currentMenu = null;
      }
    },
  },
};
</script>

<style>
</style>