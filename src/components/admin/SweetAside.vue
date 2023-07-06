<template>
<transition>
  <aside
    id="logo-sidebar"
    class="transition-all delay-100 fixed top-0 left-0 z-40 h-screen pt-20  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    :class="[width]"
    aria-label="Sidebar"
  >
    <div class="h-full pb-4 overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-800" :class="[expand ? 'px-3' : 'px-0 sm:p-3']">
      <ul class="space-y-2 font-medium">
        <li class="hidden sm:block">
          <p
            href="#"
            @click="curExpand = !curExpand"
            :class="[curExpand ? 'w-60 justify-end' : 'w-0 invisible sm:visible sm:w-12 justify-start hidden']"
            class="transition-all delay=100 cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
          <transition>
            <span class="material-icons-outlined transition-all delay-100" :class="{'rotate-180':curExpand}">arrow_forward</span>
          </transition>
          </p>
        </li>
        <li v-for="item in menu" :key="item.id">
          <p
          @click="goToLink(item)"
          :class="[curExpand ? 'w-60 justify-end' : 'w-12 justify-start']"
            class="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
           <span class="material-icons-outlined">{{item.icon}}</span>
            <span class="flex-1 ml-3 whitespace-nowrap">{{item.title}}</span>
            <span
            v-if="item.ispro"
              class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
              >Pro</span
            >
            <span
            v-if="item.notifications"
              class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >{{item.notifications}}</span
            >
          </p>
        </li>
      </ul>
    </div>
  </aside>
</transition>
</template>

<script>
export default {
    props:{
        menu:Array,
        expand:Boolean
    },
    emits:['update:expand'],
    computed:{
        curExpand:{
            get(){
                return this.expand
            },
            set(newexpand){
                this.$emit('update:expand',newexpand)
            }
        },
        width(){
            return this.curExpand ? 'w-64' : 'sm:w-14 w-0'
        }
    },
    methods:{
        goToLink(item){
            if(item.isPro){
                this.$router.push({name:'pro'});
            }else{
                this.$router.push({name:item.to})
            }
        }
    }
};
</script>

<style>
</style>