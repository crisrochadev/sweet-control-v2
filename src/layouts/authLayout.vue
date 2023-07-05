<template>
  <div class="w-full bg-white p-4 h-screen overflow-hidden">
    <div class="menu">
      <sweet-button
        label="Voltar"
        icon="arrow_back"
        icon-position="left"
        :link="true"
        @handleClick="() => $router.go(-1)"
      />
    </div>
    <div
      class="main flex justify-center items-center h-[calc(100vh_-_50px)] p-2 relative scrollbar-thumb-teal-900 scrollbar-thin scrollbar-track-teal-100 overflow-auto"
    >
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
import SweetButton from "@/components/defaults/SweetButton.vue";
export default {
  components: { SweetButton },
};
</script>

<style>
</style>