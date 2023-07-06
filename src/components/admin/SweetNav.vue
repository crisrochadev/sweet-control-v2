<template>
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            @click="curExpand = !curExpand"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <transition>
              <span v-if="!curExpand" class="material-icons-outlined">menu</span>
            </transition>
            <transition>
              <span v-if="curExpand" class="material-icons-outlined">close</span>
            </transition>
          </button>
          <div class="flex ml-2 md:mr-24">
            <img
              src="/img/icons/msapplication-icon-144x144.png"
              class="h-8 mr-3"
              alt="FlowBite Logo"
            />
            <span
              class="self-center font-semibold sm:text-2xl whitespace-nowrap uppercase text-sm text-blue-500 font-hepta-black dark:text-white"
              >Sweet Control</span
            >
          </div>
        </div>
        <div class="flex items-center">
          <button class="flex items-center ml-3 user_menu_button relative" 
                @click="openMenuUser = !openMenuUser" @blur="openMenuUser = false">
            <div>
              <button
                type="button"
                class="pointer-events-none flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <span class="sr-only">Open user menu</span>
                <img
                    v-if="haveUser"
                  class="w-8 h-8 rounded-full"
                  :src="auth.user.user_metadata.picture"
                  alt="user photo"
                />
                <span v-else class="material-icons-outlined" style="color:white !important">person</span>
              </button>
            </div>
            <div
            ref="user_menu"
              class="user_menu z-50  absolute  right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user"
            >
              <div class="px-4 py-3" role="none">
                <p class="text-left text-sm text-gray-900 dark:text-white" role="none">
                  {{haveUser ? auth.user.user_metadata.full_name : ''}}
                </p>
                <p
                  class="text-left text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                  role="none"
                >
                  {{haveUser ? auth.user.user_metadata.email : ''}}
                </p>
              </div>
              <ul class="py-1" >
                <li>
                  <p
                    class="text-left cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    @click="$router.push({name:'pro'})"
                    >Configurações da Conta</p
                  >
                </li>
                <li>
                  <p
                    class="text-left cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  
                    @click="$router.push({name:'pro'})"
                    >Seja Pro</p
                  >
                </li>
                <li>
                  <p
                    class="text-left cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    @click="auth.logout"

                    >Sair</p
                  >
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuth } from '@/store/auth';
export default {
    props:['expand'],
    emits:['update:expand'],
    data(){
        const auth = useAuth();
        return {
            auth,
            openMenuUser:false
        }
    },
    computed:{
          curExpand:{
            get(){
                return this.expand
            },
            set(newexpand){
                this.$emit('update:expand',newexpand)
            }
        },
        haveUser(){
          return this.auth.user && this.auth.user.user_metadata && this.auth.user.user_metadata.picture
        }
    },
    async mounted(){
        await this.auth.getUser()
    },
    watch:{
      openMenuUser(newvalue){
        console.log(newvalue)
        this.$refs.user_menu.classList[newvalue ? 'add' : 'remove']('user_menu_active')
      }
    }
};
</script>

<style scoped>
.user_menu_active {
 top:100% !important;
 opacity: 1 !important;
 visibility: visible !important;
}
.user_menu {
  top:90%;
 opacity: 0;
 visibility: hidden;
 transition: .3s ease;
}
</style>