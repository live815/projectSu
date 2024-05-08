<template>
  <div class="electronic-child-dialog">
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
        :rules="rules"
      >
        <el-row>
          <el-col>
            <el-form-item :label="$t('game.lobbyType')" prop="lobbyType " class="full-width">
              <el-input v-model="queryParams.lobbyType" class="full-width" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('game.lobbyName')" prop="lobbyName" class="full-width">
              <el-input v-model="queryParams.lobbyName" class="full-width" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('game.appGameUnclickPicture')"
              prop="appLobbyIconDark"
              class="full-width"
            >
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
                  v-if="queryParams.appLobbyIconDark"
                  :src="getImgUrl(queryParams.appLobbyIconDark)"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon rewrite-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :label="$t('game.appGameClickPicture')"
              prop="appLobbyIconLight"
              class="full-width"
            >
              <el-upload
                class="avatar-uploader"
                action="/admin/file/game/upload"
                :data="{ lobbyId: queryParams.id }"
                :show-file-list="false"
                :on-success="handleUploadSuccessLight"
                :before-upload="beforeUploadLight"
                :headers="headers"
              >
                <img
                  v-if="queryParams.appLobbyIconLight"
                  :src="getImgUrl(queryParams.appLobbyIconLight)"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon rewrite-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('game.appLobbyIconBigcover')" prop="appLobbyIconBigcover">
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
                  v-if="queryParams.appLobbyIconBigcover"
                  :src="getImgUrl(queryParams.appLobbyIconBigcover)"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon rewrite-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('game.pcFrontCoverImg')"
              prop="pcFrontCoverImg"
              class="full-width"
            >
              <el-col :span="24">
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/game/upload"
                  :data="{ lobbyId: $route.query.id }"
                  :show-file-list="false"
                  :on-success="handleUploadSuccessFront"
                  :before-upload="beforeUploadFront"
                  :headers="headers"
                >
                  <img
                    v-if="queryParams.pcFrontCoverImg"
                    :src="getImgUrl(queryParams.pcFrontCoverImg)"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon rewrite-icon"><Plus /></el-icon>
                </el-upload> </el-col
            ></el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('game.pcLobbyIconTab')"
              prop="pcLobbyIconTab"
              class="full-width"
            >
              <el-col :span="24">
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/game/upload"
                  :data="{ lobbyId: $route.query.id }"
                  :show-file-list="false"
                  :on-success="handleUploadSuccessLine"
                  :before-upload="beforeUploadFront"
                  :headers="headers"
                >
                  <img
                    v-if="queryParams.pcLobbyIconTab"
                    :src="getImgUrl(queryParams.pcLobbyIconTab)"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon rewrite-icon"><Plus /></el-icon>
                </el-upload> </el-col
            ></el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('game.appHotImg')" prop="appHotIconModule" class="full-width">
              <el-col :span="24">
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/game/upload"
                  :data="{ lobbyId: $route.query.id }"
                  :show-file-list="false"
                  :on-success="handleAppHotIconModule"
                  :headers="headers"
                >
                  <img
                    v-if="queryParams.appHotIconModule"
                    :src="getImgUrl(queryParams.appHotIconModule)"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon rewrite-icon"><Plus /></el-icon>
                </el-upload> </el-col
            ></el-form-item>
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
          <el-col>
            <el-form-item :label="$t('game.isHotGame')" prop="isHotGame" class="full-width">
              <el-radio-group v-model="queryParams.isHotGame" class="ml-4">
                <el-radio :label="0" size="large">{{ $t('funds.yes') }}</el-radio>
                <el-radio :label="1" size="large">{{ $t('funds.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('game.promotionLabel')"
              prop="promotionLabel"
              class="full-width"
            >
              <el-select
                v-model="queryParams.promotionLabel"
                :placeholder="$t('member.pleaseSelect')"
                clearable
                style="width: 240px"
              >
                <el-option
                  v-for="item in sys_game_label_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="$t('game.promotionGuideText')"
              prop="promotionGuideText"
              class="full-width"
            >
              <el-input v-model="queryParams.promotionGuideText" class="full-width" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('game.sort')" prop="sort" class="full-width">
              <el-input v-model="queryParams.sort" class="full-width" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('game.pcGameDesc')" prop="pcGameDesc" class="full-width">
              <el-input v-model="queryParams.pcGameDesc" class="full-width" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('member.cancel') }}</el-button>
          <el-button type="primary" @click="submit">
            {{ $t('member.submit') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { computed, onMounted, proxyRefs } from 'vue'
import { getToken } from '@/utils/auth'
import { getImgUrl } from '@/utils'
import { subGameUpdate } from '@/api/game/entertcity'
const { proxy } = getCurrentInstance()
const { sys_game_label_type } = proxy.useDict('sys_game_label_type')

const props = defineProps(['open', 'row'])
const emit = defineEmits(['update:open', 'onrefresh'])
const headers = ref({ Authorization: 'Bearer ' + getToken() })
const rules = ref({
  // promotionLabel: [
  //   {
  //     required: true,
  //     message: i18n.global.t("game.pleaseInputLabel"),
  //     trigger: "blur",
  //   },
  // ],
  promotionGuideText: [
    {
      required: true,
      message: i18n.global.t('game.pleaseInputGuideText'),
      trigger: 'blur'
    }
  ],
  sort: [
    {
      required: true,
      message: i18n.global.t('game.pleaseInputSort'),
      trigger: 'blur'
    }
  ],
  pcGameDesc: [
    {
      required: true,
      message: i18n.global.t('game.pleaseInputPCGameDescribe'),
      trigger: 'blur'
    }
  ]
})

const queryParams = props.row
// const originalImageUrl = 'http://154.204.55.205:9000/sports-game/pm_board_1.png'
// const imageUrl = ref('');

const dialogVisible = computed({
  get() {
    return props.open
  },
  set(val) {
    emit('update:open', val)
  }
})

//根据ID查询详情
const cancel = () => {
  dialogVisible.value = false
}
const submit = () => {
  subGameUpdate(queryParams).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t('member.editSuccessfully'))
    dialogVisible.value = false
    emit('onrefresh')
  })
  console.log(queryParams)
}
const handleUploadSuccess = (res) => {
  queryParams.appLobbyIconDark = res.data
}
const handleUploadSuccessLight = (res) => {
  queryParams.appLobbyIconLight = res.data
}
const handleUploadSuccessBig = (res) => {
  if (res.data) queryParams.appLobbyIconBigcover = res.data
}
const handleUploadSuccessFront = (res) => {
  queryParams.pcFrontCoverImg = res.data
}
const handleUploadSuccessLine = (res) => {
  queryParams.pcLobbyIconTab = res.data
}
const handleAppHotIconModule = (res) => {
  queryParams.appHotIconModule = res.data
}

const beforeUpload = () => {}
const beforeUploadLight = () => {}
const beforeUploadBig = () => {}
const beforeUploadFront = () => {}
</script>

<style lang="scss" scoped>
.electronic-child-dialog {
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
<style lang="scss" scoped>
.electronic-child-dialog {
  .el-dialog__body {
    height: 750px;
    overflow: auto;
  }
}
</style>
