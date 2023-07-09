<template>
  <div class="w-full sticky top-0">
    <div class="flex justify-between">
      <add-new />
      <change-dates />
    </div>
    <values-view />
  </div>

  <div class="relative overflow-x-auto pb-24">
    <div
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded"
    >
      <template v-for="finance in finances" :key="finance.id">
        <div
          class="bg-white ml-4 shadow-md sm:rounded-lg rounded cursor-pointer relative item my-4 border"
        >
          <div
            class="border w-6 h-6 absolute -top-3 -left-3 flex justify-center items-center rounded-full p-0 z-50 bg-white"
          >
            <span
              class="material-icons-outlined"
              :class="[
                finance.completed
                  ? 'text-green-300'
                  : itsOverdue(finance)
                  ? 'text-red-300'
                  : 'text-yellow-300',
              ]"
              >{{
                finance.completed
                  ? "done"
                  : itsOverdue(finance)
                  ? "error"
                  : "schedule"
              }}</span
            >
          </div>
          <div class="w-full flex justify-between items-center relative">
            <div
              class="px-6 py-2 uppercase flex-1"
              :class="[finance.completed ? 'line-through' : '']"
            >
              {{ finance.title }}
            </div>
            <div
              class="px-6 py-2 flex justify-end font-hepta-extra-bold"
              :class="[finance.completed ? 'line-through' : '']"
            >
              {{
                finance.ammount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  currencyDisplay: "symbol",
                  minimumFractionDigits: 2,
                })
              }}
            </div>
            <div
              @click="(e) => openMenu(e, finance)"
              class="hover:bg-gray-100 transition-colors delay-100 px-2 menu_button"
            >
              <span class="material-icons-outlined">more_horiz</span>
            </div>
            <transition>
              <button
                v-if="currentMenu === finance.id"
                :ref="`menu_${finance.id}`"
                class="menu z-10 top-[calc(_100%_-_6px)] right-0 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDividerButton"
                >
                  <li
                    @click="
                      updateFinance('completed', !finance.completed, finance)
                    "
                    class="w-full flex justify-start gap-4 items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <span class="material-icons-outlined">{{
                      finance.completed ? 'close' : 'done'}}</span>
                    <span>
                      {{
                        type === "expense"
                          ? finance.completed
                            ? "Reabrir"
                            : "Pagar"
                          : finance.completed
                          ? "Reabrir"
                          : "Receber"
                      }}</span
                    >
                  </li>
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
          </div>

          <div class="text-center py-2" style="grid-column: 2/4">
            <input
              v-model="finance.comment"
              class="border w-full"
              v-if="finance.comment && finance.comment.length > 0"
            />
            <div v-else>Adicionar comentário</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import SweetBox from "@/components/admin/sweetBox.vue";
import ChangeDates from "@/components/admin/DateButtons.vue";
import { useExpenses } from "@/store/expenses";
import ValuesView from "@/components/admin/ValuesView.vue";
import AddNew from "@/components/admin/AddNew.vue";
import moment from "moment";
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
      more: null,
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
    document.addEventListener("click", (e) => this.removeMenus(e));
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
    openMore(e, item) {
      this.more = this.more === item.id ? null : item.id;
      console.log(this.more);
      if (
        this.$refs[`more_${item.id}`] &&
        this.$refs[`more_${item.id}`][0] &&
        !this.$refs[`more_${item.id}`][0].contains(e.target)
      ) {
        console.log(this.$refs[`more_${item.id}`][0]);
        this.more = null;
      }
    },
    dateFormated(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    itsOverdue(item) {
      let currentDate = parseInt(moment().format("DD"));
      let itemDate = parseInt(moment(item.date).format("DD"));
      return itemDate > currentDate;
    },
    removeMenus(e) {
      let menus = document.querySelectorAll(".menu");
      let menu_buttons = document.querySelectorAll(".menu_button");
      Array.from(menus).forEach((menu, index) => {
        if (
          menu &&
          !menu.contains(e.target) &&
          Array.from(menu_buttons)[index] &&
          !Array.from(menu_buttons)[index].contains(e.target)
        ) {
          this.currentMenu = null;
        }
      });
    },
    async updateFinance(type, value, item) {
      await this.expenses.updateFinance(type, value, item.id);
      this.currentMenu = null;
    },
  },
};
</script>

<style scoped>
</style>