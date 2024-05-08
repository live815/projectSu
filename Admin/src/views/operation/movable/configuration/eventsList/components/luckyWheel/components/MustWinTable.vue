<template>
  <div>
    <el-table :data="tableData" :border="true" style="width: 100%">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="maxNum" width="190" align="center">
        <template #header>
          <div class="header-box">
            <p>抽奖次数</p>
            <p>（一个玩家不得参与多次）</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="activityTurntableGiftId"
        width="140"
        align="center"
      >
        <template #header>
          <div class="header-box">
            <p>对应概率设置</p>
            <p>奖项序号（名称）</p>
          </div>
        </template>
        <template #default="scope">
          <span>{{ scope.row.giftName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量限制" align="center">
        <template #default="scope">
          <span v-if="scope.row.limitNumSwitch">{{
            scope.row.limitNumSwitch
          }}</span>
          <span v-else>无限制</span>
        </template>
      </el-table-column>
      <el-table-column prop="limitNum" label="奖品数量上限" align="center">
        <template #default="scope">
          <span v-if="scope.row.limitNum">{{ scope.row.limitNum }}</span>
          <span v-else>无限制</span>
        </template>
      </el-table-column>
      <el-table-column label="VIP限制" width="200" align="center">
        <template #default="scope">
          <div class="vipBox">
            <div
              class="item"
              v-for="(item, index) in scope.row.vipSet
                ? scope.row.vipSet.split(',')
                : ''"
              :key="index"
            >
              VIP{{ item }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="中奖账号名单" width="120">
        <template #default="scope">
          <el-button
            :text="true"
            type="primary"
            @click="openPopUp(scope.$index)"
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="address" label="编辑" width="150" align="center">
        <template #default="scope">
          <el-button
            type="success"
            :icon="Plus"
            circle
            @click="tableData.push({})"
          />
          <el-button
            type="primary"
            :icon="Edit"
            circle
            @click="edit(scope.$index)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            @click="delRow(scope.$index)"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 中奖账号名单查看弹窗 -->
    <el-dialog v-model="winningDialog" title="中奖名单" width="30%" center>
      <span>玩家账号:{{ tableData[rowIdx].limitUserName }}</span>
    </el-dialog>
    <MustWinPopUp
      ref="MustWinPopUpDom"
      :key="popUpKey"
      @editLine="editLine"
      :vipType="vipType"
    />
  </div>
</template>

<script setup>
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
import MustWinPopUp from "./MustWinPopUp";

const winningDialog = ref(false);
const MustWinPopUpDom = ref(null);
const popUpKey = ref(0);
const dataCopy = ref([]);
const rowIdx = ref(0);
const emit = defineEmits("getMustWinTabData");
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
  vipType: {
    type: Array,
    default: [],
  },
});
const add = () => {
  if (props.data.length) {
    dataCopy.value.push({});
  } else {
    tableData.value.push({});
  }
};
const tableData = ref([
  {
    maxNum: 1,
    activityTurntableGiftId: "",
    giftName: "",
    limitNumSwitch: 0,
    limitNum: 1,
    vipSet: "",
    limitUserSwitch: 0,
  },
]);
const init = () => {
  tableData.value = props.data?.length ? props.data : tableData.value;
};
init();
const edit = (index) => {
  const data = props.data ? props.data[index] : tableData.value;
  MustWinPopUpDom.value.switchS(index, data);
};
const delRow = (index) => {
  if (index >= 0 && index < tableData.value.length) {
    tableData.value.splice(index, 1);
  }
};
const editLine = (data, rowIndex) => {
  tableData.value.forEach((item, index) => {
    if (index === rowIndex) {
      if (data.limitUserName) {
        data.limitUserSwitch = 1;
      } else {
        data.limitUserSwitch = 0;
      }
      const replicaData = props.data?.length ? props.data : tableData.value;
      replicaData[rowIndex] = data;
      emit("getMustWinTabData", replicaData);
    }
  });

  popUpKey.value++;
};
const openPopUp = (index) => {
  winningDialog.value = true;
  rowIdx.value = index;
};
</script>

<style scoped lang="scss">
.header-box {
  text-align: center;
}
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