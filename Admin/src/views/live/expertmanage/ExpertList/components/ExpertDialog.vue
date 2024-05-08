<template>
  <div class="edit-dialog-first">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="title"
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
              :label="$t('live.ExpertName')"
              prop="expertName"
              class="full-width"
            >
              <el-input
                v-model="queryParams.expertName"
                class="full-width"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.tip128')"
              prop="weight"
              class="full-width"
            >
              <el-input
                v-model="queryParams.weight"
                class="full-width"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.ExpertAvatar')"
              prop="expertAvatar"
              class="full-width"
            >
              <el-col>
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/live/image/upload"
                  :data="{}"
                  :show-file-list="false"
                  :on-success="handleUploadSuccessdig"
                  :headers="headers"
                >
                  <img
                    v-if="queryParams.expertAvatar"
                    :src="getImgUrl(queryParams.expertAvatar)"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :label="$t('live.Experttag')"
              prop="expertTag"
              class="full-width"
              type="textarea"
            >
              <el-input v-model="queryParams.expertTag" class="full-width" />
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :label="$t('live.AllSessions')"
              prop="allRoundCount"
              class="full-width"
              type="textarea"
            >
              <el-input
                v-model="queryParams.allRoundCount"
                class="full-width"
              />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.Winninggames')"
              prop="middleRoundCount"
              class="full-width"
              type="textarea"
            >
              <el-input
                v-model="queryParams.middleRoundCount"
                class="full-width"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col>
            <el-form-item
              label="方案信息"
              prop="planContent"
              class="full-width"
              type="textarea"
            >
              <el-input v-model="queryParams.planContent" class="full-width" />
            </el-form-item>
          </el-col> -->
          <el-col>
            <el-form-item
              :label="$t('live.MonthwinRate')"
              prop="monthWinRate"
              class="full-width"
              type="textarea"
            >
              <el-input v-model="queryParams.monthWinRate" class="full-width" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.tip129')"
              prop="actualAttentionNum"
              class="full-width"
              type="textarea"
            >
              <el-input
                v-model="queryParams.actualAttentionNum"
                class="full-width"
              />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.tip130')"
              prop="showAttentionNum"
              class="full-width"
              type="textarea"
            >
              <el-input
                v-model="queryParams.showAttentionNum"
                class="full-width"
              />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.tip131')"
              prop="recentHitRate"
              class="full-width"
              type="textarea"
            >
              <el-input
                v-model="queryParams.recentHitRate"
                class="full-width"
              />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.tip132')"
              prop="summary"
              class="full-width"
              type="textarea"
            >
              <el-input
                v-model="queryParams.summary"
                class="full-width"
                type="textarea"
                maxlength="20"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('live.status')"
              prop="status"
              class="full-width"
              v-if="!showadd"
            >
              <el-radio-group v-model="queryParams.status" class="ml-4">
                <el-radio label="0" size="large">{{
                  $t("live.enable")
                }}</el-radio>
                <el-radio label="1" size="large">{{
                  $t("live.disabled")
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
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { addExpertList, editExpertInfo } from "@/api/live/expertmange";
import i18n from "@/i18n";

const { proxy } = getCurrentInstance();
const headers = ref({ Authorization: "Bearer " + getToken() });
const props = defineProps(["open", "row", "title", "showadd"]);
const queryParams = props.row;
const emit = defineEmits(["update:open", "onrefresh"]);
const queryRef = ref("");

// 整数数字校验规则
const checknumber = (rule, value, callback) => {
  const reguserName = /^[0-9]*$/;
  if (reguserName.test(value)) {
    callback();
  } else {
    callback(new Error(i18n.global.t("live.tip11")));
  }
};

const rules = reactive({
  expertName: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip112") },
  ],
  weight: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip133") },
    {
      validator: checknumber,
      trigger: "blur",
    },
  ],
  expertTag: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip134") },
  ],
  expertAvatar: [
    {
      required: true,
      trigger: "change",
      message: i18n.global.t("live.tip135"),
    },
  ],

  allRoundCount: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip136") },
  ],
  middleRoundCount: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip137") },
  ],
  planContent: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip137") },
  ],
  monthWinRate: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip138") },
  ],
  actualAttentionNum: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip139") },
  ],
  showAttentionNum: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip140") },
  ],
  recentHitRate: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip141") },
  ],
  summary: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip142") },
  ],
  status: [
    {
      required: true,
      trigger: "change",
      message: i18n.global.t("live.tip143"),
    },
  ],
});

const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

//根据ID查询详情
const cancel = () => {
  dialogVisible.value = false;
};

// 确定事件
const submit = () => {
  queryRef.value.validate((valid) => {
    if (valid) {
      // queryParams.status = Number(queryParams.status);

      // 方案信息-入参暂时固定写死，待后期产品指定规则 0红、1黑、2和
      const param = {
        0: 3,
        1: 8,
        2: 6,
      };
      queryParams.planContent = JSON.stringify(param);
      if (props.showadd) {
        addExpertList(queryParams).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("live.tip144"));
          dialogVisible.value = false;
          emit("onrefresh");
        });
      } else if (!props.showadd) {
        editExpertInfo(queryParams).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("live.tip123"));
          dialogVisible.value = false;
          emit("onrefresh");
        });
      }
    } else {
      return;
    }
  });
};

const handleUploadSuccessdig = (res) => {
  queryParams.expertAvatar = res.data;
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
