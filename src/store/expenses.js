import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';

export const useExpenses = defineStore('expenses', {
    state() {
        const $router = useRouter();
        return {
            $router,
            expenses:{

            }
        }
    },
    getters: {
        double: state => state.count * 2,
    },
    actions: {
        getExpenses(){
            
        }
    },
})
