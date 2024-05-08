<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('game.lobbyName1')" prop="lobbyName">
        <el-input
          v-model="queryParams.lobbyName"
          :placeholder="$t('member.pleaseInput')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('game.lobbyType1')" prop="lobbyType">
        <el-select
          v-model="queryParams.lobbyType"
          :placeholder="$t('member.pleaseSelect')"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in lobbyTypeList"
            :key="dict.id"
            :label="dict.lobbyType"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="loading"
          type="primary"
          icon="Search"
          @click="handleQuery"
          >{{ $t("member.search") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("member.reset")
        }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      :data="roleList"
      :empty-text="$t('member.noData')"
    >
      <el-table-column
        :label="$t('game.lobbyName')"
        prop="lobbyName"
        align="center"
      />

      <el-table-column
        :label="$t('game.lobbyType')"
        prop="lobbyType"
        :show-overflow-tooltip="true"
        align="center"
      />
      <!-- <el-table-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="150" /> -->
      <el-table-column
        :label="$t('game.lobbyFee')"
        prop="lobbyFee"
        align="center"
      >
        <template #default="scope"> {{ scope.row.lobbyFee }}% </template>
      </el-table-column>
      <el-table-column
        :label="$t('member.handle')"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <div>
            <el-button type="primary" @click="handleUpdate(scope.row)">{{
              $t("game.updateLobbyFee")
            }}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pager.current"
      v-model:limit="queryParams.pager.size"
      @pagination="getList"
    />
    <!-- 添加或修改用户配置对话框 -->
    <el-dialog
      :title="title"
      v-model="open"
      width="500px"
      append-to-body
      @close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="plantRef">
        <el-form-item :label="$t('game.lobbyType')" prop="lobbyType">
          <el-input v-model="form.lobbyType" disabled />
        </el-form-item>

        <el-form-item :label="$t('game.lobbyName')" prop="lobbyName">
          <el-input v-model="form.lobbyName" disabled />
        </el-form-item>
        <el-form-item :label="$t('game.lobbyFee')" prop="lobbyFee">
          <el-input v-model="form.lobbyFee" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">{{
            $t("member.submit")
          }}</el-button>
          <el-button @click="cancel">{{ $t("member.cancel") }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup name="Arena">
import i18n from "@/i18n";
import { gamePlantList, editPlantCost } from "@/api/game/platmaint";
import { listLobbyType } from "@/api/game/entertcity";
import { onMounted } from "vue";

const showSearch = ref(true);
const isFirstLoad = ref(true);
const roleList = ref([]);
const total = ref(0);
const loading = ref(false);
const open = ref(false);
const title = ref("");
const id = ref(null);
const Labbyfee = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pager: {
      current: 1,
      size: 10,
    },
    lobbyName: "",
    lobbyType: "",
    status: "",
  },
  rules: {
    lobbyFee: [
      {
        required: true,
        message: i18n.global.t("game.lobbyFeeCannotBeEmpty"),
        trigger: "blur",
      },
    ],
  },
});
const lobbyTypeList = ref([]);
const { queryParams, form, rules } = toRefs(data);
const { proxy } = getCurrentInstance();

//查询场馆类型列表
const getLobbyTypeList = () => {
  listLobbyType({
    pager: { current: 1, size: 30 },
    status: 0,
  }).then((res) => {
    // console.log('listLobbyType',res)
    lobbyTypeList.value = res.records;
    total.value = res.total;
  });
};
getLobbyTypeList();

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
/** 查询角色列表 */
function getList() {
  loading.value = true;
  return gamePlantList(queryParams.value)
    .then((response) => {
      roleList.value = toRaw(response.records);
      total.value = response.total;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}

/** 搜索按钮操作 */
function handleQuery() {
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}
// 修改场馆费
function handleUpdate(row) {
  form.value.lobbyType = row.lobbyType;
  form.value.lobbyName = row.lobbyName;
  form.value.lobbyFee = row.lobbyFee + "%";
  title.value = i18n.global.t("game.updateLobbyFee");
  id.value = row.id;
  open.value = true;
}
// 弹窗确定
function submitForm() {
  proxy.$refs["plantRef"].validate((valid) => {
    if (valid) {
      Labbyfee.value = parseFloat(form.value.lobbyFee); //去除百分号且字符串转换成数字
      editPlantCost({ id: id.value, lobbyFee: Labbyfee.value })
        .then((response) => {
          proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
          open.value = false;
          getList();
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}
// 取消按钮
function cancel() {
  open.value = false;
  reset();
}
function reset() {
  form.value = {
    lobbyName: undefined,
    lobbyType: undefined, //游戏平台id
    lobbyFee: undefined,
  };
  proxy.resetForm("plantRef");
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>
