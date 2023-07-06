<template>
  <div
    class="flex flex-col items-center justify-center h-full rounded bg-gray-50 dark:bg-gray-800"
  >
    <div class="p-2 text-full">
      <slot name="header"> </slot>
    </div>
    <div class="p-2 text-full">
      <slot name="content"> </slot>
    </div>
    <div class="p-2 text-full">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>