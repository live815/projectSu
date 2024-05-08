<template>
  <div class="game-details">
    <div>
      <el-checkbox
        v-model="subGameList.checked"
        @change="handleSelectAllChange"
        :isIndeterminate="isIndeterminate"
        :disabled="disabled"
      >
        {{ $t('operation.selectall') }}
      </el-checkbox>
    </div>
    <el-checkbox
      v-for="(item, index) in subGameList.lobbyList"
      :key="index"
      v-model="item.check"
      :label="item.lobbyName"
      size="large"
      :disabled="disabled"
    />
  </div>
</template>

<script setup>
import { watch, computed } from 'vue'

const props = defineProps({
  subGameList: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const isIndeterminate = computed(() => {
  if (
    props.subGameList.lobbyList.every((item) => {
      return item.check
    })
  ) {
    return 1
  } else if (
    props.subGameList.lobbyList.some((item) => {
      return item.check
    })
  ) {
    return 2
  } else {
    return 0
  }
})

const handleSelectAllChange = () => {
  props.subGameList.lobbyList.forEach((item) => {
    item.check = props.subGameList.checked
  })
}

watch(isIndeterminate, (newVal) => {
  if (newVal) {
    props.subGameList.checked = true
  } else {
    props.subGameList.checked = false
  }
})
</script>

<style lang="scss" scoped></style>
