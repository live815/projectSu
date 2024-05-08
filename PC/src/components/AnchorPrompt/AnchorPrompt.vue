<template>
  <el-tooltip placement="bottom">
    <template #content>
      <div style="width: 230px; border-radius: 4px; background: #232949">
        <div class="p1">[{{$t('Components.Disclaimer')}}]</div>
        <div class="p2">
          ① {{$t('Components.DisclaimerTips_1')}}
        </div>
        <div class="p2">
          ② {{$t('Components.DisclaimerTips_2')}}
        </div>
      </div>
    </template>
    <Point />
  </el-tooltip>
</template>
<script setup>
import Point from '@/components/icons/Point.vue'
</script>
<style scoped lang="scss"></style>
