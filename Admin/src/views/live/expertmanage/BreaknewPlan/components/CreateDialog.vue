<template>
  <div class="">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('live.tip110')"
      center
      @close="handleClose"
    >
      <el-form
        :model="queryParams"
        ref="queryRef"
        :inline="true"
        label-width=""
        :rules="rules"
      >
        <el-row>
          <el-col>
            <el-form-item
              :label="$t('live.breakheadlines')"
              prop="planTitle"
              class="full-width"
            >
              <el-input
                v-model="queryParams.planTitle"
                :placeholder="$t('live.pleaseEnter')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.ExpertName')"
              prop="expertName"
              class="full-width"
            >
              <el-select
                class="full-width"
                v-model="value"
                value-key="id"
                :placeholder="$t('live.pleaseChose')"
                clearable
                @change="handleChange"
              >
                <el-option
                  v-for="item in tableData"
                  :key="item.id"
                  :label="item.expertName"
                  :value="item"
                  :disabled="item.status == 1"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.Breakdetails')"
              prop="planDesc"
              class="full-width"
            >
              <el-input
                v-model="queryParams.planDesc"
                :placeholder="$t('live.pleaseEnter')"
                clearable
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleBack">{{ $t("live.return") }}</el-button>
          <el-button type="primary" @click="handleCreat">
            {{ $t("live.release") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { createBreakNew } from "@/api/live/breaknewplan";
import { getExpertList } from "@/api/live/expertmange";
import useFBStore from "@/store/modules/fb.js";
import i18n from "@/i18n";
const fbStore = useFBStore();
const { proxy } = getCurrentInstance();
const emit = defineEmits(["closeCreate", "onrefresh"]);
const props = defineProps(["creatdialog"]);
// const queryParams = props.row;
// 拿第一弹窗的值
const setForm = ref(JSON.parse(localStorage.getItem("SetForm")));
// 拿第二弹窗的值
const setFormObj = ref(JSON.parse(localStorage.getItem("setFormObj")));
const queryRef = ref("");
const dialogVisible = computed({
  get() {
    return props.creatdialog;
  },
  set(val) {
    emit("closeCreate", val);
  },
});
const data = reactive({
  queryParams: {},
  rules: {
    planTitle: [
      {
        required: true,
        message: i18n.global.t("live.tip111"),
        trigger: "blur",
      },
    ],
    expertName: [
      {
        required: true,
        message: i18n.global.t("live.tip112"),
        trigger: "blur",
      },
    ],

    planDesc: [
      {
        required: true,
        message: i18n.global.t("live.tip113"),
        trigger: "blur",
      },
    ],
  },
  obj: {},
});
const { queryParams, rules, obj } = toRefs(data);
const tableData = ref([]);
const value = ref({});

getList();
/** 查询专家列表 */
function getList() {
  getExpertList({})
    .then((response) => {
      tableData.value = response.rows;
    })
    .catch(() => {
      // proxy.$modal.msgError('123')
      loading.value = false;
    });
}

function assignObj() {
  obj.value = Object.assign(
    {},
    setForm.value,
    setFormObj.value,
    queryParams.value,
    fbStore.recommendItem
  );
}
// 返回
function handleBack() {
  dialogVisible.value = false;
  emit("closeCreate", "cancle");
}
// 关闭
function handleClose() {
  localStorage.removeItem("SetForm");
  localStorage.removeItem("setFormObj");
  dialogVisible.value = false;
  emit("closeCreate", "close");
}
// 发布
function handleCreat() {
  assignObj();
  queryRef.value.validate((valid) => {
    if (valid) {
      createBreakNew(obj.value).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t("live.tip114"));
        dialogVisible.value = false;
        emit("onrefresh");
        emit("closeCreate", "close");
      });
    } else {
      return;
    }
  });
}
// 下拉框change事件
function handleChange() {
  queryParams.value.expertName = value.value.expertName;
  queryParams.value.expertId = value.value.id;
  // console.log(queryParams.value);
}
</script>

<style lang="scss" scoped>
.shuban {
  color: #889eff;
}
.yingban {
  color: red;
}
::v-deep .el-table .cell {
  white-space: pre-wrap;
}
.dialog-footer {
  display: flex;
  justify-content: right;
}
</style>
