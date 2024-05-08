<template>
  <div class="app-container">
    <div class="text-field">
      <el-row>
        <el-col :span="4">
          <div class="primary">
            <div class="primary-one">
              <el-button type="primary" @click="toShowAddOpt(true)">{{
                $t("operation.tip19")
              }}</el-button>
            </div>
            <div
              class="tutorial"
              v-for="(item, index) in tutorialData"
              :key="index"
            >
              <div>
                <img
                  v-show="item.icon != ''"
                  :src="getImgUrl(item.icon)"
                  width="25"
                  height="25"
                />
              </div>
              <div class="text" @click.stop="changeTutorial(index)">
                {{ item.title }}
              </div>
              <div class="icon">
                <div @click="toShowAddOpt(true, item)">
                  <el-icon><Edit /></el-icon>
                </div>
                <div>
                  <el-icon @click="deleTutorial(item.id)"
                    ><DeleteFilled
                  /></el-icon>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="options">
            <el-form>
              <el-form-item>
                <el-button type="primary" @click.stop="showAddConfig(true)">{{
                  $t("operation.Addoptions")
                }}</el-button>
              </el-form-item>
              <el-form-item>
                <el-table :data="configData" style="width: 100%">
                  <el-table-column
                    prop="sortNum"
                    :label="$t('operation.weightsort')"
                    width="180"
                  />
                  <el-table-column
                    prop="tabName"
                    :label="$t('operation.bookmark')"
                    width="180"
                  />
                  <el-table-column
                    prop="maticonerial"
                    :label="$t('operation.Picturematerial')"
                    width="180"
                    align="center"
                  >
                    <template #default="scope">
                      <el-button
                        @click="toShowImg(scope.row.icon)"
                        v-if="scope.row.icon != ''"
                        type="info"
                        >{{ $t("operation.picture") }}</el-button
                      >
                      <div v-else>-</div>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="tabContent"
                    :label="$t('operation.textcontent')"
                    width="280"
                    :show-overflow-tooltip="true"
                  >
                    <template #default="{ row }">
                      <el-button
                        type="primary"
                        plain
                        @click="toshowPreview(row)"
                        >{{ $t("operation.tip27") }}</el-button
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="updateBy"
                    :label="$t('operation.Mostrecentoperat')"
                    width="180"
                  />
                  <el-table-column
                    prop="updateTime"
                    :label="$t('operation.tip5')"
                    width="180"
                  />
                  <el-table-column
                    prop="address"
                    :label="$t('operation.operate')"
                    width="180"
                  >
                    <template #default="scope">
                      <el-button
                        class="ml-2"
                        type="primary"
                        size="small"
                        @click="showAddConfig(true, scope.row)"
                        >{{ $t("operation.editInfomation") }}</el-button
                      >
                      <el-button
                        class="ml-2"
                        type="danger"
                        size="small"
                        @click="deleTConfig(scope.row.id)"
                        >{{ $t("operation.delete") }}</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      v-model="showAddOpt"
      :title="isShowEdit ? $t('operation.tip20') : $t('operation.tip21')"
      width="700px"
      :center="true"
    >
      <AddTutorial
        :viewLetterId="showAddOpt"
        v-if="showAddOpt"
        :currentTutorial="currentTutorial"
        :typeId="tutorialForm.configType"
        @handleClose="toShowAddOpt"
        :close="toShowAddOpt"
      ></AddTutorial>
    </el-dialog>

    <el-dialog
      v-model="showAddCon"
      :title="
        isShowEditCon
          ? $t('operation.Modifyoptions')
          : $t('operation.Addoptions')
      "
      :currentTutorial="currentTutorial"
      width="700px"
      :center="true"
    >
      <AddConfig
        v-if="showAddCon"
        :currentTutorialId="currentTutorialId"
        :currentConfig="currentConfig"
        @handleClose="showAddConfig"
      ></AddConfig>
    </el-dialog>

    <el-dialog
      v-model="showImg"
      :title="$t('operation.PicturePreview')"
      width="700px"
      :center="true"
    >
      <div class="img-box"><img :src="getImgUrl(currentImg)" alt="" /></div>
    </el-dialog>
    <el-dialog
      v-model="showPreview"
      :title="$t('operation.Details')"
      width="700px"
      :center="true"
    >
      <PreviewText :previewContent="previewContent" />
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import AddTutorial from "./AddTutorial.vue";
import PreviewText from "./PreviewText.vue";
import {
  getTutorialListApi,
  deleTutorialApi,
  getConfigApi,
} from "@/api/operation/common.js";
import { ref } from "vue";

import AddConfig from "./AddConfig.vue";
import { deleConfigApi } from "@/api/operation/tutorial.js";
import { getImgUrl } from "@/utils";
import { Base64 } from "js-base64";
import { ElMessageBox, ElMessage } from "element-plus";
import i18n from "@/i18n";

const tutorialData = ref([]);
const tutorialForm = ref({
  configType: "3",
});
//
// 预览图片
const showImg = ref(false);
const currentImg = ref("");
const toShowImg = (imgUrl) => {
  showImg.value = !showImg.value;
  console.log(imgUrl);
  currentImg.value = imgUrl;
};
//预览内容
const showPreview = ref(false);
const previewContent = ref();
const toshowPreview = (item) => {
  previewContent.value = item;
  console.log(previewContent.value);
  showPreview.value = !showPreview.value;
};
// 切换一级菜单
const changeTutorial = (index) => {
  currentTutorialId.value = tutorialData.value[index].id;
  getConfig(currentTutorialId.value);
};
const currentTutorialId = ref(null);

// 获取一级菜单列表(导页签/教程)和二级菜单（选项）
const getTutorialList = () => {
  getTutorialListApi(tutorialForm.value)
    .then((res) => {
      tutorialData.value = res;
    })
    .then(() => {
      if (!currentTutorialId.value) {
        currentTutorialId.value = tutorialData.value[0].id;
      }
      if (tutorialForm.value) {
        getConfig(currentTutorialId.value);
      }
    });
};

// 删除一级菜单
const deleTutorial = async (id) => {
  await deleTutorialApi(id);
  getTutorialList(tutorialForm.value);
};
// 获取二级菜单
const configData = ref([]);
const getConfig = async (id) => {
  getConfigApi(id).then((res) => {
    configData.value = res;
    configData.value.forEach((item) => {
      item.tabContent = Base64.decode(item.tabContent);
    });
    console.log(res);
  });
};

// 添加与编辑弹窗
const showAddOpt = ref(false);
const isShowEdit = ref(false);
const currentTutorial = ref(null);
const toShowAddOpt = (n, item) => {
  console.log(n, item);
  if (item) {
    isShowEdit.value = true;
    currentTutorial.value = item;
  } else {
    isShowEdit.value = false;
    currentTutorial.value = null;
  }
  if (n == false) {
    getTutorialList();
  }
  showAddOpt.value = n;
};

//三级增加与编辑选项
const showAddCon = ref(false);
const isShowEditCon = ref(false);
const currentConfig = ref({});
const currentConfigId = ref(null);
const showAddConfig = (n, item) => {
  if (item) {
    isShowEditCon.value = true;
    currentConfig.value = item;
  } else {
    console.log(configData.value);
    isShowEditCon.value = false;
  }
  if (!n) {
    currentConfig.value = {};
    getTutorialList();
  }
  showAddCon.value = n;
};

//删除选项
const deleTConfig = async (id) => {
  ElMessageBox.confirm(i18n.global.t("agent.isDeleteData"))
    .then(() => {
      deleConfigApi(id).then(() => {
        ElMessage({
          type: "success",
          message: i18n.global.t("agent.deleteSuccessfully"),
        });
        // getCount();
        getTutorialList();
      });
    })
    .catch(() => {});
};

onMounted(async () => {
  getTutorialList();
});
</script>
<style lang="scss" scoped>
.img-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 25px;
  height: 25px;
  margin: 0 !important;
}
.text-field {
  .primary {
    width: 230px;
    margin-right: 20px;
    .primary-one {
      margin-bottom: 20px;
    }
    .tutorial {
      margin-top: 10px;
      display: flex;
      gap: 10px;
      div:nth-child(2) {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 25px;
      }
      .text {
        cursor: pointer;
      }
      .icon {
        margin-left: auto;
        display: flex;
        gap: 10px;
        line-height: 30px;
        cursor: pointer;
        div:nth-child(1) {
          color: #1890ff;
        }
        div:nth-child(2) {
          color: grey;
        }
      }
    }
    .tutorial:hover {
      background-color: var(--el-fill-color-light);
    }
  }
}
</style>
