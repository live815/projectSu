<template>
  <div>
    <div class="main--container">
      <el-form label-width="auto">
        <div class="sub-container">
          <el-form-item :data="formData" :label="$t('agent.needReview')">
            <el-select
              v-model="formData.addAgentAudit"
              :placeholder="$t('member.pleaseSelect')"
            >
              <el-option :label="$t('agent.none')" :value="false" />
              <el-option :label="$t('agent.addAgent')" :value="true" />
            </el-select>
          </el-form-item>
          <el-button class="right-btn" type="primary" @click="submit">{{
            $t("member.save")
          }}</el-button>
        </div>

        <div class="sub-container">
          <el-form-item :label="$t('agent.commissionRatioHidden')">
            <el-input
              v-model="formData.commissionShow"
              type="textarea"
              style="width: 500px"
              :placeholder="$t('agent.pleaseInputAgentAccount')"
            ></el-input>
          </el-form-item>
          <el-button class="right-btn" type="primary" @click="submit">{{
            $t("member.save")
          }}</el-button>
        </div>
        <div class="sub-container">
          <el-form-item :label="$t('agent.contactWayConfig')">
            <el-button
              @click="toAddContact"
              v-show="formData.contactList.length == 0"
              >+</el-button
            >
            <div
              class="row-div"
              v-for="(item, index) in formData.contactList"
              :key="index"
            >
              <el-form-item>
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/tutorial/image/upload"
                  :data="{}"
                  :show-file-list="false"
                  :on-success="handleUploadSuccessBig"
                  :headers="headers"
                  @click="fn(item)"
                >
                  <img
                    v-if="item.logo"
                    :src="getImgUrl(item.logo)"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-select
                  v-model="item.type"
                  :placeholder="$t('member.pleaseSelect')"
                  style="width: 150px"
                >
                  <el-option :label="$t('agent.wechatQuot')" :value="1" />
                  <el-option label="qq" :value="2" />
                  <el-option label="whatsapp" :value="3" />
                  <el-option label="telegram" :value="4" />
                  <el-option :label="$t('agent.emailNoqute')" :value="5" />
                  <el-option
                    :label="$t('agent.sixsixPersonalService')"
                    :value="6"
                  />
                  <el-option label="skype" :value="7" />
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-input
                  :placeholder="$t('agent.pleaseInputContact')"
                  v-model="item.contact"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-input
                  :placeholder="$t('agent.pleaseInputDownloadUrl')"
                  v-model="item.downloadUrl"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="item.isShow"
                  :label="$t('agent.isShowAtAgent')"
                />
              </el-form-item>

              <el-button @click="toAddContact">+</el-button>
              <el-button @click="deleContact(index)">-</el-button>
            </div>
          </el-form-item>
          <el-button class="right-btn" type="primary" @click="submit">{{
            $t("member.save")
          }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import {
  getAgentRelation,
  updateAgentRelation,
} from "@/api/agent/agentConfig.js";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
const headers = ref({ Authorization: "Bearer " + getToken() });
const { proxy } = getCurrentInstance();
onMounted(() => {
  getAgentRelationList();
});

const getAgentRelationList = () => {
  getAgentRelation().then((res) => {
    formData.value = res;
    if (
      !Array.isArray(formData.value.contactList) ||
      formData.value.contactList.length == 0
    ) {
      formData.value.contactList = [];
    }
  });
};
const handleUploadSuccessBig = (res) => {
  if (res.code === 200) {
    formData.value.contactList.find((item) => item.type === type.value).logo =
      res.data;
    proxy.$modal.msgSuccess(i18n.global.t("agent.uploadSuccessfully"));
  }
};
const fn = (item) => {
  type.value = item.type;
};
const type = ref();
const formData = ref({
  addAgentAudit: true,
  commissionShow: "",
  contactList: [],
  tenantId: 0,
  updateBy: "",
});
// 提交逻辑
const submit = () => {
  console.log(formData.value);
  if (typeof formData.value.commissionShow === "string") {
    formData.value.commissionShow = formData.value.commissionShow.replace(
      /，/g,
      ","
    );
    formData.value.commissionShow = formData.value.commissionShow.replace(
      /,{2,}/g,
      ","
    );
  }
  let hasEmptyContact;
  if (Array.isArray(formData.value.contactList)) {
    hasEmptyContact = formData.value.contactList.some((item) => {
      return item.type == null || item.contact == "" || item.downloadUrl == "";
    });
  }

  if (hasEmptyContact) {
    proxy.$modal.msgError(i18n.global.t("agent.contactCannotBeEmpty"));
    return;
  }

  updateAgentRelation(formData.value)
    .then(() => {
      proxy.$modal.msgSuccess(i18n.global.t("agent.editSuccessfully"));
      getAgentRelationList();
    })
    .catch((err) => {
      proxy.$modal.msgError(i18n.global.t("agent.editFailureTryAgainLater"));
    });
};

// 添加联系方式
const toAddContact = () => {
  console.log(formData.value);
  formData.value.contactList.push({ ...contactData.value });
};
// 删除联系方式
const deleContact = (index) => {
  formData.value.contactList.splice(index, 1);
};
// 联系方式的参数
const contactData = ref({
  contact: "",
  downloadUrl: "",
  logo: "",
  type: null,
});
</script>

<style lang="scss" scoped>
.main--container {
  margin-top: 3px;
  margin-left: 3px;
  width: 1500px;

  border: 1px solid #d3d3d3;
  border-bottom: none;
}

.sub-container {
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-top: 10px;
  min-height: 80px;
  border-bottom: 1px solid #d3d3d3;
}
.row-div {
  display: flex;

  gap: 10px;
  margin-bottom: 10px;
}
.right-btn {
  margin-left: auto;
  margin-right: 30px;
}
.avatar {
  width: 50px;
  height: 50px;
}
.row-div {
  display: flex;
  align-items: center;
}
:deep() {
  .avatar-uploader {
    width: 50px;
    height: 50px;
    border: 1px solid #d1d5db;
    text-align: center;
    line-height: 50px;
  }
}
</style>
