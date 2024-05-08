<template>
  <div class="boxNoList">
    <NoList />
    <p class="txt">{{$t('Components.NoData')}}~</p>
  </div>
</template>
<script setup>
import NoList from '@/components/icons/NoList.vue'
</script>
<style scoped lang="scss">
.boxNoList{
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .txt{
        color: var(--80, var(---80, rgba(255, 255, 255, 0.80)));
        text-align: center;
        
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        margin-top: 10px;
        line-height: 16px; /* 114.286% */
    }
}
</style>
