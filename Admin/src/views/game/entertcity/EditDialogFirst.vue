<template>
  <div class="edit-dialog-first">
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
            <el-form-item :label="$t('game.lobbyType')" prop="lobbyType" class="full-width">
              <el-input
                v-model="queryParams.lobbyType"
                class="full-width"
                :placeholder="$t('member.pleaseInput')"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('game.appLobbyPic')"
              prop="appLobbyIconTab"
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
                    v-if="queryParams.appLobbyIconTab"
                    :src="getImgUrl(queryParams.appLobbyIconTab)"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-col> </el-form-item
          ></el-col>
          <el-col>
            <el-form-item :label="$t('game.appLobbyTypePic')" prop="appLobbyIconBigcover">
              <el-col :span="24">
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/game/upload"
                  :data="{ lobbyId: queryParams.id }"
                  :show-file-list="false"
                  :on-success="handleUploadSuccessBig"
                  :before-upload="beforeUploadBig"
                  :headers="headers"
                >
                  <img
                    v-if="queryParams.appLobbyIconName"
                    :src="getImgUrl(queryParams.appLobbyIconName)"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-col>
            </el-form-item>
          </el-col>

          <el-form-item
            :label="$t('game.appLobbyIconBg')"
            prop="appLobbyIconBg"
            class="full-width"
          >
            <el-col :span="24">
              <el-upload
                class="avatar-uploader"
                action="/admin/file/game/upload"
                :data="{ lobbyId: queryParams.id }"
                :show-file-list="false"
                :on-success="handleUploadBg"
                :headers="headers"
              >
                <img
                  v-if="queryParams.appLobbyIconBg"
                  :src="getImgUrl(queryParams.appLobbyIconBg)"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                  ><Plus
                /></el-icon>
              </el-upload>
            </el-col>
          </el-form-item>
          <el-form-item
            :label="$t('game.pcLobbyBigImg')"
            prop="pcLobbyBigImg"
            class="full-width"
          >
            <el-col :span="24">
              <el-upload
                class="avatar-uploader"
                action="/admin/file/game/upload"
                :data="{ lobbyId: queryParams.id }"
                :show-file-list="false"
                :on-success="handleUploadpcBigBg"
                :before-upload="beforeUploadpcBigBg"
                :headers="headers"
              >
                <img
                  v-if="queryParams.pcLobbyBigImg"
                  :src="getImgUrl(queryParams.pcLobbyBigImg)"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                  ><Plus
                /></el-icon>
              </el-upload>
            </el-col>
          </el-form-item>
          <el-form-item
            :label="$t('game.pcLobbySmallImg')"
            prop="pcLobbySmallImg"
            class="full-width"
          >
            <el-col :span="24">
              <el-upload
                class="avatar-uploader"
                action="/admin/file/game/upload"
                :data="{ lobbyId: queryParams.id }"
                :show-file-list="false"
                :on-success="handleUploadpcSmallBg"
                :before-upload="beforeUploadpcSmallBg"
                :headers="headers"
              >
                <img
                  v-if="queryParams.pcLobbySmallImg"
                  :src="getImgUrl(queryParams.pcLobbySmallImg)"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                  ><Plus
                /></el-icon>
              </el-upload>
            </el-col>
          </el-form-item>
          <el-form-item
            :label="$t('game.pcLobbyIconTabList')"
            prop="pcLobbyIconTab"
            class="full-width"
          >
            <el-col :span="24">
              <el-upload
                class="avatar-uploader"
                action="/admin/file/game/upload"
                :data="{ lobbyId: queryParams.id }"
                :show-file-list="false"
                :on-success="handleUploadGameListIcon"
                :before-upload="beforeUploadpcSmallBg"
                :headers="headers"
              >
                <img
                  v-if="queryParams.pcLobbyIconTab"
                  :src="getImgUrl(queryParams.pcLobbyIconTab)"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                  ><Plus
                /></el-icon>
              </el-upload>
            </el-col>
          </el-form-item>

          <el-col>
            <el-form-item :label="$t('game.sort')" prop="sort" class="full-width">
              <el-input v-model="queryParams.sort" class="full-width" />
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item :label="$t('game.status')" prop="status" class="full-width">
              <el-radio-group v-model="queryParams.status" class="ml-4">
                <el-radio :label="0" size="large">{{ $t('game.start') }}</el-radio>
                <el-radio :label="1" size="large">{{ $t('game.close') }}</el-radio>
              </el-radio-group>
              <!-- <el-input v-model="queryParams.status" class="full-width" /> -->
            </el-form-item>
          </el-col>
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
import { computed, onMounted, proxyRefs } from "vue";
import { getToken } from "@/utils/auth";
import { getImgUrl } from "@/utils";
import { typeUpdate } from "@/api/game/entertcity";

const props = defineProps(["open", "row"]);
const emit = defineEmits(["update:open", "onrefresh"]);
const headers = ref({ Authorization: "Bearer " + getToken() });
const { proxy } = getCurrentInstance();

const statusList = ref([
  { label: "开启", value: 1 },
  { label: "关闭", value: 0 },
]);

const queryParams = props.row;
// const originalImageUrl = 'http://154.204.55.205:9000/sports-game/pm_board_1.png'
const imageUrl = ref("");

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
  typeUpdate(queryParams).then((res) => {
    proxy.$modal.msgSuccess("编辑成功");
    dialogVisible.value = false;
    emit("onrefresh");
  });
};
const handleUploadSuccess = (res) => {
  // queryParams.value.appLobbyIconDark = res.url;
  imageUrl.value = res.data;
  queryParams.appLobbyIconTab = res.data;
};
const handleUploadSuccessBig = (res) => {
  queryParams.appLobbyIconName = res.data;
};
const handleUploadBg = (res) => {
  queryParams.appLobbyIconBg = res.data;
};
const handleUploadpcBigBg = (res) => {
  queryParams.pcLobbyBigImg = res.data;
};
const handleUploadpcSmallBg = (res) => {
  queryParams.pcLobbySmallImg = res.data;
};
const handleUploadGameListIcon = (res) => {
  queryParams.pcLobbyIconTab = res.data;
};
const beforeUpload = () => {};
const beforeUploadBig = () => {};
const beforeUploadpcBigBg = () => {};
const beforeUploadpcSmallBg = () => {};
</script>

<style lang="scss" scoped>
.edit-dialog-first {
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
