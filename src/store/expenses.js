import moment from 'moment';
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';

export const useExpenses = defineStore('expenses', {
    state() {
        const $router = useRouter();
        moment.locale('pt-BR')
        return {
            $router,
            expenses:{

            },
            totalIncoming:1254.36,
            totalExpenses:1380.00,
            date:moment()
        }
    },
    getters: {
        double: state => state.count * 2,
        totalDiff:state => state.totalIncoming - state.totalExpenses,
        currentMonth:state => state.date.format('MMMM')
    },
    actions: {
        getExpenses(){
            
        }
    },
})
