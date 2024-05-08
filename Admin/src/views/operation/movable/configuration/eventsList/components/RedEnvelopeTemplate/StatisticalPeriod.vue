<!-- 活动内容 -->
<template>
  <el-table :data="list">
    <el-table-column type="index" :label="$t('system.serialnumber')" width="100" />
    <el-table-column prop="name" :label="$t('gameTemplate.label58')">
      <template #default="{ row }">
        <span>{{ row.name || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="giftType" :label="$t('gameTemplate.label59')">
      <template #default="{ row }">
        <span>{{ row.giftAmount || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="giftAmount" :label="$t('gameTemplate.label60')">
      <template #default="{ row }">
        <span>{{ row.giftAmount || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="betMultiple" :label="$t('gameTemplate.label61')">
      <template #default="{ row }">
        <span>{{ row.betMultiple || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="betMultiple" :label="$t('gameTemplate.label62')">
      <template #default="{ row }">
        <span>{{ row.betMultiple || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" :label="$t('operation.operate')" align="center">
      <template #default="scope">
        <el-button class="ml-2" type="primary" size="small" @click="rewardEdit(scope)">
          {{ $t('operation.editInfomation') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <span style="color: red; font-size: 12px">
    {{ $t('gameTemplate.label63') }}
  </span>
  <el-dialog v-model="visible" :title="$t('operation.edit')" width="800px" :center="true">
    <el-form :model="queryParams" ref="queryRef" label-width="130px">
      <el-form-item :label="$t('gameTemplate.label64')" prop="giftType">
        <el-input
          v-model="queryParams.giftAmount"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 200px"
        >
          <template #prepend>{{ $t('operation.VIP') }}</template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label65')" prop="giftAmount">
        <el-input
          v-model="queryParams.giftAmount"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 200px"
        >
          <template #append>%</template>
        </el-input>
        <span style="color: red; font-size: 12px; margin-left: 20px">
          {{ $t('gameTemplate.label67') }}
        </span>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label66')" prop="betMultiple">
        <el-input
          v-model="queryParams.giftAmount"
          :placeholder="$t('newbie.form.placeholder1')"
          style="width: 200px"
        >
          <template #append>{{ $t('gameTemplate.label57') }}</template>
        </el-input>
        <span style="color: red; font-size: 12px; margin-left: 20px">
          {{ $t('gameTemplate.label68') }}
        </span>
      </el-form-item>
      <el-form-item :label="$t('gameTemplate.label70')" prop="agentSet">
        <el-radio-group v-model="type">
          <el-radio :label="1" size="large">{{ $t('gameTemplate.label71') }}</el-radio>
          <el-radio :label="2" size="large">{{ $t('gameTemplate.label72') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider />
      <template v-if="type === 1">
        <el-form-item :label="$t('gameTemplate.label73')" prop="agentSet">
          <el-input
            v-model="queryParams.giftAmount"
            :placeholder="$t('newbie.form.placeholder1')"
            style="width: 200px"
          >
            <template #append>{{ $t('gameTemplate.label56') }}</template>
          </el-input>
          <span style="color: red; font-size: 12px; margin-left: 20px">
            {{ $t('gameTemplate.label69') }}
          </span>
        </el-form-item>
        <el-form-item :label="$t('gameTemplate.label74')" prop="agentSet">
          <el-input
            v-model="queryParams.giftAmount"
            :placeholder="$t('newbie.form.placeholder1')"
            style="width: 200px"
          >
            <template #append>{{ $t('gameTemplate.label56') }}</template>
          </el-input>
          <span style="color: red; font-size: 12px; margin-left: 20px">
            {{ $t('gameTemplate.label75') }}
          </span>
        </el-form-item>
      </template>

      <template v-else>
        <span style="color: red; font-size: 12px; margin-left: 55px">
          {{ $t('gameTemplate.label76') }}
        </span>
        <el-form-item prop="agentSet" style="margin-bottom: 0">
          <el-form-item :label="$t('gameTemplate.label77')" prop="date1">
            <el-input
              v-model="queryParams.giftAmount"
              :placeholder="$t('newbie.form.placeholder1')"
              style="width: 200px"
            >
              <template #append>{{ $t('gameTemplate.label56') }}</template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('gameTemplate.label65')" prop="date1">
            <el-input
              v-model="queryParams.giftAmount"
              :placeholder="$t('newbie.form.placeholder1')"
              style="width: 200px"
            >
              <template #append>%</template>
            </el-input>
            <el-button style="margin-left: 20px" type="primary">
              {{ $t('operation.add2') }}
            </el-button>
          </el-form-item>
        </el-form-item>
        <el-form-item prop="agentSet" style="margin-bottom: 0">
          <el-form-item :label="$t('gameTemplate.label77')" prop="date1">
            <el-input
              v-model="queryParams.giftAmount"
              :placeholder="$t('newbie.form.placeholder1')"
              style="width: 200px"
            >
              <template #append>{{ $t('gameTemplate.label56') }}</template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('gameTemplate.label65')" prop="date1">
            <el-input
              v-model="queryParams.giftAmount"
              :placeholder="$t('newbie.form.placeholder1')"
              style="width: 200px"
            >
              <template #append>%</template>
            </el-input>
            <el-button style="margin-left: 20px" type="primary">
              {{ $t('common.delete') }}
            </el-button>
          </el-form-item>
        </el-form-item>
      </template>
      <el-form-item class="bottom left">
        <el-button type="primary" @click="addGear()">{{ $t('operation.sure1') }}</el-button>
        <el-button @click="visible = false">{{ $t('operation.close') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const props = defineProps({ list: { type: Array } })
const editIndex = ref(-1)
const gearObj = ref({})
const visible = ref(false)
const queryParams = ref()
const queryRef = ref()
const type = ref(1)

// 确认
const addGear = async () => {
  await queryRef.value.validate((valid, fields) => {
    if (valid) {
      if (props.editIndex < 0) {
        props.list.push(queryParams.value)
      } else {
        props.list[props.editIndex] = queryParams.value
      }
      visible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

watchEffect(() => {
  queryParams.value = props.gearObj
    ? cloneDeep(props.gearObj)
    : {
        betMultiple: null, //流水倍数
        depositAmount: 0, //存款金额，签到礼包所需
        giftAmount: null, //奖励金额
        giftType: 1, //奖品类型：1现金，2现金券，3存送券，4流水券，5实物
        profitAmount: 0, //负盈利金额，复活礼包所需
        profitRate: 0, //负盈利比例，百分比，复活礼包所需
        validBet: 0 //有效投注，签到礼包所需
      }
})

// 编辑修改
const rewardEdit = (scope) => {
  editIndex.value = scope.$index === undefined ? -1 : scope.$index
  gearObj.value = scope.row
  visible.value = true
}

const assessment = [
  { label: i18n.t('gameTemplate.label15'), value: 1 },
  { label: i18n.t('gameTemplate.label16'), value: 2 }
]
</script>

<style scoped>
:deep() {
  .el-form-item {
    margin-bottom: 18px;
  }
}
</style>
