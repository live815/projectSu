<template>
  <div class="Handicap-view">
    <div v-for="(marketsArr, idx) in list" :key="idx" class="Handicap-title" :style="{width:(100/ list.length )+'%', height: '100%'}">
      <template v-for="column in marketsArr" :key="column.mty">
        <div>{{ getMarketTypeText(column) }}</div>
      </template>
    </div>
    <!-- {{ list }} -->
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { getSportMarketType,getMarketTypeText } from '@/hooks/useSportDict'
import { chunk, merge } from 'lodash'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
import { computed, watch, } from 'vue';
const props = defineProps({
  title: {
    type: Object,
    default: () => ({})
  }
})

// console.log(props.title,'盘口1')
const listing = getSportMarketType(i18n)[props.title.sid] || []
const listingTwo = ref(fbStore.isClickBallType ? getSportMarketType(i18n)[fbStore.queryMatchListParams.sportId] : listing)
const currentListing = computed(() => {
  return fbStore.isClickBallType ? listingTwo.value : listing
})
const list = computed(() => {
  const mg = props.title.mg
  const res = currentListing.value?.map((o) => {
    let currentObj = mg.find((op) => op.mty === o.mty)
    if (currentObj) {
      o = merge({}, o, currentObj)
    }
    return o
  })
  // console.log(res,'res')
  if(window.innerWidth<1550){
    // res = res.slice(0.3)
    // console.log(123,res.slice(0,3))
    return chunk(res.slice(0,3), 1)
  }else{
    // console.log(res,'res')
    return chunk(res, 1)
  }
  // return chunk(res, 1)
})

watch(
  ()=>fbStore.queryMatchListParams.sportId,
  ()=>{
    if(fbStore.isClickBallType){
      listingTwo.value = getSportMarketType(i18n)[fbStore.queryMatchListParams.sportId]
    }
    // console.log(list.value.length,'list.value.length',currentListing.value.length)
    if(list.value?.length !== 0 || currentListing.value?.length  !== 0){
      fbStore.handicaplength = list.value?.length || currentListing.value?.length
    }
  }
)
</script>

<style lang="scss" scoped>
.Handicap-view{
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  // margin-right: 16px;
  >div{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    line-height: 15px;
  }
}
</style>