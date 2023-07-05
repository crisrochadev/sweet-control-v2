<template>
  <div>Carregando...</div>
</template>

<script>
import { useAuth } from '@/store/auth'
  import {supabase} from '../lib/supabaseClient'
export default {
  data(){
    const auth = useAuth();
    return{
      auth
    }
  },
  async mounted(){
    // this.$router.push({name:'login'});
   const { data, error } = await supabase.auth.getSession()
   console.log(data)
   if(data && data.session && data.session.user){
    this.auth.setUserSession(data.session);
    this.$router.push({name:'dash'})
   }else{
    this.$router.push({name:'login'})
   }
  }
}
</script>

<style>

</style>