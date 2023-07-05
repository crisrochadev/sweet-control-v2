<template>

<sweet-nav v-model:expand="expand"/>

<sweet-aside :menu="menu" v-model:expand="expand" />

<div class="p-4 transition-all delay-100" :class="[expand ? 'sm:ml-64' : 'sm:ml-14']">
   <router-view :key="$route.path" />
</div>

</template>

<script>
import SweetButton from "@/components/defaults/SweetButton.vue";
import { useAuth } from '@/store/auth';
import SweetAside from '@/components/admin/SweetAside.vue';
import SweetNav from '@/components/admin/SweetNav.vue';
export default {
  components: { SweetButton, SweetAside, SweetNav },
  data(){
    const auth = useAuth();
    return {
      auth,
      menu:[
        {
          id:1,
          title:'Minhas despesas',
          to:'expenses',
          icon:'account_balance_wallet',
          ispro:false,
        },
        {
          id:2,
          title:'Notificações',
          to:'notify',
          icon:'notifications',
          ispro:false,
          notifications:3
        },
        {
          id:3,
          title:'Recalcular',
          to:'recalc',
          icon:'calculate',
          ispro:true,
          dest:true
        },
         {
          id:4,
          title:'Ser Pro',
          to:'pro',
          icon:'wallet',
          ispro:false,
        },
         {
          id:5,
          title:'Sair',
          method:auth.logout,
          icon:'logout',
          ispro:false,
        }
      ],
      expand:false
    }
  },
};
</script>

<style>
</style>