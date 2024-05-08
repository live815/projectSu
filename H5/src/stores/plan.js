import { defineStore } from 'pinia'
import { getPlanList, getExpertList } from '@/api/live'

export const usePlanStore = defineStore('plan', {
    state: () => ({
        mastersList: [], // 专家列表
        planList: [] // 爆料列表
    }),
    actions: {
        getExpertList() {
            getExpertList().then((res) => {
                if (res.code === 200) {
                    this.mastersList = res.data || []
                }
            })
        },
        getPlanList() {
            getPlanList().then((res) => {
                if (res.code === 200) {
                    this.planList = res.data || []
                }
            })
        }

    }
})