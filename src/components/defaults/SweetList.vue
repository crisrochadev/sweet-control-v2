<template>
  <div class="overflow-hidden relative" :class="[height ? height : 'h-auto']">
    <ul class="h-full scrollbar-thin overflow-y-auto" >
    <template v-for="(item, index) in list" :key="index">
      <slot name="item" :item="item">
        <li class="uppercase flex justify-start items-center gap-2 text-xs my-2">
            <span  class="material-icons-outlined" :class="{'text-red-600': !item.done, 'text-green-600': item.done}">{{item.done ? 'done' : 'error'}}</span>
            <span>{{ item.label }}</span>
        </li>
      </slot>
    </template>
  </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    height:String
  },
};
</script>

<style>
</style>