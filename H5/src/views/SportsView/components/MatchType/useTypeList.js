import { ref, computed } from 'vue'
import { useFBStore } from '@/stores/fb'
import i18n from '@/i18n/index'
export function useTypeList() {
  const fbStore = useFBStore()
  const currentIdx = ref(0)
  const list = computed(() => {
    return fbStore.statistical.sl || []
  })
  let initList = [
    {
      des: i18n.global.t('Sportsview.live'),
      ty: 1
    },
    {
      des: i18n.global.t('Sportsview.today'),
      ty: 3
    },
    {
      des: i18n.global.t('Sportsview.early'),
      ty: 4
    },
    {
      des: i18n.global.t('Sportsview.follow')
    },
    {
      des: i18n.global.t('Sportsview.champ'),
      ty: 7
    }
  ]
  const filterList = computed(() => {
    const arr = [...initList]
    arr.forEach((item) => {
      let currentObj = list.value.find((o) => o.ty == item.ty)
      if (currentObj) {
        item.tc = currentObj.tc
        item.ssl = currentObj.ssl
      } else {
        item.tc = Object.values(fbStore.followList).flat().length //接口获取
      }
    })
    return arr
  })
  let idx = initList.findIndex((item) => item.ty === fbStore.queryMatchListParams.type)
  if (idx > -1) {
    currentIdx.value = idx
  }
  function select(item, idx) {
    if (currentIdx.value === idx) return
    currentIdx.value = idx
    fbStore.queryMatchListParams.type = item.ty
  }
  return {
    currentIdx,
    filterList,
    select
  }
}
