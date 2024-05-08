<!-- 活动内容 -->
<template>
  <el-form :model="props.list" ref="ruleFormRef">
    <el-form-item class="add">
      <el-button type="primary" @click="rewardEdit">{{
        $t("operation.tip83")
      }}</el-button>
    </el-form-item>
    <el-form-item>
      <el-table :data="props.list" style="width: 100%" height="200">
        <el-table-column
          type="index"
          prop="number"
          :label="$t('operation.serialnumber')"
          width="210"
        />
        <el-table-column
          prop="content"
          :label="
            $t(
              type === 'content' ? 'operation.content' : 'operation.Rulecontent'
            )
          "
          width="210"
        >
          <template #default="{ row }">
            <span v-if="row.type == 1">{{ row.content }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="appImg"
          :label="$t('operation.tip84')"
          width="210"
        >
          <template #default="scope">
            <img
              v-if="scope.row.type == 2"
              :src="getImgUrl(scope.row.appImg)"
              class="image-display"
            />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="webImg"
          :label="$t('operation.Webpictures')"
          width="210"
        >
          <template #default="scope">
            <img
              v-if="scope.row.type == 2"
              :src="getImgUrl(scope.row.webImg)"
              class="image-display"
            />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('operation.operate')"
          width="200"
          align="center"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              class="ml-2"
              type="primary"
              size="small"
              @click="rewardEdit(scope)"
              >{{ $t("operation.editInfomation") }}</el-button
            >
            <el-button
              class="ml-2"
              type="danger"
              size="small"
              @click="rewardDel(scope.$index)"
              >{{ $t("operation.delete") }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
  <addInsert
    ref="dialogRef"
    :gearObj="gearObj"
    :editIndex="editIndex"
    :list="list"
    @renewKey="renewKey"
    :key="key"
  />
</template>

<script setup>
import { ref } from "vue";
import addInsert from "./addInsert.vue";
import { getImgUrl } from "@/utils";
const props = defineProps({ list: { type: Array }, type: { type: String } });

const dialogRef = ref();
const ruleFormRef = ref();
const editIndex = ref(-1);
const gearObj = ref({});
const key = ref(1);

const renewKey = () => {
  key.value++;
};

// 编辑修改
const rewardEdit = (scope) => {
  editIndex.value = scope.$index === undefined ? -1 : scope.$index;
  gearObj.value = scope.row;
  dialogRef.value.show();
};

//删除
const rewardDel = (index) => props.list.splice(index, 1);
</script>

<style scoped>
.add {
  margin-bottom: 10px;
}
.image-display {
  width: 150px;
  height: 150px;
}
</style>
