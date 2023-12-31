import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabaseClient'
import { useStorage } from '@vueuse/core';

export const useAuth = defineStore('auth', {
    state() {
        const $router = useRouter();
        return {
            $router,
            user: null,
            session: {},
            loading:false,
            userId:useStorage("@sweet-control-user-id",null)
        }
    },
    getters: {
        double: state => state.count * 2,
    },
    actions: {
        async login(provider){
            const {data,error} = await supabase.auth.signInWithOAuth({
                provider
            });

            console.table({data,error})
        },
        setUserSession(session){
            this.user = session.user;
            console.log(session)
            this.userId = session.user.id;
            Object.entries(session).forEach(([key,value]) => {
                if(key !== 'user'){
                    this.session[key] = value;
                }
            })
        },
        async logout(){
            this.loading = true;
            await supabase.auth.signOut();
            this.userId = null;
            this.loading = false;
            this.$router.push('/')
        },
        async getUser(){
            const { data: { user } } = await supabase.auth.getUser()
            this.user = user;
        }
    },
})
