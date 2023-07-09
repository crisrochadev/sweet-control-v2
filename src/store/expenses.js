import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from './auth';
import { useDates } from './dates';

export const useExpenses = defineStore('expenses', {
    state() {
        const $router = useRouter();
        const auth = useAuth();
        const dates = useDates();
        return {
            $router,
            auth,
            dates,
            finances: null,
            totalIncoming: 1254.36,
            totalExpenses: 1380.00,
        }
    },
    getters: {
        double: state => state.count * 2,
        totalDiff: state => state.totalIncoming - state.totalExpenses,
    },
    actions: {
        async getExpenses() {
            try {
                const { data, error } = await supabase
                    .from("allcontrol")
                    .select()
                    .match({ userId: this.auth.userId })
                    .or(
                        `repeat.eq.fixed,and(currentMonth.eq.${this.dates.currentMonth.number},currentYear.eq.${this.dates.currentYear})`
                    );

                if (error) {
                    throw new Error('Erro ao buscar dados no Supabase');
                } else {
                    this.finances = data;
                    return { error: false, data };
                }
            } catch (error) {
                console.error(error);


            }
        },
        async updateFinance(type,value,id){
            const { data,error } = await supabase.from('allcontrol').update({[type]:value}).eq('id',id).select();
            if(!error){
                await this.getExpenses();
            }
        }
    },
})
