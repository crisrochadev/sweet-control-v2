<template>
  <div class="flex justify-center mb-4">
    <div class="inline-flex rounded-md shadow-sm" role="group">
      <button
        @click="date.changeMonth('subtract', 1)"
        type="button"
        class="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        <span class="material-icons-outlined" style="font-size:18px"> chevron_left </span>
        {{
          date.previuosMonth.text.charAt(0).toUpperCase() +
          date.previuosMonth.text.slice(1)
        }}
      </button>
      <button
        type="button"
        @click="
          () => {
            if (date.currentMonth.number !== date.today.month)
              date.changeMonth('return');
          }
        "
        class="first-letter:text-red-800 inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        <span
          v-show="date.currentMonth.number !== date.today.month"
          class="material-icons-outlined mr-2"
          style="font-size:18px"
        >
          {{ isAfter ? "undo" : "redo" }}
        </span>
        {{
          date.currentMonth.text.charAt(0).toUpperCase() +
          date.currentMonth.text.slice(1)
        }}
        {{ date.currentYear }}
      </button>

      <button
        @click="date.changeMonth('add', 1)"
        type="button"
        class="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        {{
          date.nextMonth.text.charAt(0).toUpperCase() +
          date.nextMonth.text.slice(1)
        }}
        <span class="material-icons-outlined" style="font-size:18px"> chevron_right </span>
      </button>
    </div>
  </div>
</template>

<script>
import { useDates } from "@/store/dates";
import moment from 'moment';
export default {
  name: "DateButtons",
  data() {
    const date = useDates();
    return {
      date,
    };
  },
  computed:{
    isAfter(){
      return moment(this.date.currentDate).isAfter(this.date.today.date)
    }
  }
};
</script>

<style>
</style>