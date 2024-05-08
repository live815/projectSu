<template>
  <div class="edit-dialog-first">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('live.EditInformation')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        ref="queryRef"
        :inline="true"
        label-position="top"
        :rules="rules"
      >
        <el-row>
          <el-col>
            <el-form-item
              :label="$t('live.breakheadlines')"
              prop="planTitle"
              class="full-width"
              type="textarea"
            >
              <el-input v-model="queryParams.planTitle" class="full-width" />
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
                class="full-width"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :label="$t('live.Breaknews')"
              prop="planResult"
              class="full-width"
              type="textarea"
            >
              <el-input v-model="queryParams.planResult" class="full-width" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.tip115')"
              prop="betName"
              class="full-width"
              type="textarea"
            >
              <el-input
                v-model="queryParams.betName"
                class="full-width"
                readonly
                @focus="handleFocus"
              />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.tip116')"
              prop="marketId"
              class="full-width"
            >
              <el-input
                v-model="queryParams.marketId"
                class="full-width"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.tip117')"
              prop="recommendation"
              class="full-width"
              type="textarea"
            >
              <el-input
                v-model="queryParams.recommendation"
                class="full-width"
                disabled
              />
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="状态" prop="status" class="full-width">
              <el-radio-group v-model="queryParams.status" class="ml-4">
                <el-radio label="0" size="large">{{
                  $t("live.Noresultsyet")
                }}</el-radio>
                <el-radio label="1" size="large">{{
                  $t("live.Theresults")
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="cancel">{{ $t("live.cancel") }}</el-button>
        <el-button type="primary" @click="submit">
          {{ $t("live.makesure") }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, reactive, toRaw } from "vue";
import { getBreakDetail } from "@/api/live/expertmange";
import i18n from "@/i18n";

const { proxy } = getCurrentInstance();
const props = defineProps(["editdialog", "ids"]);
const emit = defineEmits(["update:open", "onrefresh", "openGameplay"]);
const queryRef = ref("");
const data = reactive({
  queryParams: {},
  form: {},
});
const { queryParams, form } = toRefs(data);
const gameId = ref("");
const rules = reactive({
  planTitle: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip111") },
  ],
  planDesc: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip113") },
  ],
  planResult: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip118") },
  ],
  marketId: [
    {
      required: true,
      trigger: "change",
      message: i18n.global.t("live.tip119"),
    },
  ],

  betName: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip120") },
  ],
  recommendation: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip121") },
  ],

  status: [
    {
      required: true,
      trigger: "change",
      message: i18n.global.t("live.tip122"),
    },
  ],
});

const dialogVisible = computed({
  get() {
    return props.editdialog;
  },
  set(val) {
    emit("update:editdialog", val);
  },
});

getList();
/** 查询详情 */
function getList() {
  getBreakDetail(props.ids)
    .then((response) => {
      queryParams.value = response;
      queryParams.value.status = response.status + "";
      gameId.value = response.leagueId;
      form.value.mainName = response.mainName;
      form.value.cusName = response.cusName;
    })
    .catch(() => {
      // proxy.$modal.msgError('123')
    });
}
// 点击下注类型玩法输入框
function handleFocus() {
  localStorage.setItem("AnchorDebut", gameId.value);
  localStorage.setItem("SetForm", JSON.stringify(form.value));
  emit("openGameplay");
}
//根据ID查询详情
const cancel = () => {
  dialogVisible.value = false;
};

// 确定事件
const submit = () => {
  queryRef.value.validate((valid) => {
    if (valid) {
      getBreakDetail(queryParams).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t("live.tip123"));
        dialogVisible.value = false;
        emit("onrefresh");
      });
    } else {
      return;
    }
  });
};
</script>

<style lang="scss" scoped>
.edit-dialog-first {
  .header-title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }

  img {
    width: 80px;
    height: 80px;
  }
  .rewrite-icon {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px dashed #eee;
  }
}
.bigbox {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.hideBox {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}
.tipBox {
  color: #f56c6c;
  font-size: 12px;
}
</style>
