<template>
  <div>
    <el-table :data="processedData" :border="true" style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column
        prop="giftName"
        label="奖品名称（奖品类型）（奖品属性）"
        align="center"
        width="100"
      />
      <el-table-column prop="betMultiple" label="彩金金额（流水倍数）" align="center" />
      <el-table-column label="奖品中奖概率权重（占比%）" width="100" align="center">
        <template #default="scope">
          <p>{{ scope.row.weights }}</p>
          <p>({{  scope.row.weights }}%)</p>
        </template>
      </el-table-column>
      <el-table-column label="奖品数量上限">
        <template #default="scope">
          <span v-if="scope.row.limitNumSwitch">{{ scope.row.limitNum }}</span>
          <span v-else>无限制</span>
        </template>
      </el-table-column>
      <el-table-column label="中奖名单">
        <template #default="scope">
          <span v-if="scope.row.showSwitch">展示</span>
          <span v-else>不展示</span>
        </template>
      </el-table-column>
      <el-table-column prop="maxNum" label="单人最多中奖个数" align="center">
        <template #default="scope">
          <span v-if="scope.row.limitNumSwitch">{{ scope.row.maxNum }}</span>
          <span v-else>无限制</span>
        </template>
      </el-table-column>
      <el-table-column label="奖品图片">
        <template #default="scope">
          <img
            v-if="scope.row.giftImg"
            :src="getImgUrl(scope.row.giftImg)"
            width="50"
            height="50"
          />
        </template>
      </el-table-column>
      <el-table-column label="限制" width="200" align="center">
        <template #default="scope">
          <div class="vipBox" v-if="scope.row.vipSet.length && scope.row.limitNumSwitch">
            <div class="item" v-for="(item, index) in scope.row.vipSet.split(',')" :key="index">
              VIP{{ item }}
            </div>
          </div>
          <span v-else>无限制</span>
        </template>
      </el-table-column>
      <el-table-column prop="limitUserSwitch" label="账号限制" align="center">
        <template #default="scope">
          <span v-if="!scope.row.limitUserSwitch">无限制</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="编辑" width="150" align="center">
        <template #default="scope">
          <div style="margin-bottom: 10px">
            <el-button :icon="Top" circle @click="moveArrayItem(scope.$index, 'top')" />
            <el-button :icon="Bottom" circle @click="moveArrayItem(scope.$index, 'down')" />
            <el-button type="primary" :icon="Edit" circle @click="edit(scope.$index)" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <PrizeWeightPopUp :key="popUpKey" ref="prizeWeightPopUpDom" @editLine="editLine" />
  </div>
</template>

<script setup>
import { Edit, Top, Bottom } from '@element-plus/icons-vue'
import PrizeWeightPopUp from './PrizeWeightPopUp.vue'
import { getImgUrl } from '@/utils'
const prizeWeightPopUpDom = ref(null)
const popUpKey = ref(0)
const emit = defineEmits('getWeightsTabData')

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  isEdit: {
    type: Boolean
  }
})

const tableData = ref([
  {
    giftType: 1,
    giftName: '',
    giftAmount: '',
    weights: 10,
    limitNum: '',
    showSwitch: 1,
    maxNum: 0,
    giftImg: '',
    vipSet: '',
    limitUserSwitch: 0,
    limitNumSwitch: 1,
    sorted: 1
  },
  {
    giftType: 1,
    giftName: '',
    giftAmount: '',
    weights: 10,
    limitNum: '',
    showSwitch: 1,
    maxNum: 0,
    giftImg: '',
    vipSet: '',
    limitUserSwitch: 0,
    limitNumSwitch: 1,
    sorted: 2
  },
  {
    giftType: 1,
    giftName: '',
    giftAmount: '',
    weights: 10,
    limitNum: '',
    showSwitch: 1,
    maxNum: 0,
    giftImg: '',
    vipSet: '',
    limitUserSwitch: 0,
    limitNumSwitch: 1,
    sorted: 3
  },
  {
    giftType: 1,
    giftName: '',
    giftAmount: '',
    weights: 10,
    limitNum: '',
    showSwitch: 1,
    maxNum: 0,
    giftImg: '',
    vipSet: '',
    limitUserSwitch: 0,
    limitNumSwitch: 1,
    sorted: 4
  },
  {
    giftType: 1,
    giftName: '',
    giftAmount: '',
    weights: 10,
    limitNum: '',
    showSwitch: 1,
    maxNum: 0,
    giftImg: '',
    vipSet: '',
    limitUserSwitch: 0,
    limitNumSwitch: 1,
    sorted: 5
  },
  {
    giftType: 1,
    giftName: '',
    giftAmount: '',
    weights: 10,
    limitNum: '',
    showSwitch: 1,
    maxNum: 0,
    giftImg: '',
    vipSet: '',
    limitUserSwitch: 0,
    limitNumSwitch: 1,
    sorted: 6
  },
  {
    giftType: 1,
    giftName: '',
    giftAmount: '',
    weights: 10,
    limitNum: '',
    showSwitch: 1,
    maxNum: 0,
    giftImg: '',
    vipSet: '',
    limitUserSwitch: 0,
    limitNumSwitch: 1,
    sorted: 7
  },
  {
    giftType: 1,
    giftName: '',
    giftAmount: '',
    weights: 10,
    limitNum: '',
    showSwitch: 1,
    maxNum: 0,
    giftImg: '',
    vipSet: '',
    limitUserSwitch: 0,
    limitNumSwitch: 1,
    sorted: 8
  },
  {
    giftType: 1,
    giftName: '',
    giftAmount: '',
    weights: 10,
    limitNum: '',
    showSwitch: 1,
    maxNum: 0,
    giftImg: '',
    vipSet: '',
    limitUserSwitch: 0,
    limitNumSwitch: 1,
    sorted: 9
  },
  {
    giftType: 1,
    giftName: '',
    giftAmount: '',
    weights: 10,
    limitNum: '',
    showSwitch: 0,
    maxNum: 0,
    giftImg: '',
    vipSet: '',
    limitUserSwitch: 0,
    limitNumSwitch: 1,
    sorted: 10
  }
])

const processedData = computed(() => {
  const arr = props.isEdit ? props.data : tableData.value
  return arr.sort((a, b) => a.sorted - b.sorted)
})

const edit = (index) => {
  const data = props.isEdit ? props.data[index] : tableData.value[index]
  prizeWeightPopUpDom.value.switchS(index, data)
}
const editLine = (data, rowIndex) => {
  tableData.value.forEach((item, index) => {
    if (index === rowIndex) {
      const replicaData = props.isEdit ? props.data : tableData.value
      replicaData[rowIndex] = data
      emit('getWeightsTabData', replicaData)
    }
  })
  popUpKey.value++
}

const moveArrayItem = (index, direction) => {
  const array = props.data.length ? props.data : tableData.value
  const newIndex = direction === 'top' ? index - 1 : index + 1

  if (newIndex >= 0 && newIndex < array.length) {
    // 利用解构赋值交换数组元素位置
    ;[array[index], array[newIndex]] = [array[newIndex], array[index]]

    // 更新 sorted 字段的值
    array.forEach((obj, i) => {
      obj.sorted = i + 1
    })

    return array
  } else {
    return array
  }
}
</script>

<style lang="scss" scoped>
.vipBox {
  display: flex;
  flex-wrap: wrap;
  .item {
    flex: 0 0 calc(30% - 5px);
    width: 60px;
    height: 30px;
    background: #8080ff;
    text-align: center;
    line-height: 30px;
    margin: 5px;
  }
}
</style>