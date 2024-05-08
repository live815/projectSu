<template>
  <div class="three-level-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('game.editInformation')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        ref="queryRef"
        :inline="true"
        label-position="top"
      >
        <el-row>
          <el-col>
            <el-form-item :label="$t('game.gameName')" prop="lobbyName" class="full-width">
              <el-input
                v-model="queryParams.lobbyName"
                class="full-width"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('game.type')" prop="slotTypeName" class="full-width">
              <el-input
                v-model="queryParams.slotTypeName"
                class="full-width"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-form-item
            :label="$t('game.appGamePicture')"
            prop="appLobbySlotIcon"
            class="full-width"
          >
            <el-col>
              <el-upload
                class="avatar-uploader"
                action="/admin/file/game/upload"
                :data="{ lobbyId: queryParams.id }"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :before-upload="beforeUpload"
                :headers="headers"
              >
                <img
                  v-if="queryParams.appLobbySlotIcon"
                  :src="getImgUrl(queryParams.appLobbySlotIcon)"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                  ><Plus
                /></el-icon>
              </el-upload>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('game.status')" prop="status" class="full-width">
            <el-radio-group v-model="queryParams.status" class="ml-4">
              <el-radio :label="0" size="large">{{ $t('game.start') }}</el-radio>
              <el-radio :label="1" size="large">{{ $t('game.close') }}</el-radio>
            </el-radio-group>
            <!-- <el-input v-model="queryParams.status" class="full-width" /> -->
          </el-form-item>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('member.cancel') }}</el-button>
          <el-button type="primary" @click="submit"> {{ $t('member.submit') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { computed, onMounted, proxyRefs } from "vue";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { slotSubGameUpdate } from "@/api/game/entertcity";

const props = defineProps(["open", "row"]);
const emit = defineEmits(["update:open", "onrefresh"]);
const headers = ref({ Authorization: "Bearer " + getToken() });
const { proxy } = getCurrentInstance();
const queryParams = props.row;
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
const submit = () => {
  slotSubGameUpdate(queryParams).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("member.editSuccessfully"));
    dialogVisible.value = false;
    emit("onrefresh");
  });
};
const handleUploadSuccess = (res) => {
  queryParams.appLobbySlotIcon = res.data;
};
const beforeUpload = () => {};
</script>

<style lang="scss" scoped>
.three-level-dialog {
  .header-title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
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
</style>
