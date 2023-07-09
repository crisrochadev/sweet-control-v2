<template>
  <!-- Modal toggle -->
  <button
    @click="show = !show"
    class="h-10 w-10 flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-600"
    type="button"
  >
    <span class="material-icons-outlined">add</span>
  </button>

  <!-- Main modal -->
  <div
    v-if="show"
    tabindex="-1"
    @click="closeModal"
    class="fixed bg-[rgba(0_0_0_/_.25)] flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full" ref="modal">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-500">
        <button
        @click="show = false"
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          
        >
         <span class="material-icons-outlined">close</span>
        </button>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            show:false
        }
    },
    methods:{
        closeModal(e){
            console.log(e)
            if(this.$refs.modal && !this.$refs.modal.contains(e.target)){
                this.show = false;
            }
        }
    }
};
</script>

<style>
</style>