import moment from 'moment';
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { useExpenses } from './expenses';

export const useDates = defineStore('dates', {
    state() {
        const expenses = useExpenses();
        const $router = useRouter();
        moment.locale('pt-BR')
        return {
            $router,
            date:moment(),
            expenses
        }
    },
    getters: {
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
            date:moment(Date.now())
        })
    },
    actions: {
        async changeMonth(type,qtd){
            if(type === 'return') {
                this.date = moment(Date.now());
                return;
            }
            this.date = moment(this.date)[type](qtd,'months');
            await this.expenses.getExpenses()
        }
    },
})
