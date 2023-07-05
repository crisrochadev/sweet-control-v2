<template>
  <div class="absolute top-full w-full h-auto z-20" v-if="show">
    <slot />
  </div>
</template>

<script>
export default {
    props:['show']
}
</script>

<style>

</style>