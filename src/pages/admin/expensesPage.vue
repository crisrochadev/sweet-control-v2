<template>
<div class="flex justify-between">
    <add-new />
    <change-dates />
</div>
  <values-view />
</template>

<script>
import SweetBox from "@/components/admin/sweetBox.vue";
import ChangeDates from '@/components/admin/DateButtons.vue'
import { useExpenses } from "@/store/expenses";
import ValuesView from "@/components/admin/ValuesView.vue";
import AddNew from '@/components/admin/AddNew.vue';
export default {
  components: {
    SweetBox,
    ValuesView,
    ChangeDates,
    AddNew
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