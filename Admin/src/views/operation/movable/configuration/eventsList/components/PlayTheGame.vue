<template>
  <div class="game">
    <el-tabs type="border-card">
      <el-tab-pane :label="$t('operation.all')" class="width">
        <el-checkbox
          class="bold"
          v-model="selectAll"
          @change="selectAllItems"
          :disabled="disabled"
          >{{ $t('operation.selectall') }}</el-checkbox
        >
        <div v-for="(item, index) in gameTypeList" :key="index">
          <el-checkbox
            v-model="item.checked"
            :label="item.lobbyName"
            @change="handleParentCheckboxChange(item)"
            class="bold"
            :disabled="disabled"
          />
          <el-checkbox
            v-for="(subItem, subIndex) in item.lobbyList"
            v-model="subItem.check"
            :label="subItem.lobbyName"
            :key="subIndex"
            @change="handleChildCheckboxChange(item)"
            size="large"
            :disabled="disabled"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane v-for="(item, index) in gameTypeList" :label="item.lobbyName" :key="index">
        <GameTypeCheck :subGameList="item" disabled></GameTypeCheck>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import GameTypeCheck from './GameTypeCheck.vue'

const props = defineProps({
  gameTypeList: Array,
  disabled: {
    type: Boolean,
    default: false
  }
})

const selectAll = ref(false)

const selectAllItems = () => {
  props.gameTypeList.forEach((item) => {
    item.check = selectAll.value
    item.lobbyList.forEach((subItem) => {
      subItem.check = selectAll.value
    })
  })
}

const handleParentCheckboxChange = (item) => {
  item.lobbyList.forEach((subItem) => {
    subItem.check = item.checked
  })
}

const handleChildCheckboxChange = (item) => {
  const allChecked = item.lobbyList.every((subItem) => subItem.check)
  item.check = allChecked
}

const allChildSelected = computed(() => {
  for (const item of props.gameTypeList) {
    for (const subItem of item.lobbyList) {
      if (!subItem.check) {
        return false
      }
    }
  }
  return true
})

watch(allChildSelected, (newVal) => {
  selectAll.value = newVal
})

watch(selectAll, (newVal) => {
  console.log(selectAll, '--', newVal)
  if (newVal) {
    props.gameTypeList.forEach((item) => {
      item.check = newVal
      item.lobbyList.forEach((subItem) => {
        subItem.check = newVal
      })
    })
  } else {
    console.log('0001')
  }
})

onMounted(() => {
  // palyInGameNameList();
  console.log(props.gameTypeList, 'props.gameTypeList')
})
</script>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}
.game {
  width: 100%;
}
.vertical-group {
  display: flex;
  flex-direction: column;
}
.vertical-checkbox {
  margin: 5px 0;
}
:deep() {
  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    width: 138px;
    text-align: center;
  }
}
</style>
