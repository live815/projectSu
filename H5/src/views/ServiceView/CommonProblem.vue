<template>
  <div class="common-problem">
    <NavBar :border="true" :title="$t('serviceview.commonproblem')" />
    <div class="content">
      <QuestionList ref="QuestionListRef" />
    </div>
  </div>
</template>

<script setup>
import QuestionList from './components/QuestionList/QuestionList.vue'
</script>

<style lang="scss" scoped>
.common-problem {
  background-color: #fff;
  .content {
    @include mobile-padding();
  }
}
</style>
