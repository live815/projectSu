<!-- vip返水配置 -->
<template>
  <div class="vip-rebate-index">
    <el-row>
      <el-col class="title">{{ $t('member.basicConfig') }}</el-col>
      <el-col :span="12" class="mb-20">
        <span class="mr-12">{{ $t('member.withdrawTurnoverMultiple') }}</span>
        <el-input v-model="multiple" :placeholder="$t('member.pleaseInput')" clearable style="width:calc(100% - 108px)">
          <template #append>
            <span>{{ $t('member.times') }}</span>
          </template>
        </el-input>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button type="primary" size="small" @click="saveMultiple">{{ $t('member.save') }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span class="switch-header">{{ $t('member.rebateSwitch') }}</span>
        <el-switch
          v-model="rebateSwitch"
          inline-prompt
          active-value="0"
          inactive-value="1"
          :active-text="$t('member.unlock')"
          :inactive-text="$t('member.lock')"
          @click="changeSwitch"
        />
      </el-col>
    </el-row>
    <el-form
      :model="queryParams"
      ref="queryRef"
      label-position="top"
      :rules="rules"
      class="form-data"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="" prop="tableData" class="full-width">
            <el-table :data="queryParams.tableData" style="width: 100%" :empty-text="$t('member.noData')">
              <el-table-column
                prop="vipName"
                :label="$t('member.vipLevelNoQuote')"
                width="150"
                align="center"
              />
              <el-table-column :label="$t('member.rebatePercent')" align="center">
                <el-table-column prop="name" width="240" align="center">
                  <template #header>
                    <span class="pointer" @click="openDialog(sportLobbyCode)"
                      >{{ $t('member.sportPlus') }}</span
                    >
                  </template>
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.sportsRatio`"
                      :rules="rules.percent"
                      class="full-width"
                    >
                      <el-input
                        v-model="row.sportsRatio"
                        :placeholder="$t('member.pleaseInputPercent')"
                        clearable
                      >
                        <template #append>
                          <span class="percentage-symbol">%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="Address" width="240" align="center">
                  <template #header>
                    <span class="pointer" @click="openDialog(realLobbyCode)"
                      >{{ $t('member.realPlus') }}</span
                    >
                  </template>
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.casinoRatio`"
                      :rules="rules.percent"
                      class="full-width"
                    >
                      <el-input
                        v-model="row.casinoRatio"
                        :placeholder="$t('member.pleaseInputPercent')"
                        clearable
                      >
                        <template #append>
                          <span class="percentage-symbol">%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="name" width="240" align="center">
                  <template #header>
                    <span class="pointer" @click="openDialog(slotLobbyCode)"
                      >{{ $t('member.slotRatio') }}</span
                    >
                  </template>
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.slotRatio`"
                      :rules="rules.percent"
                      class="full-width"
                    >
                      <el-input
                        :placeholder="$t('member.pleaseInputPercent')"
                        v-model="row.slotRatio"
                        clearable
                      >
                        <template #append>
                          <span class="percentage-symbol">%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <!-- <el-table-column
          prop="Address"
          label="捕鱼 +"
          width="240"
          align="center"
        >
          <template #default="{ row }">
            <el-input
              v-model="row.fishingRatio"
              :placeholder="$t('member.pleaseInputPercent')"
              style="width: 180px"
            >
              <template #append>
                <span class="percentage-symbol">%</span>
              </template>
            </el-input>
          </template>
        </el-table-column> -->
                <el-table-column prop="Address" width="240" align="center">
                  <template #header>
                    <span class="pointer" @click="openDialog(gameLobbyCode)"
                      >{{ $t('member.esportsRatio') }}</span
                    >
                  </template>
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.esportsRatio`"
                      :rules="rules.percent"
                      class="full-width"
                    >
                      <el-input
                        v-model="row.esportsRatio"
                        :placeholder="$t('member.pleaseInputPercent')"
                        clearable
                      >
                        <template #append>
                          <span class="percentage-symbol">%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="Address" width="230" align="center">
                  <template #header>
                    <span class="pointer" @click="openDialog(pokerLobbyCode)"
                      >{{ $t('member.boardGamesRatio') }}</span
                    >
                  </template>
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.boardGamesRatio`"
                      :rules="rules.percent"
                      class="full-width"
                    >
                      <el-input
                        v-model="row.boardGamesRatio"
                        :placeholder="$t('member.pleaseInputPercent')"
                        clearable
                      >
                        <template #append>
                          <span class="percentage-symbol">%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="Address" width="230" align="center">
                  <template #header>
                    <span class="pointer" @click="openDialog(lotteryLobbyCode)"
                      >{{ $t('member.lotteryRatio') }}</span
                    >
                  </template>
                  <template #default="{ row, $index }">
                    <el-form-item
                      :prop="`tableData.${$index}.lotteryRatio`"
                      :rules="rules.percent"
                      class="full-width"
                    >
                      <el-input
                        v-model="row.lotteryRatio"
                        :placeholder="$t('member.pleaseInputPercent')"
                        style="width: 180px"
                      >
                        <template #append>
                          <span class="percentage-symbol">%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="vip-rebate">
      <el-button type="primary" @click="submit">{{$t('member.save')}}</el-button>
      <el-button @click="recoveryLastData">{{$t('member.recoverLastSetting')}}</el-button>
    </el-row>
    <VipRebateItem v-model:open="open" :lobbyCode="lobbyCode" v-if="open" />
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import {
  getViprebatefigList,
  editViprebatefigList,
  editViprebatefigSwitch,
  updateRebateMultiple
} from "@/api/member/vip/index";
import { deepCopy } from "@/utils/index";
import VipRebateItem from "./VipRebateItem.vue";

const { proxy } = getCurrentInstance();
const tenantId = ref(null); //平台ID
const rebateSwitch = ref("0"); //返水开关
const multiple = ref(null); // 流水倍数
const queryParams = ref({
  tableData: [],
});
const rules = ref({
  percent: [
    {
      pattern: /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/,
      message: "请输入0~100之间两位小数",
      trigger: "blur",
    },
  ],
});
const tableDataClone = ref([]);
const sportLobbyCode = ref("SPORTS");
const realLobbyCode = ref("REAL");
const pokerLobbyCode = ref("POKER");
const slotLobbyCode = ref("SLOT");
const lotteryLobbyCode = ref("LOTTERY");
const gameLobbyCode = ref("GAMING");
const lobbyCode = ref(null);
const open = ref(false);

getList();
function getList() {
  getViprebatefigList().then((res) => {
    queryParams.value.tableData = res.list || [];
    tableDataClone.value = res ? deepCopy(queryParams.value.tableData) : [];
    rebateSwitch.value = res.rebateSwitch;
    multiple.value = res.rebateMultiple;
    tenantId.value = res.tenantId;
  });
}

function submit() {
  editViprebatefigList(queryParams.value.tableData).then((res) => {
    proxy.$modal.msgSuccess("保存成功");
    getList();
  });
}
function changeSwitch() {
  editViprebatefigSwitch({
    rebateSwitch: rebateSwitch.value,
    tenantId: tenantId.value,
  }).then((res) => {
    proxy.$modal.msgSuccess("开关状态修改成功");
    getList();
  });
}
function recoveryLastData() {
  queryParams.value.tableData = deepCopy(tableDataClone.value);
}
function openDialog(code) {
  lobbyCode.value = code;
  open.value = true;
}
function saveMultiple(){
  updateRebateMultiple({
    rebateMultiple:multiple.value
  }).then(res=>{
    proxy.$modal.msgSuccess("编辑成功");
    //queryMultiple();
  })
}
</script>

<style lang="scss" scoped>
.vip-rebate-index {
  .title{
    margin-bottom:20px;
    font-size:28px;
    color:#333333;
    font-weight: 600;
  }
  .switch-header {
    margin-right: 8px;
  }
  .vip-rebate {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: flex-end; /* 垂直底部对齐 */
    height: 20vh;
  }
  .pointer {
    cursor: pointer;
  }
  .form-data {
    :deep() {
      .el-table .cell {
        padding-bottom: 16px !important;
      }
    }
  }
}
</style>
