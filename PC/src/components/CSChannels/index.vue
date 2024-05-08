<template>
  <div v-show="isServicePop" class="select-servicePop">
    <div
      class="servicePop-title"
      @mouseover="isHoveredOne = true"
      @mouseleave="isHoveredOne = false"
      :class="{ highlighted: isHoveredOne }"
      @click="openCustomerServicePop()"
    >
      {{ $t('Components.CSLine1') }}
    </div>
    <div
      class="servicePop-title"
      @mouseover="isHoveredTwo = true"
      @mouseleave="isHoveredTwo = false"
      :class="{ highlighted: isHoveredTwo }"
      @click="visibility = 'maximized'"
    >
      {{ $t('Components.CSLine2') }}
    </div>
    <LiveChatWidget
      license="17512305"
      :visibility="visibility"
      @visibility-changed="handleNewEvent"
    />
  </div>
</template>
<script setup>
import { LiveChatWidget } from '@livechat/widget-vue'
import { openCustomerServicePop } from '@/utils/customerService'

defineProps(['isServicePop'])
const visibility = ref('hidden')
const isHoveredOne = ref(false)
const isHoveredTwo = ref(false)

function handleNewEvent(event) {
  const { visibility: _visibility } = event
  if (_visibility === 'minimized') {
    visibility.value = 'hidden'
  }
}

onMounted(() => {
  visibility.value = 'hidden'
})
</script>
<style scoped>
.select-servicePop {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 118px;
  height: 92px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #232949;
  color: var(-----100, #fff);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.23);
  .servicePop-title {
    width: 110px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    flex-shrink: 0;
    margin: 2px 0;
    background-color: #171a2f;
  }
  .highlighted {
    background-color: #323c6f;
  }
}
</style>
