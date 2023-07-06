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
        currentMonth:state => ({
            text:state.date.format('MMMM'),
            number:state.date.format('MM')
        }),
        previuosMonth: state => {
            const prevMonth = moment(state.date).subtract(1,'months');
            return {
                text:prevMonth.format('MMMM'),
                number:prevMonth.format('MM')
            }
        },
        nextMonth: state => {
            const nMonth = moment(state.date).add(1,'months');
            return {
                text:nMonth.format('MMMM'),
                number:nMonth.format('MM')
            }
        },
        currentYear: state => state.date.format('YYYY'),
        currentDate:state => ({
            day:state.date.format('DD'),
            week:state.date.format('dd'),
            longweek:state.date.format('dddd'),
            month:state.date.format('MM'),
            longmonth:state.date.format('MMMM'),
            year:state.date.format('YYYY'),
        }),
        today:() => ({
            day:moment(Date.now()).format('DD'),
            week:moment(Date.now()).format('dd'),
            longweek:moment(Date.now()).format('dddd'),
            month:moment(Date.now()).format('MM'),
            longmonth:moment(Date.now()).format('MMMM'),
            year:moment(Date.now()).format('YYYY'),
        })
    },
    actions: {
        getExpenses(){
            
        },
        changeMonth(type,qtd){
            if(type === 'return') {
                this.date = moment(Date.now());
                return;
            }
            this.date = moment(this.date)[type](qtd,'months');
        }
    },
})
