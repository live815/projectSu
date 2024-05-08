<template>
  <div class="question">
    <h3>{{ $t('serviceview.commonproblem') }}</h3>
    <QuestionList
      :limit="6"
      ref="QuestionListRef"
      @tutorialList="tutorialList"
      @update:active="updateActive"
    />

    <div class="more" v-if="dataList[active]?.subList.length > 3">
      <span class="more-title" @click="goQuestionView">{{ $t('serviceview.seemore') }}</span>
      <IcoArrowRight />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import QuestionList from '../QuestionList/QuestionList.vue'
const QuestionListRef = ref(null)
const dataList = ref([])
const active = ref(0)

const goQuestionView = () => {
  const active = QuestionListRef.value.active
  router.push({
    path: `/service-question/${active}`
  })
}
const tutorialList = (data) => {
  dataList.value = data
}
const updateActive = (newActive) => {
  active.value = newActive
}
</script>

<style lang="scss" scoped>
.question {
  padding-top: 17px;
  padding-left: 15px;
  background: #fff;
  border-radius: 12px;
  h3 {
    color: #ff5000;
    font-weight: 600;
    margin-bottom: 3px;
  }
}
.normal-question {
  width: 68px;
}

.more {
  height: 48.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  .more-title {
    color: #888;
    font-size: 14px;
    margin-right: 4px;
  }
  svg {
    transform: scale(1.3);
    fill: #999;
  }
}
</style>
