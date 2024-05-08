<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width=""
    >
      <el-form-item :label="$t('game.gameTableKeep1')" prop="lobbyName">
        <el-input
          v-model="queryParams.lobbyName"
          :placeholder="$t('member.pleaseInput')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="$t('game.status1')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('member.pleaseSelect')"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in selectList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('game.operateTime1')">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('member.beginTime')"
          :end-placeholder="$t('member.endTime')"
          :default-time="defaultTime"
          @change="handleChange"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t("member.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("member.reset")
        }}</el-button>
        <el-button
          type="primary"
          icon="Plus"
          @click="handleUpdate('', 'add')"
          >{{ $t("member.add") }}</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table v-loading="loading" :data="roleList" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('game.lobbyType')"
        prop="lobbyType"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('game.gameTableKeep')"
        prop="lobbyName"
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('game.maintanceStartTime')"
        prop="startTime"
        :show-overflow-tooltip="true"
        width="150"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.startTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('game.maintanceEndTime')"
        align="center"
        prop="endTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.endTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.maintanceContent')"
        prop="remark"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('game.updateTime')"
        prop="updateTime"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template #default="scope">
          <span v-if="scope.row.updateTime">{{ parseTime(scope.row.updateTime) }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.updateBy')"
        prop="updater"
        align="center"
      >
      <template #default="scope">
        <span v-if="scope.row.updater">{{ scope.row.updater }}</span>
        <span v-else>--</span>
      </template>
    </el-table-column>

      <el-table-column
        :label="$t('member.handle')"
        align="center"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <div>
            <el-button
              type="primary"
              @click="handleUpdate(scope.row, 'edit')"
              >{{ $t("game.editInformation") }}</el-button
            >
            <el-button type="warning" @click="handleDelete(scope.row.id)">{{
              $t("member.delete")
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
      <el-form :model="form" :rules="rules" ref="plantRef" label-width="110px">
        <el-row>
          <el-col>
            <el-form-item :label="$t('game.lobbyType')" prop="venuetype">
              <el-radio-group
                v-model="radio1"
                class="ml-4"
                :disabled="isDisabled"
              >
                <el-radio
                  size="large"
                  v-for="item in radioList"
                  :key="item.id"
                  :label="item.id"
                  @change="changehandle(item)"
                  >{{ item.lobbyType }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('game.gameTableKeep')"
              prop="platformmaint"
            >
              <el-radio-group
                v-model="form.lobbyId"
                class="ml-4"
                :disabled="isDisabled"
              >
                <el-radio
                  size="large"
                  v-for="item in plantList"
                  :key="item.id"
                  :label="item.id"
                  @change="changeradiohandle(item)"
                  >{{ item.lobbyName }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col>
            <!-- 维护开始时间 -->
            <el-form-item
              :label="$t('game.maintanceStartTime')"
              prop="startTime"
            >
              <el-date-picker
                style="width: 280px"
                v-model="form.startTime"
                type="datetime"
                :placeholder="$t('member.pleaseSelect')"
                :defaultTime="new Date(2000, 1, 1, 23, 59, 59)"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
          </el-col>

          <el-col>
            <!-- 维护结束时间 -->
            <el-form-item :label="$t('game.maintanceEndTime')" prop="endTime">
              <el-date-picker
                style="width: 280px"
                v-model="form.endTime"
                type="datetime"
                :placeholder="$t('member.pleaseSelect')"
                :defaultTime="new Date(2000, 1, 1, 23, 59, 59)"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item :label="$t('game.maintanceContent')" prop="remark">
              <el-input v-model="form.remark" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
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
<script setup name="Platmaint">
import i18n from "@/i18n";
import {
  platFormaintList,
  addPlatFormaint,
  editPlatFormaint,
  delPlatFormaint,
  gamePlantList,
  getVenueList,
} from "@/api/game/platmaint";
import { defaultTime } from "@/utils/config";
import { ElMessage } from "element-plus";

const { proxy } = getCurrentInstance();
const showSearch = ref(true);
const isFirstLoad = ref(true);
const dateRange = ref([]);
const open = ref(false);
const title = ref("");
const roleList = ref([]);
const total = ref(0);
const loading = ref(true);
const radio1 = ref();
const plantList = ref([]);
const isDisabled = ref(false);

const data = reactive({
  form: {
    lobbyId: undefined, //游戏平台id
    id: "",
  },
  queryParams: {
    pager: {
      current: 1,
      size: 10,
    },
    lobbyName: "",
    endTime: "",
    startTime: "",
    status: "",
  },
  obj: {
    pager: {
      current: 1,
      size: 10000,
    },
  },
  rules: {
    startTime: [
      {
        required: true,
        message: i18n.global.t("game.pleaseSelectTimeSatrt"),
        trigger: "blur",
      },
    ],
    endTime: [
      {
        required: true,
        message: i18n.global.t("game.pleaseSelectTimeSatrt"),
        trigger: "blur",
      },
    ],
    remark: [
      {
        required: true,
        message: i18n.global.t("game.pleaseSelectContent"),
        trigger: "blur",
      },
    ],
  },
});
const { queryParams, form, rules, obj } = toRefs(data);
const radioList = ref([]);
const selectList = ref([
  { label: i18n.global.t("game.unStart"), value: "0" },
  { label: i18n.global.t("game.strating"), value: "1" },
  { label: i18n.global.t("game.disable"), value: "2" },
  { label: i18n.global.t("game.expire"), value: "3" },
]);

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false
  }
})
/** 查询角色列表 */
function getList() {
  loading.value = true;
  return platFormaintList(queryParams.value).then((response) => {
    roleList.value = response.records;
    total.value = response.total;
    loading.value = false;
  });
}

/** 搜索按钮操作 */
function handleQuery() {
  getList();
}
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.startTime = "";
    queryParams.value.endTime = "";
  } else {
    queryParams.value.startTime = dateRange.value[0];
    queryParams.value.endTime = dateRange.value[1];
  }
}
/** 重置新增的表单以及其他数据  */
function reset() {
  form.value = {
    endTime: "", //结束时间
    startTime: "", //开始时间
    lobbyId: undefined, //游戏平台id
    remark: "", //维护内容
    id: "",
  };
  proxy.resetForm("plantRef");
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  dateRange.value = [];
  handleChange();
  handleQuery();
}
function getPlantList(type) {
  gamePlantList({
    lobbyType: type,
    pager: {
      current: 1,
      size: 500,
    },
  }).then((response) => {
    plantList.value = toRaw(response.records);
    open.value = true;
  });
}
getType();
// 获取场馆类型
function getType() {
  getVenueList(obj.value).then((response) => {
    radioList.value = response.records;
  });
}
// 编辑信息 新增信息
function handleUpdate(row, icon) {
  if (icon == "add") {
    reset();
    radio1.value = 1001101;// 体育
    form.value.id = "";
    title.value = i18n.global.t("member.add");
    isDisabled.value = false;
    getPlantList(radio1.value);
  } else if (icon == "edit") {
    form.value.id = row.id;
    isDisabled.value = true;
    title.value = i18n.global.t("game.editInformation");
    radio1.value = row.lobbyTypeId;
    form.value.endTime = row.endTime;
    form.value.startTime = row.startTime;
    form.value.remark = row.remark;
    form.value.lobbyId = row.lobbyId;
    getPlantList(radio1.value);
  }
}
// 切换场馆类型
function changehandle(item) {
  console.log(item, "000");
  radio1.value = item.id;
  getPlantList(item.id);
}
function changeradiohandle(item) {
  form.value.lobbyId = item.id;
}
// 新增编辑确定
function submitForm() {
  proxy.$refs["plantRef"].validate((valid) => {
    if (valid) {
      if (form.value.id == "") {
        addPlatFormaint(form.value)
          .then((response) => {
            proxy.$modal.msgSuccess(i18n.global.t("member.addSuccessfully"));
            open.value = false;
            getList();
          })
          .catch((error) => {
            // reject(error);
            ElMessage(error.response.data.msg);
          });
      } else {
        editPlatFormaint(form.value)
          .then((response) => {
            proxy.$modal.msgSuccess(i18n.global.t("member.editSuccessfully"));
            open.value = false;
            getList();
          })
          .catch((error) => {
            // reject(error);
            ElMessage(error.response.data.msg);
          });
      }
    }
  });
}
// 取消按钮
function cancel() {
  open.value = false;
  reset();
}
/** 删除按钮操作 */
function handleDelete(id) {
  proxy.$modal
    .confirms(i18n.global.t("risk.sureToDelete"), i18n.global.t("risk.tips"))
    .then(function () {
      return delPlatFormaint({ id: id });
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess(i18n.global.t("member.deleteSuccessfully"));
    })
    .catch(() => {});
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>
